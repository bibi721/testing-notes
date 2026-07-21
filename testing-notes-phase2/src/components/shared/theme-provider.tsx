"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes so the theme (light/dark/system) is applied via a
 * `class` on <html>, matching the `.dark` selector used throughout
 * globals.css. `disableTransitionOnChange` avoids a flash of colour
 * animation when the user toggles theme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
