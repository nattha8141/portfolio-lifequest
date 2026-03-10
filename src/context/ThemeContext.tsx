"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type ThemeColors = {
  accent: string;
  accentRgb: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  panel: string;
  particles: {
    color: string;
    count: number;
  };
};

export const DARK_THEME: ThemeColors = {
  accent: "#e8a849",
  accentRgb: "232, 168, 73",
  background: {
    primary: "#1e1e24",
    secondary: "#16161b",
    tertiary: "#0e0e12",
  },
  text: {
    primary: "#e8e4de",
    secondary: "#b8b8c0",
    muted: "#6a6a70",
  },
  panel: "#22222a",
  particles: {
    color: "232, 168, 73",
    count: 25,
  },
};

export const LIGHT_THEME: ThemeColors = {
  accent: "#c8900a",
  accentRgb: "200, 144, 10",
  background: {
    primary: "#f0ece4",
    secondary: "#e6e1d8",
    tertiary: "#d8d2c8",
  },
  text: {
    primary: "#1a1a1e",
    secondary: "#4a4a50",
    muted: "#8a8a90",
  },
  panel: "#faf8f4",
  particles: {
    color: "200, 144, 10",
    count: 25,
  },
};

type ThemeContextValue = {
  theme: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: DARK_THEME,
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = useCallback(() => setIsDark((v) => !v), []);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
