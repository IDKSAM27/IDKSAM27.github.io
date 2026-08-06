import { ThemeProvider } from 'next-themes';
import { GoogleAnalytics } from '@next/third-parties/google';
import '../styles/globals.css';

import '@fontsource/bbh-sans-hegarty/400.css';
import 'highlight.js/styles/github-dark.css';

import { Inter, Pacifico, Syne } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pacifico',
});

const secondary = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-secondary',
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <main className={`${inter.variable} ${pacifico.variable} ${secondary.variable}`}>
        <Component {...pageProps} />
      </main>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
    </ThemeProvider>
  );
}

export default MyApp;
