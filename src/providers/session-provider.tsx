"use client";

import { ReactNode,  } from "react";
// import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
// import { Session } from "next-auth";
// import { AuthProvider } from "@/context/auth-context";
import { SaasStoreProvider } from "./saas-store-provider";

// Custom SessionProvider component
const SessionProvider = ({
  children,
  // session,
}: {
  children: ReactNode;
  // session: Session | null;
}) => {
  return (
    // <NextAuthSessionProvider session={session}>
      <SaasStoreProvider>
        {children}
        {/* <AuthProvider>{children}</AuthProvider> */}
      </SaasStoreProvider>
    // </NextAuthSessionProvider>
  );
};

export default SessionProvider;
