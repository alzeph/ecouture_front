import styles from './dashboard.module.css';

import { useAuth, useDrawerManager, useWindow } from "@features/core/hook";
import { LoginForm } from '@features/users/components/form';
import { ActionIcon, AppShell, Burger, rgba, useMantineTheme, type CSSProperties } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavBar, SideBar } from "@shared/components/common";
import { IconDoorEnter, IconDoorExit } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export interface DashboardProps {
  test?: boolean
}

export const Dashboard = ({ test }: DashboardProps) => {
  const refNavBar = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(true);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { moreThan: { windowMobile } } = useWindow()
  const { openDrawer, closeDrawer, isOpen } = useDrawerManager()
  const loginDrawerOpened = isOpen(LoginForm.id)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && !loginDrawerOpened ) {
      openDrawer({ id: LoginForm.id })
    } else {
      closeDrawer(LoginForm.id)
    }
  }, [isAuthenticated, loginDrawerOpened])


  return (
    <>
      <AppShell
        header={{ height: 70 }}
        navbar={{
          width: 280,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        styles={() => ({
          main: {
            height: "100vh",
          }
        })}
        padding="md"
      >
        <AppShell.Header p='sm' style={{ alignItems: "center", justifyContent: 'center', display: 'flex' }}>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <NavBar test={test} />
        </AppShell.Header>

        <AppShell.Navbar p="md" ref={refNavBar}>
          <div
            className={`${styles["collasped-navbar-desktop"]}`}
            style={{
              overflowY: "auto",
              "--translate-x": desktopOpened ? "-40%" : "10%",
              "--translate-y": desktopOpened ? "-50%" : "10%",
              "--position-top": desktopOpened ? "50%" : "10%",
            } as CSSProperties}
          >
            {!windowMobile && (
              <ActionIcon
                className={`${styles["action-icon"]}`}
                onClick={toggleDesktop}
                variant={desktopOpened ? "gradient" : "filled"}
                color={rgba(theme.colors.primary[2], 0.5)}
                size="lg"
                gradient={{
                  from: theme.colors.primary[2],
                  to: theme.colors.secondary[4],
                }}
                radius="lg"
              >
                {!desktopOpened ? <IconDoorExit /> : <IconDoorEnter />}
              </ActionIcon>
            )}
          </div>
          <div className={`${styles["scrollbar"]}`}>
            <SideBar />
          </div>
        </AppShell.Navbar>
        <AppShell.Main style={{ position: 'relative' }}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};
