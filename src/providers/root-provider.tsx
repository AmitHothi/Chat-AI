import { Toaster } from '@/components/ui/toaster';
import NextIntlClientProvider from './next-intl-client-provider';
import { AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from './theme-provider';

type ProviderProps = {
  /** React children */
  children: React.ReactNode;
  // session: Session | null;
  messages?: AbstractIntlMessages;
};
export const RootProvider = ({
  children,
  // session,
  messages,
}: ProviderProps) => (
  <NextIntlClientProvider messages={messages}>
    {/* <SessionProvider session={session}> */}
    {/* <ApolloWrapper> */}
      {/* <AutoLogoutProvider> */}
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <ThemeWrapper defaultTheme="zinc"> */}
      {children}
      <Toaster />
      {/* </ThemeWrapper> */}
          </ThemeProvider>
        {/* </AutoLogoutProvider> */}
    {/* </ApolloWrapper> */}
    {/* </SessionProvider> */}
  </NextIntlClientProvider>
);
