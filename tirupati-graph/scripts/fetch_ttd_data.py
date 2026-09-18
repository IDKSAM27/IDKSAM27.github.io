import urllib.request
import json
import re
import os
import time

def parse_post(post):
    title = post.get('title', {}).get('rendered', '')
    content_raw = post.get('content', {}).get('rendered', '')
    published_date = post.get('date', '').split('T')[0]
    link = post.get('link', '')

    # Unescape HTML entities in title
    title = title.replace('&#8211;', '-').replace('&amp;', '&').replace('&#8217;', "'").strip()

    # Strip HTML tags
    text = re.sub(r'<[^<]+?>', ' ', content_raw)
    text = re.sub(r'\s+', ' ', text)

    # Date extraction (e.g., 17.09.2026, 29-06-2026, 17/09/2026, or from published date)
    record_date = None
    date_match = re.search(r'(\d{1,2})[\.\/\-](\d{1,2})[\.\/\-](\d{2,4})', title)
    if not date_match:
        date_match = re.search(r'(\d{1,2})[\.\/\-](\d{1,2})[\.\/\-](\d{2,4})', text[:150])
    
    if date_match:
        d, m, y = date_match.groups()
        if len(y) == 2:
            y = "20" + y
        d = d.zfill(2)
        m = m.zfill(2)
        record_date = f"{y}-{m}-{d}"
    else:
        record_date = published_date

    # Darshan pilgrim count extraction
    darshan_count = None
    # Usually after colon or near end of title e.g. "Total pilgrims who had darshan on 17.09.2026: 68,265"
    if ':' in title:
        after_colon = title.split(':')[-1]
        c_match = re.search(r'([\d\,]{4,7})', after_colon)
        if c_match:
            try:
                darshan_count = int(c_match.group(1).replace(',', ''))
            except ValueError:
                pass
    
    if darshan_count is None:
        matches = re.findall(r'[\d\,]{4,7}', title)
        for val in reversed(matches):
            clean_val = val.replace(',', '')
            if clean_val != record_date[:4] and len(clean_val) >= 4 and len(clean_val) <= 6:
                try:
                    darshan_count = int(clean_val)
                    break
                except ValueError:
                    pass

    if darshan_count is None:
        d_text_match = re.search(r'(?:darshan|pilgrims)[^\d]*?([\d\,]{4,7})', text[:300], re.IGNORECASE)
        if d_text_match:
            clean_val = d_text_match.group(1).replace(',', '')
            if clean_val != record_date[:4]:
                try:
                    darshan_count = int(clean_val)
                except ValueError:
                    pass

    # 2. Tonsures
    tonsures = None
    tons_match = re.search(r'Tonsures?\s*:\s*([\d\,]+)', text, re.IGNORECASE)
    if tons_match:
        try:
            tonsures = int(tons_match.group(1).replace(',', ''))
        except ValueError:
            pass

    # 3. Hundi kanukalu (in Crores INR)
    hundi_cr = None
    hundi_match = re.search(r'Hundi[^\d]*?([\d\.]+)\s*(?:CR|Crores?)', text, re.IGNORECASE)
    if hundi_match:
        try:
            hundi_cr = float(hundi_match.group(1))
        except ValueError:
            pass

    # 4. Laddu sale (in Lacs)
    laddu_lac = None
    laddu_match = re.search(r'Laddu[^\d]*?([\d\.]+)\s*(?:Lac|Lakhs?)', text, re.IGNORECASE)
    if laddu_match:
        try:
            laddu_lac = float(laddu_match.group(1))
        except ValueError:
            pass

    # 5. Annaprasadam (in Lacs)
    annaprasadam_lac = None
    anna_match = re.search(r'Annaprasadam[^\d]*?([\d\.]+)\s*(?:Lac|Lakhs?)', text, re.IGNORECASE)
    if anna_match:
        try:
            annaprasadam_lac = float(anna_match.group(1))
        except ValueError:
            pass

    # 6. Ashwini Hospital Patients
    ashwini_patients = None
    ashwini_match = re.search(r'Ashwini\s*Hospital[^\d]*?([\d\,]+)', text, re.IGNORECASE)
    if ashwini_match:
        try:
            ashwini_patients = int(ashwini_match.group(1).replace(',', ''))
        except ValueError:
            pass

    # 7. Waiting Compartments
    waiting_compartments = None
    comp_match = re.search(r'Compartments?[^\d]*?(\d{1,2})', text, re.IGNORECASE)
    if comp_match:
        try:
            waiting_compartments = int(comp_match.group(1))
        except ValueError:
            pass

    # 8. Approx Darshan Time (Hours)
    approx_wait_hours = None
    wait_match = re.search(r'(?:Darshan Time|Sarvadarshanam)[^\d]*?(\d{1,2})\s*H', text, re.IGNORECASE)
    if wait_match:
        try:
            approx_wait_hours = int(wait_match.group(1))
        except ValueError:
            pass

    return {
        "id": post.get('id'),
        "date": record_date,
        "title": title,
        "darshan_count": darshan_count,
        "tonsures": tonsures,
        "hundi_revenue_cr": hundi_cr,
        "laddu_sales_lac": laddu_lac,
        "annaprasadam_lac": annaprasadam_lac,
        "ashwini_patients": ashwini_patients,
        "waiting_compartments": waiting_compartments,
        "approx_wait_hours": approx_wait_hours,
        "link": link
    }

def fetch_all_records(pages=10):
    all_records = []
    print(f"Starting TTD dataset fetch across {pages} pages...")
    for page in range(1, pages + 1):
        url = f"https://news.tirumala.org/wp-json/wp/v2/posts?categories=2&per_page=100&page={page}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status == 200:
                    posts = json.loads(resp.read().decode('utf-8'))
                    if not posts:
                        break
                    print(f"Page {page}: fetched {len(posts)} posts.")
                    for p in posts:
                        parsed = parse_post(p)
                        if parsed['darshan_count'] is not None and parsed['darshan_count'] > 5000:
                            all_records.append(parsed)
        except Exception as e:
            print(f"Finished at page {page}: {e}")
            break
        time.sleep(0.1)

    # Sort by date ascending and deduplicate by date
    unique_by_date = {}
    for r in all_records:
        if r['date'] and (r['date'] not in unique_by_date or (r['hundi_revenue_cr'] and not unique_by_date[r['date']]['hundi_revenue_cr'])):
            unique_by_date[r['date']] = r

    sorted_records = sorted(unique_by_date.values(), key=lambda x: x['date'])
    print(f"Total unique daily records parsed: {len(sorted_records)}")
    return sorted_records

if __name__ == "__main__":
    records = fetch_all_records(pages=8) # 800 posts => covers ~2+ years of daily records
    out_path = os.path.join(os.path.dirname(__file__), "../public/data/tirupati_daily_records.json")
    out_path = os.path.abspath(out_path)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2)
    print(f"Saved {len(records)} records to {out_path}")
