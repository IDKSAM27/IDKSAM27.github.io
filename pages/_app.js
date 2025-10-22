import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

import '@fontsource/bbh-sans-hegarty/400.css';

import { Inter, Pacifico } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pacifico',
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <main className={`${inter.variable} ${pacifico.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
