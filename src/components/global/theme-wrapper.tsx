"use client";

import { cn } from "@/lib/utils";
import { useSaasStore } from "@/providers";
import { ThemeSlice } from "@/stores/theme-slice";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const themeConfig = useSaasStore(
    (state) => (state as ThemeSlice).themeConfig,
  );

  return (
    <div
      className={cn(
        `theme-${themeConfig.theme || defaultTheme}`,
        "w-full",
        className,
      )}
      style={
        {
          "--radius": `${themeConfig.radius || 0.5}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default ThemeWrapper;
