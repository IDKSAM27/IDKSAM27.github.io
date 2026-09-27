import React from 'react';

export default function BookLoader() {
  return (
    <div className="flex flex-col items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 select-none">
      <div className="book-loader">
        <div className="inner">
          <div className="left" />
          <div className="middle" />
          <div className="right" />
        </div>
        <ul>
          {Array.from({ length: 18 }).map((_, i) => (
            <li key={i} />
          ))}
        </ul>
      </div>
      <p className="mt-16 text-xs font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-semibold animate-pulse">
        Currently Reading &amp; Annotating...
      </p>
    </div>
  );
}
