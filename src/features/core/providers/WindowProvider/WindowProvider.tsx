import { useMantineTheme, type MantineBreakpointsValues } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useMemo } from "react";

export interface WindowProviderProps {
  children: React.ReactNode;
}

export type WindowFlags = {
  lessThan: {
    windowSmallMobile: boolean;
    windowMobile: boolean;
    windowTablet: boolean;
    windowDesktop: boolean;
    windowLargeDesktop: boolean;
  };
  moreThan: {
    windowSmallMobile: boolean;
    windowMobile: boolean;
    windowTablet: boolean;
    windowDesktop: boolean;
    windowLargeDesktop: boolean;
  };
  strict: {
    windowSmallMobile: boolean;
    windowMobile: boolean;
    windowTablet: boolean;
    windowDesktop: boolean;
    windowLargeDesktop: boolean;
  };
  currentBreakpoint: keyof MantineBreakpointsValues;
};

export const WindowContext = React.createContext<WindowFlags>({} as WindowFlags);

export const WindowProvider = ({ children }: WindowProviderProps) => {
  const theme = useMantineTheme();
  const breakpoints = theme.breakpoints;

  const isXs = useMediaQuery(`(max-width: ${breakpoints.xs})`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.xs}) and (max-width: ${breakpoints.sm})`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.lg})`);

  const currentBreakpoint = useMemo(() => {
    if (isXs) return "xs";
    if (isSm) return "sm";
    if (isMd) return "md";
    if (isLg) return "lg";
    return "xl";
  }, [isXs, isSm, isMd, isLg]);

  const windowFlags: WindowFlags = useMemo(() => {
    const breakpointsOrder: (keyof WindowFlags["lessThan"])[] = [
      "windowSmallMobile",
      "windowMobile",
      "windowTablet",
      "windowDesktop",
      "windowLargeDesktop",
    ];

    const strictFlags = {
      windowSmallMobile: isXs,
      windowMobile: isSm,
      windowTablet: isMd,
      windowDesktop: isLg,
      windowLargeDesktop: isXl,
    };

    const currentIndex = breakpointsOrder.findIndex(
      (key) => strictFlags[key] === true
    );

    const lessThan = breakpointsOrder.reduce((acc, key, index) => {
      acc[key] = index <= currentIndex;
      return acc;
    }, {} as WindowFlags["lessThan"]);

    const moreThan = breakpointsOrder.reduce((acc, key, index) => {
      acc[key] = index >= currentIndex;
      return acc;
    }, {} as WindowFlags["moreThan"]);

    return {
      strict: strictFlags,
      lessThan,
      moreThan,
      currentBreakpoint,
    };
  }, [isXs, isSm, isMd, isLg, isXl, currentBreakpoint]);

  return (
    <WindowContext.Provider value={windowFlags}>
      {children}
    </WindowContext.Provider>
  );
};
