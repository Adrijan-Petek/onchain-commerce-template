import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import OnchainProviders from 'src/components/OnchainProviders';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Onchain Commerce Template',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Onchain Commerce Template',
    description: 'Built with OnchainKit',
    images: [
      NEXT_PUBLIC_URL
        ? `${NEXT_PUBLIC_URL}/vibes/vibes-19.png`
        : '/vibes/vibes-19.png',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/onchainkit.css" />
      </head>
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
