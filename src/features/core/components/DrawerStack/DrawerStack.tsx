//import styles from './drawer-stack.module.css';

import { useDrawerManager } from "@features/core/hook";
import { Container, Drawer, LoadingOverlay, rgba, useMantineTheme, type ContainerProps, type CSSProperties, type DrawerProps } from "@mantine/core";
import type React from "react";

interface DrawerStackProps extends Omit<DrawerProps,
  'opened' | 'onClose' |
  "m" | "ml" | "mr" | "mt" | "mb" | "pt" | "p" | "pb" | "pl" | "pr"
> {
  id: string;
  containerProps?: CSSProperties;
  footerSection?: React.ReactNode;
  footerProps?: ContainerProps;
  isLoading?: boolean
}

export const DrawerStack = (
  {
    children,
    id,
    styles,
    title,
    radius = "lg",
    containerProps,
    footerSection,
    footerProps,
    isLoading = false,
    ...rest
  }: DrawerStackProps) => {
  const { isOpen, closeDrawer } = useDrawerManager()
  const theme = useMantineTheme()
  return (
    <Drawer
      offset={8}
      title={title}
      opened={isOpen(id)}
      onClose={() => closeDrawer(id)}
      position="right"
      radius={radius}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
        bg: rgba(theme.colors.secondary[9], 0.3),
      }}
      styles={{
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
        },
        body: {
          padding: 0,
          overflow: 'hidden',
          height: "100%",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          borderRadius: radius
        },
        header: {
          alignItems: typeof title === 'string' ? 'center' : 'start',
        },
        ...styles
      }}
      {...rest}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={100000}
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 5,
          bg: rgba(theme.colors.secondary[5], 0.3)
        }} />

      <div
        style={{
          paddingInline: theme.spacing.sm,
          paddingBlock: theme.spacing.xl,
          height: "100%",
          overflow: 'auto',
          ...containerProps
        }}
      >
        {children}
      </div>
      {footerSection &&
        <Container
          m={0}
          p='sm'
          bg="white"
          style={{
            width: '100%',
            boxShadow: '0 -1px 20px rgba(120, 119, 119, 0.3)',
            borderRadius: 0,
            zIndex: 1000,
          }}
          {...footerProps}>
          {footerSection}
        </Container>
      }
    </Drawer>
  );
};

