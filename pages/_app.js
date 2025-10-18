// pages/_app.js
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

// 1. Import the Fontsource CSS file. This is what makes the font available.
import '@fontsource/bbh-sans-hegarty/400.css';

// 2. Import ONLY the Google Fonts you are using via next/font.
import { Inter, Pacifico } from 'next/font/google';

// --- Configure the remaining fonts ---
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pacifico',
});

// NOTE: All other font configurations have been removed to prevent errors.

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* 3. The className now only needs to contain the variables for Inter and Pacifico. */}
      <main className={`${inter.variable} ${pacifico.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
