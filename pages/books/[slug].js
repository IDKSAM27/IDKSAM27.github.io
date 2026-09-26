import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNav from '../../components/MobileNav';
import Seo from '../../components/Seo';
import ImageGallery from '../../components/books/ImageGallery';
import BookCover from '../../components/books/BookCover';
import booksData from '../../data/books.json';

export async function getStaticPaths() {
  const paths = booksData.map((book) => ({
    params: {
      slug: book.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bookIndex = booksData.findIndex((b) => b.slug === params.slug);
  const book = booksData[bookIndex];

  // Prev and Next books for adjacent navigation
  const prevBook = bookIndex > 0 ? booksData[bookIndex - 1] : null;
  const nextBook =
    bookIndex < booksData.length - 1 ? booksData[bookIndex + 1] : null;

  return {
    props: {
      bookData: book || null,
      prevBook: prevBook ? { slug: prevBook.slug, title: prevBook.title } : null,
      nextBook: nextBook ? { slug: nextBook.slug, title: nextBook.title } : null,
    },
  };
}

export default function BookDetailPage({ bookData, prevBook, nextBook }) {
  if (!bookData) {
    return null;
  }

  const {
    title,
    subtitle,
    author,
    dateFormatted,
    genre,
    rating,
    pages,
    status,
    excerpt,
    thoughtsHtml,
    summaryHtml,
    coverImage,
    coverColor,
    coverAccent,
    spineColor,
  } = bookData;

  return (
    <div className="flex flex-col min-h-screen bg-hero-1-light dark:bg-hero-1-dark text-text-light dark:text-text-dark">
      <Seo
        title={`${title} — Reading Notes & Summary | Sampreet Patil`}
        description={excerpt || subtitle || `Notes and reflections on ${title} by ${author}.`}
        url={`https://sampreetpatil.com/books/${bookData.slug}`}
      />
      <Head>
        <title>{title} — Reading Notes | Sampreet Patil</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 lg:px-12 py-12 sm:py-20">
        <article className="max-w-3xl mx-auto">
          {/* Back Navigation Link */}
          <div className="mb-10">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors group"
            >
              <span className="transform transition-transform group-hover:-translate-x-1">
                &larr;
              </span>
              <span>Back to Bookshelf</span>
            </Link>
          </div>

          {/* Book Header: Cover + Title + Metadata */}
          <header className="mb-14">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
              {/* Book Cover */}
              <div className="w-40 sm:w-48 flex-shrink-0 mx-auto sm:mx-0">
                <BookCover
                  title={title}
                  subtitle={subtitle}
                  author={author}
                  dateFormatted={dateFormatted}
                  genre={genre}
                  coverImage={coverImage}
                  coverColor={coverColor}
                  coverAccent={coverAccent}
                  spineColor={spineColor}
                  size="md"
                />
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 w-full">
                {/* Sleek editorial tag: Genre & status */}
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
                  <span>{genre}</span>
                  <span>&bull;</span>
                  <span>{status || 'Completed'}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-light dark:text-text-dark mb-4 leading-[1.15]">
                  {title}
                </h1>

                {/* Subtitle with generous spacing */}
                {subtitle && (
                  <p className="font-vintage italic text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    {subtitle}
                  </p>
                )}

                {/* Minimalist Metadata Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono py-4 border-y border-black/10 dark:border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Author</span>
                    <span className="font-vintage text-sm sm:text-base italic font-semibold text-text-light dark:text-text-dark block truncate">{author}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Date Read</span>
                    <span className="text-xs text-text-light dark:text-text-dark block">{dateFormatted}</span>
                  </div>
                  {pages && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Length</span>
                      <span className="text-xs text-text-light dark:text-text-dark block">{pages} pages</span>
                    </div>
                  )}
                  {rating && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Rating</span>
                      <span className="text-amber-500 text-xs tracking-wider block">
                        {'★'.repeat(Math.floor(rating))}
                        {rating % 1 !== 0 && '½'}
                        <span className="text-slate-500 ml-1">({rating}/5)</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Section: Visual Plates & Marginalia */}
          <section aria-label="Visual plates and gallery" className="my-14">
            <ImageGallery book={bookData} />
          </section>

          {/* Prominent Visible Divider */}
          <div className="flex items-center justify-center gap-4 my-16">
            <div className="book-divider-line w-28 sm:w-36 rounded-full" />
            <span className="text-accent-light dark:text-accent-dark font-cinzel text-base tracking-widest font-bold">
              ❦ ✦ ❦
            </span>
            <div className="book-divider-line w-28 sm:w-36 rounded-full" />
          </div>

          {/* Section: My Thoughts & Reflections (Completely unboxed, clean editorial flow) */}
          {thoughtsHtml && (
            <section className="my-14">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-light dark:text-text-dark font-secondary">
                  My Thoughts &amp; Reflections
                </h2>
              </div>

              <div
                className="book-prose font-vintage text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: thoughtsHtml }}
              />
            </section>
          )}

          {/* Prominent Visible Divider */}
          <div className="flex items-center justify-center gap-4 my-16">
            <div className="book-divider-line w-28 sm:w-36 rounded-full" />
            <span className="text-accent-light dark:text-accent-dark font-cinzel text-base tracking-widest font-bold">
              ❦ ✦ ❦
            </span>
            <div className="book-divider-line w-28 sm:w-36 rounded-full" />
          </div>

          {/* Section: Summary & Key Takeaways (Clean unboxed editorial breakdown) */}
          {summaryHtml && (
            <section className="my-14">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-light dark:text-text-dark font-secondary">
                  Summary &amp; Key Takeaways
                </h2>
              </div>

              <div
                className="book-prose"
                dangerouslySetInnerHTML={{ __html: summaryHtml }}
              />
            </section>
          )}

          {/* Bottom Adjacent Navigation: Sleek typographic links (NO box UI) */}
          <nav aria-label="Adjacent volumes" className="mt-20 pt-8 border-t border-black/15 dark:border-white/15 flex items-center justify-between gap-4">
            {prevBook ? (
              <Link
                href={`/books/${prevBook.slug}`}
                className="group flex flex-col items-start text-left focus:outline-none"
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                  &larr; Previous Volume
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark group-hover:underline transition-colors mt-1">
                  {prevBook.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/books"
              className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-text-light dark:hover:text-text-dark transition-colors py-2"
            >
              All Volumes
            </Link>

            {nextBook ? (
              <Link
                href={`/books/${nextBook.slug}`}
                className="group flex flex-col items-end text-right focus:outline-none"
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                  Next Volume &rarr;
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark group-hover:underline transition-colors mt-1">
                  {nextBook.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
