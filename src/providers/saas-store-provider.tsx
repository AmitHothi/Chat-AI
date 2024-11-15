import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { ThemeSlice } from "@/stores/theme-slice";
import createSaasStore from "@/stores/saas-store";
import { StoreApi } from "zustand/vanilla";
import { useStore } from "zustand";
import { SidebarSlice } from "@/stores/side-bar-slice";
import { OrganizationSlice } from "@/stores/tenants-slice";
import { UserAuthSlice } from "@/stores/user-auth-slice";

type useStoreType =
  | ThemeSlice
  | SidebarSlice
  | OrganizationSlice
  | UserAuthSlice; // add slice type here

export type SaasStoreApi = StoreApi<useStoreType>;

// Create context for the combined store
const SaasStoreContext = createContext<SaasStoreApi | undefined>(undefined);

export interface SaasStoreProviderProps {
  children: ReactNode;
}

// Create the provider component
export const SaasStoreProvider: FunctionComponent<SaasStoreProviderProps> = ({
  children,
}) => {
  const storeRef = useRef<SaasStoreApi>();
  if (!storeRef?.current) {
    storeRef.current = createSaasStore();
  }

  return (
    <SaasStoreContext.Provider value={storeRef.current}>
      {children}
    </SaasStoreContext.Provider>
  );
};

// Hook to use the combined store
export const useSaasStore = <T,>(selector: (store: useStoreType) => T): T => {
  const storeContext = useContext(SaasStoreContext);

  if (!storeContext) {
    throw new Error("useSaasStore must be used within SaasStoreProvider");
  }

  return useStore(storeContext, selector);
};
