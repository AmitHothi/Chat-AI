import {
  AbstractIntlMessages,
  NextIntlClientProvider as NextIntProvider,
} from "next-intl";
// import { getMessages } from "next-intl/server";

const NextIntlClientProvider = ({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages?: AbstractIntlMessages;
}) => <NextIntProvider messages={messages}>{children}</NextIntProvider>;

export default NextIntlClientProvider;
