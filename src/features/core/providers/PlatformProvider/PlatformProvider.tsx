//import styles from './platform-provider.module.css';
import { Capacitor } from '@capacitor/core';
import React from "react";

export interface PlatformProviderProps {
  children: React.ReactNode;
}

type Platform = {
  isMobile: {
    android: boolean;
    ios: boolean
  } | false,
  isDesktop: boolean,
  isWeb: boolean
};
export const PlatFormContext = React.createContext<Platform>({} as Platform)

export const PlatformProvider = ({ children }: PlatformProviderProps) => {
  const isMobile = Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android' ? { android: Capacitor.getPlatform() === 'android', ios: Capacitor.getPlatform() === 'ios' } : false
  const isDesktop = !!(window && window.process && window.process.versions && window.process.versions.electron);
  
  const platform:Platform = {
    isWeb: !isDesktop && !isMobile,
    isMobile:  isMobile,
    isDesktop: isDesktop
  }

  return (
    <PlatFormContext.Provider value={platform}>
      {children}
    </PlatFormContext.Provider>
  );
};
