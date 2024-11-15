import '../../styles/globals.css';
import '../../styles/themes.css';
import { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';
import { RootProvider } from '@/providers/root-provider';

// import { auth } from "@/config/next-auth";
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { fontSans } from '@/lib/fonts';

// export async function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export const metadata: Metadata = {
  title: {
    default: siteConfig().name,
    template: `%s - ${siteConfig().name}`,
  },
  description: siteConfig().description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  //   const session = await auth();
  // const { locale } = await params;
  const messages = await getMessages();

  return (
    <>
      <html lang={"en"} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          <RootProvider messages={messages}>
            <div className='bg-background relative flex min-h-screen flex-col'>
              {children}
            </div>
          </RootProvider>
        </body>
      </html>
    </>
  );
}
