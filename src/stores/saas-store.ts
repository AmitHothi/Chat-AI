import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { createThemeSlice, ThemeSlice } from "./theme-slice";
import { createSidebarSlice, SidebarSlice } from "./side-bar-slice";
import { createOrganizationSlice, OrganizationSlice } from "./tenants-slice";
import { createUserAuthSlice, UserAuthSlice } from "./user-auth-slice";

const createSaasStore = () =>
  createStore<ThemeSlice | SidebarSlice | OrganizationSlice | UserAuthSlice>()(
    persist(
      (set, _get, _api) => ({
        ...createThemeSlice(set),
        ...createSidebarSlice(set),
        ...createOrganizationSlice(set),
        ...createUserAuthSlice(set),
      }),
      {
        name: "saas-store",
      },
    ),
  );

export default createSaasStore;
