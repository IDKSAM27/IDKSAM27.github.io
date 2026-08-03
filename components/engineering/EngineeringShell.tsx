'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { engineeringNavigation } from '@/lib/engineering/navigation';
import type { NavItem } from '@/lib/engineering/types';
import SearchButton from './SearchButton';

function NavBranch({ item, close }: { item: NavItem; close: () => void }) {
  const pathname = usePathname() ?? '';
  const active = pathname === item.href;
  const containsActive = item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`));
  return (
    <li className="eng-nav-branch">
      <Link href={item.href} className="eng-nav-link" data-active={active || undefined} onClick={close}>{item.title}</Link>
      {item.children && (
        <details open={Boolean(containsActive)}>
          <summary aria-label={`Toggle ${item.title} pages`}><ChevronDown size={15} aria-hidden="true" /></summary>
          <ul>{item.children.map((child) => <NavBranch key={child.href} item={child} close={close} />)}</ul>
        </details>
      )}
    </li>
  );
}

function DocsNavigation({ close }: { close: () => void }) {
  return (
    <>
      <div className="eng-nav-heading"><Link href="/engineering" onClick={close}>Engineering field notes</Link><span>Documentation extension</span></div>
      <SearchButton />
      <nav aria-label="Engineering documentation"><ul className="eng-nav-tree">{engineeringNavigation.map((item) => <NavBranch key={item.href} item={item} close={close} />)}</ul></nav>
    </>
  );
}

export default function EngineeringShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <div className="eng-site">
      <div className="eng-header-wrapper">
        <Header homeHref="/" smoothScroll={false} />
      </div>
      <div className="eng-mobile-bar">
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="engineering-navigation"><Menu size={19} /><span>Browse docs</span></button>
        <SearchButton />
      </div>
      {open && <button className="eng-nav-backdrop" aria-label="Close documentation navigation" onClick={() => setOpen(false)} />}
      <aside id="engineering-navigation" className="eng-sidebar" data-open={open || undefined}>
        <button className="eng-nav-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        <DocsNavigation close={() => setOpen(false)} />
      </aside>
      <main id="main-content" className="eng-main">{children}</main>
      <Footer className="eng-footer" />
      <MobileNav homeHref="/" smoothScroll={false} />
    </div>
  );
}
