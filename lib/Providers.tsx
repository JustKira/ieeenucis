"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "./providers/theme-provder";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default Providers;
