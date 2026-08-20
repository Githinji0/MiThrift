import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'MiThrift — Centralized Campus Thrift Store',
  description:
    'Curated secondhand campus essentials for university life. 1-of-1 quality inspected items, student prices, and campus pickup.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#5E6F3D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col bg-canvas text-charcoal antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
