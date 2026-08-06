import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import '@fontsource/bbh-sans-hegarty/400.css';
import '../styles/globals.css';
import 'fumadocs-ui/css/shadcn.css';
import { Inter, Pacifico, Syne } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });

const secondary = Syne({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-secondary' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sampreetpatil.com'),
  title: { default: 'Engineering · Sampreet Patil', template: '%s · Sampreet Patil' },
  description: 'Configuration-backed engineering notes, homelab documentation, uses, and architectural decisions.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${pacifico.variable} ${secondary.variable}`}>
        <RootProvider
          theme={{ attribute: 'class', defaultTheme: 'system', enableSystem: true }}
          search={{ preload: false, options: { type: 'static', api: '/api/search' } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
