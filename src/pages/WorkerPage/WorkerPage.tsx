//import styles from './worker-page.module.css';

import { getPageParam, traitedWhoConatinsFileExtractData, type WorkerRead } from "@shared/api";
import { AvatarSewing, TableSewing } from "@shared/components";
import { OrderList } from "@features/workshop/components/common";
import { IconCubePlus, IconEdit, IconEye } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type DataTableColumn } from 'mantine-datatable';
import { useRef } from "react";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { ActionIcon, Group, Stack, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { UserForm } from "@features/users/components/form";
import { APP_NAME } from "@features/core/constants";
import { OrderWorshoForm } from "@features/workshop/components/form";

export interface WorkerPageProps { }

export const WorkerPage = ({ }: WorkerPageProps) => {

  const { openDrawer } = useDrawerManager()
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const { proxy, workshop } = useAuth()
  const scrollViewportRef = useRef<HTMLDivElement>(null);


  const columns: DataTableColumn<WorkerRead>[] = [
    {
      accessor: 'last_name',
      title: "Nom et prénoms",
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      render: (worker) => (
        <AvatarSewing
          photo={worker.user.photo || ""}
          name={`${worker.user.last_name}`}
          username={worker.user.first_name}
          noName={false}
        />
      ),
    },

    {
      accessor: 'phone',
      title: 'Contact',
      width: 'fit-content',
      render: (worker) => (
        <Stack gap={0}>
          <Text component='a' href={`tel:${worker.user.phone}`}>{worker.user.phone}</Text>
          <Text c='dimmed' component='a' href={`mailto:${worker.user.email}`}>{worker.user.email}</Text>
        </Stack>
      )
    },
    { width: "0%", accessor: 'ongoing_orders', title: 'Commandes en cours' },
    { width: "0%", accessor: 'total_orders', title: 'Commandes totales' },
    {
      accessor: 'actions',
      title: 'Actions',
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      render: (worker) => (
        <Group>
          {/* <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
          >
            <IconCalendarEvent />
          </ActionIcon> */}
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: OrderWorshoForm.id, data: { fixedWorker: worker } })}
          >
            <IconCubePlus />
          </ActionIcon>
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: UserForm.id, data: { worker } })}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: OrderList.id, data: { filteredOrders: { worker } } })}
          >
            <IconEye />
          </ActionIcon>
        </Group>
      )
    }
  ]

  const { data: workers, fetchNextPage: fetchNextPageWorker, isLoading: isLoadingWorker } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [APP_NAME, 'workers', workshop],
    enabled: !!workshop,
    retry: !!workshop,
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.workshopUsersWorkersList({
          slug: workshop.slug,
          page: pageParam,
        }, { secure: true })
        return response.data
      }
      return {
        next: undefined,
        previous: undefined,
        count: 0,
        results: [] as WorkerRead[]
      }
    },
    getNextPageParam: (response) => getPageParam({ response, name: 'next' },),
  })

  return (
    <TableSewing
      scrollViewportRef={scrollViewportRef}
      columns={columns}
      records={workers ? traitedWhoConatinsFileExtractData({
        data: workers?.pages.map((page) => page.results).flat(),
        fields: ["user.photo"],
        proxy
      }) : []}
      fetching={isLoadingWorker}
      onScrollToBottom={fetchNextPageWorker}
    />
  );
};
