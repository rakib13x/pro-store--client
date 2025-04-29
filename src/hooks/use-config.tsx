// hooks/use-config.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the configuration types
type SidebarType = "default" | "compact" | "two-column";
type SkinType = "default" | "bordered";
type ContentWidthType = "full" | "boxed";
type LayoutType = "vertical" | "horizontal" | "semi-box" | "compact";
type NavbarType = "sticky" | "static" | "floating";

// Define the configuration interface
interface Config {
  sidebar: SidebarType;
  collapsed: boolean;
  skin: SkinType;
  contentWidth: ContentWidthType;
  menuHidden: boolean;
  layout: LayoutType;
  subMenu: boolean;
  hasSubMenu: boolean;
  navbar: NavbarType;
}

// Default configuration
const defaultConfig: Config = {
  sidebar: "default",
  collapsed: false,
  skin: "default",
  contentWidth: "full",
  menuHidden: false,
  layout: "vertical",
  subMenu: false,
  hasSubMenu: false,
  navbar: "sticky",
};

// Create context
const ConfigContext = createContext<{
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  updateConfig: (updates: Partial<Config>) => void;
}>({
  config: defaultConfig,
  setConfig: () => null,
  updateConfig: () => null,
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  // Load config from localStorage if available
  const [config, setConfig] = useState<Config>(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("layout-config");
      return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    }
    return defaultConfig;
  });

  // Update config with partial changes
  const updateConfig = (updates: Partial<Config>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };
      return newConfig;
    });
  };

  // Save config to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("layout-config", JSON.stringify(config));
    }
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context.config;
};

export const useConfigUpdate = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfigUpdate must be used within a ConfigProvider");
  }

  return context.updateConfig;
};
