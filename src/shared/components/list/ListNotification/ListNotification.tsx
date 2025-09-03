//import styles from './list-notification.module.css';

import { APP_NAME } from "@features/core/constants";
import { useAuth, useWindow } from "@features/core/hook";
import { ActionIcon, Indicator, Loader, LoadingOverlay, Menu, ScrollArea, useMantineTheme } from "@mantine/core";
import { ButtonIcon } from "@shared/components/button";
import { IconBell } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { ListItemNotification } from "../ListItemNotification/ListItemNotification";
import type { InternalNotificatinoRead } from "@shared/api";

export interface ListNotificationProps {
  test?: boolean
}

export const ListNotification = ({ test }: ListNotificationProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  const { isAuthenticated, proxy } = useAuth()
  const { moreThan: { windowMobile, windowTablet } } = useWindow();
  const theme = useMantineTheme()

  const {
    data: notifications,
    isLoading: isLoadingNotification,
    fetchNextPage: fetchnextNotification,
    isFetchingNextPage: isFechingNext,
  } = useInfiniteQuery({
    queryKey: [APP_NAME, 'notification_internal'],
    queryFn: async ({ pageParam }) => {
      if (test) {
        return {
          next: "http://api.example.org/accounts/?page=4",
          previous: undefined,
          count: 80,
          results: new Array(20).fill({
            id: 1,
            title: "Créatino d'atelier",
            message: "votre boutique a ete crée avec success",
            category: "WORKER_CREATION",
            type: 'success',
            createdAt: '2023-05-19'
          } as InternalNotificatinoRead)
        }
      }


      const response = await proxy.api.notificationInternalList({ page: pageParam });
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (nextURL) => {
      if (!nextURL.next) return undefined;
      const url = new URL(nextURL.next);
      const page = url.searchParams.get('page');
      return page ? Number(page) : undefined;
    },
    getPreviousPageParam: (previousURL) => {
      if (!previousURL.next) return undefined;
      const url = new URL(previousURL.next);
      const page = url.searchParams.get('page');
      return page ? Number(page) : undefined;
    },
    enabled: test || !!isAuthenticated,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })


  return (
    <Menu shadow="md" width={windowMobile ? '95%' : windowTablet ? 400 : 600}>
      <Menu.Target>
        <Indicator
          inline
          label={notifications?.pages[0].count || 0}
          size={16}
          styles={{ "indicator": { top: windowMobile ? 10 : 5, right: windowMobile ? 10 : 3 } }}>
          {windowMobile ? (
            <ActionIcon
              variant="subtle" size={windowMobile ? 'xl' : 'md'} radius="lg" color="dimmed.2">
              <IconBell />
            </ActionIcon>
          ) : (
            <ButtonIcon sectionLeft={{ icon: IconBell }} title="vos notification" />
          )}
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown
        mih={windowMobile ? 300 : 400}
        style={{
          borderRadius: windowMobile ? theme.radius.md :  theme.radius.xl,
          ...(isLoadingNotification || !notifications || notifications.pages.length === 0) && { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }}
      >
        <LoadingOverlay visible={isFechingNext} />
        {!isLoadingNotification
          ? notifications
            ?
            (<>
              <ScrollArea.Autosize
                viewportRef={listRef}
                h={windowMobile ? 300 : 400}
                mah={windowMobile ? 300 : 400}
                onScrollPositionChange={() => {
                  const elt = listRef.current
                  if (!elt) return
                  const scrollTop = elt.scrollTop
                  const clientHeight = elt.clientHeight;
                  const scrollHeight = elt.scrollHeight;
                  const isBottom = scrollTop + clientHeight >= scrollHeight - 60
                  if (isBottom) {
                    fetchnextNotification()
                  }
                }}
              >
                {notifications.pages.map(page => page.results).flat().map((notification, index) => (
                  <>
                    <ListItemNotification
                      key={index}
                      separator={index < notifications.pages[0].count}
                      test={test}
                      notification={notification} />

                  </>
                ))}
              </ScrollArea.Autosize>
            </>) :
            (
              <Menu.Label>Vous n'avez aucune notification</Menu.Label>
            ) :
          <Loader />
        }
      </Menu.Dropdown>
    </Menu>
  );
};
