//import styles from './diary-page.module.css';

import { APP_NAME } from "@features/core/constants";
import { useAuth, useConfirmationAction, useDrawerManager } from "@features/core/hook";
import { FittingForm } from "@features/workshop/components/form";
import { ActionIcon, Badge, Button, Card, darken, Flex, Grid, Group, Loader, MultiSelect, Stack, Text, UnstyledButton, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { getPageParam, responseExtractData, responseTraited, traitedWhoConatinsFileExtractData, type CustomerWorkshopRead, type FittingRead, type OrderWorkshopRead, type WorkerRead } from "@shared/api";
import { AvatarSewing, TableSewing } from "@shared/components";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { DataTableColumn } from "mantine-datatable";
import { useEffect, useMemo, useRef, useState } from "react";
import qs from "qs";
import { notifications } from "@mantine/notifications";
import { useDebouncedCallback } from "@mantine/hooks";
import { getPeriodFromDateOrRange, type OutputDate } from "@shared/utils";
// import {  type DateValue } from "@mantine/dates";

export interface DiaryPageProps { }

const statusLabels: Record<any, string> = {
  NEW: 'Nouvelle commande',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
  DELETED: "Supprimée"
};

const statusColors: Record<any, string> = {
  NEW: 'primary',
  IN_PROGRESS: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'error',
  DELETED: "error"
};

const fittingStatusLabels: Record<string, string> = {
  SCHEDULED: 'Prévu',
  COMPLETED: 'Terminé',
  CANCELLED: 'Annulé',
  NEEDS_MAJOR_ADJUSTMENTS: 'Nécessite des ajustements importants',
};

const FittingCard = ({ fitting, order }: { fitting: FittingRead, order: OrderWorkshopRead }) => {
  const { openDrawer } = useDrawerManager();
  const { proxy } = useAuth();
  const queryClient = useQueryClient();
  const { colorScheme } = useMantineColorScheme()

  const deleteFitting = useMutation({
    mutationFn: async () => {
      const response = await responseTraited({
        queryFn: () => proxy.api.apiWorkshopOrdersFittingsDestroy(String(fitting.id), order.worker.workshop.slug)
      });
      return responseExtractData(response);
    },
    onSuccess: () => {
      // Invalider les queries pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: [APP_NAME, 'Orders-diary'] });
      notifications.show({
        title: 'Essayage supprimé',
        message: 'Essayage supprimé avec succès',
        color: 'green'
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression:', error);
      notifications.show({
        title: 'Erreur',
        message: "Une erreur s'est produite lors de la suppression de l'essayage",
        color: 'red'
      });
    }
  });

  const confirmationDelete = useConfirmationAction();

  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
      <Card h="100%" withBorder p="sm" bg={colorScheme === 'dark' ? 'dark.7' : 'gray.0'}>
        <Group justify="space-between" align="start" wrap="nowrap">
          <div>
            <Text fw={500}>Essayage #{fitting.fitting_number}</Text>
            {fitting.actual_date && (
              <Text size="sm" c="dimmed">
                Réalisé le {dayjs(fitting.actual_date).format('DD/MM/YYYY')}
              </Text>
            )}
            <Text size="sm" c="dimmed">
              Prévu le {dayjs(fitting.scheduled_date).format('DD/MM/YYYY')}
            </Text>
          </div>
          <Flex direction="column" align='end' gap='sm'>
            <Group gap='xs'>
              <Badge
                color={fitting.status === 'COMPLETED' ? 'green' :
                  fitting.status === 'NEEDS_MAJOR_ADJUSTMENTS' ? 'orange' : 'blue'}
                size="sm"
              >
                {fittingStatusLabels[fitting.status]}
              </Badge>
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={() => openDrawer({ id: FittingForm.id, data: { fitting, order } })}
              >
                <IconEdit />
              </ActionIcon>
            </Group>
            <Group>
              <ActionIcon
                size='sm'
                variant="transparent"
                onClick={
                  () => confirmationDelete({
                    title: "Suppression de l'essayage",
                    message: "Voulez-vous vraiment supprimer cet essayage ?",
                    confirmLabel: "Oui, je souhaite supprimer cet essayage",
                    onConfirm: () => deleteFitting.mutateAsync()
                  })
                } loading={deleteFitting.isPending}>
                <IconTrash />
              </ActionIcon>
            </Group>
          </Flex>
        </Group>

        {fitting.notes && (
          <Text size="sm" mt="xs">{fitting.notes}</Text>
        )}
        {fitting.adjustments_needed && (
          <Text size="sm" mt="xs" c="orange">
            Ajustements: {fitting.adjustments_needed}
          </Text>
        )}
      </Card>
    </Grid.Col>
  );
};

const RenderFittings = ({ order }: { order: OrderWorkshopRead }) => {
  const isEditable = useMemo(() => order?.status === 'IN_PROGRESS', [order?.status]);
  const { openDrawer } = useDrawerManager();

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500}>Essayages</Text>
          <Button
            disabled={!isEditable}
            size="xs"
            variant="outline"
            onClick={() => openDrawer({ id: FittingForm.id, data: { order } })}
          >
            Ajouter un essayage
          </Button>
        </Group>

        <Grid>
          {order?.fittings?.map((fitting) => (
            <FittingCard key={fitting.id || fitting.fitting_number} fitting={fitting} order={order} />
          ))}
        </Grid>
      </Stack>
    </Card>
  );
};

export const DiaryPage = ({ }: DiaryPageProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme()
  const { proxy, workshop } = useAuth();
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string[]>([]);

  const [dataPeriode, setDataPeriode] = useState<OutputDate | undefined>(undefined)
  // const [valuecalendar, setValueCalendar] = useState<[DateValue, DateValue]>()


  // Fonction de refetch optimisée
  const refetchWithDebounce = useDebouncedCallback(() => refetchOrders(), 1000);

  const {
    data: orders,
    fetchNextPage: fetchNextPageOrders,
    isFetchingNextPage: isLoadingOrders,
    refetch: refetchOrders,
    isError,
    error
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [APP_NAME, 'orders-diary-page', workshop?.slug, selectedCustomer, selectedWorker, dataPeriode?.drf.start, dataPeriode?.drf.end],
    enabled: !!workshop,
    queryFn: async ({ pageParam }) => {
      if (!workshop) {
        return {
          next: undefined,
          previous: undefined,
          count: 0,
          results: [] as OrderWorkshopRead[]
        };
      }

      try {
        const response = await proxy.api.apiWorkshopOrdersList({
          slug: workshop.slug,
          page: pageParam,
          customer: selectedCustomer.length > 0 ? selectedCustomer as any : undefined,
          worker: selectedWorker.length > 0 ? selectedWorker as any : undefined,
          delivery_after: dataPeriode?.drf.start,
          delivery_before: dataPeriode?.drf.end
        }, {
          secure: true,
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })
        });
        return response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
        throw error;
      }
    },
    getNextPageParam: (response) => getPageParam({ response, name: 'next' }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const {
    data: customers,
    isLoading: isLoadingCustomer,
    fetchNextPage: fetchNextPageCustomer,
    // isFetchingNextPage: isFetchingNextPageCustomer
  } = useInfiniteQuery({
    queryKey: [APP_NAME, 'customer_workshop', workshop],
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.apiWorkshopCustomersWorkshopsList({ slug: workshop.slug, page: pageParam })
        return response.data
      } else {
        return {
          next: undefined,
          previous: undefined,
          count: 0,
          results: [] as CustomerWorkshopRead[]
        }
      }
    },
    initialPageParam: 1,
    getNextPageParam: (response) => getPageParam({ response, name: 'next' }),
    getPreviousPageParam: (response) => getPageParam({ response, name: 'previous' }),
    enabled: !!workshop,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })


  const {
    data: workers,
    isLoading: isLoadingWorkers,
    fetchNextPage: fetchNextPageWorker,
  } = useInfiniteQuery({
    queryKey: ['workers', workshop],
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.apiWorkshopUsersWorkersList({ slug: workshop.slug, page: pageParam })
        return response.data
      } else {
        return {
          next: undefined,
          previous: undefined,
          count: 0,
          results: [] as WorkerRead[]
        }
      }
    },
    initialPageParam: 1,
    getNextPageParam: (response) => getPageParam({ response, name: 'next' }),
    getPreviousPageParam: (response) => getPageParam({ response, name: 'previous' }),
    enabled: !!workshop,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })

  useEffect(() => {
    if (dataPeriode) {
      refetchWithDebounce()
      console.log(dataPeriode)
    }
  }, [dataPeriode])

  // Gestion d'erreur
  if (isError) {
    console.error('Erreur dans useInfiniteQuery:', error);
  }

  const customersName = useMemo(() => {
    if (!customers?.pages) return [];

    const allCustomers = customers.pages
      .flatMap((page) => page.results)
      .filter(Boolean);

    const uniqueCustomers = Array.from(
      new Map(allCustomers.map((c) => [c.id, c])).values()
    );

    return uniqueCustomers.map((c) => ({
      value: String(c.id),
      label: `${c.first_name} ${c.last_name}`,
    }));
  }, [orders?.pages]);

  const WorkersName = useMemo(() => {
    if (!workers?.pages) return [];

    const allWorkers = workers.pages
      .flatMap((page) => page.results)
      .filter(Boolean);

    const uniqueWorkers = Array.from(
      new Map(allWorkers.map((w) => [w.id, w])).values()
    );

    return uniqueWorkers.map((w) => ({
      value: String(w.id),
      label: `${w.user.first_name} ${w.user.last_name}`,
    }));
  }, [orders?.pages]);

  const columns: DataTableColumn<OrderWorkshopRead>[] = useMemo(() => [
    {
      accessor: 'number',
      title: 'N° Commande',
      width: 'fit-content',
      render: (order) => order.number,
    },
    {
      accessor: 'customer',
      title: "Client",
      render: (order) => (
        <AvatarSewing
          photo={order.customer?.photo || ""}
          name={`${order.customer?.last_name || ''}`}
          username={order.customer?.first_name || ''}
          noName={false}
          withIndicator={order.status === 'NEW' || order.status === "IN_PROGRESS"}
          indicatorProps={{
            inline: true,
            zIndex: 1,
            processing: true,
            color: dayjs(order.promised_delivery_date).isBefore(dayjs()) ? 'red' : 'blue',
            size: 12,
            position: 'top-start',
            styles: {
              "indicator": {
                top: 10
              }
            }
          }}
        />
      ),
      filter: (
        <MultiSelect
          label="Clients"
          description="Choisissez un ou plusieurs clients en particulier"
          data={customersName}
          value={selectedCustomer}
          placeholder="Rechercher des clients…"
          onChange={(values) => {
            setSelectedCustomer(values);
            refetchWithDebounce();
          }}
          leftSection={<IconSearch size={16} />}
          comboboxProps={{ withinPortal: false }}
          clearable
          searchable
          disabled={isLoadingCustomer}
          rightSection={isLoadingCustomer && <Loader size="xs" />}
          onScrollEnd={() => fetchNextPageCustomer()}
        />
      ),
    },
    {
      accessor: 'worker',
      title: "Ouvrier",
      render: (order) => (
        <AvatarSewing
          photo={order.worker?.user?.photo || ""}
          name={`${order.worker?.user?.last_name || ''}`}
          username={order.worker?.user?.first_name || ''}
          noName={false}
        />
      ),
      filter: (
        <MultiSelect
          label="Ouvriers"
          description="Choisissez un ou plusieurs couturiers en particulier"
          data={WorkersName}
          value={selectedWorker}
          placeholder="Rechercher couturier"
          onChange={(values) => {
            setSelectedWorker(values);
            refetchWithDebounce();
          }}
          leftSection={<IconSearch size={16} />}
          comboboxProps={{ withinPortal: false }}
          clearable
          searchable
          rightSection={isLoadingWorkers && <Loader size="xs" />}
          onScrollEnd={() => fetchNextPageWorker()}
        />
      ),
    },
    {
      accessor: 'promised_delivery_date',
      title: 'Date de livraison',
      width: 'fit-content',
      render: (order) => dayjs(order.promised_delivery_date).format('DD/MM/YYYY'),
      filter: (
        <Stack>
          <UnstyledButton onClick={() => setDataPeriode(undefined)}>Toutes</UnstyledButton>
          <UnstyledButton
            onClick={() => {
              setDataPeriode(
                getPeriodFromDateOrRange([
                  dayjs().toDate(),              // aujourd'hui
                  dayjs().add(1, 'day').toDate() // demain
                ])
              );
            }}
          >Aujourd'hui</UnstyledButton>
          <UnstyledButton
            onClick={() => {
              setDataPeriode(
                getPeriodFromDateOrRange(
                  dayjs().toDate(),
                )
              );
            }}
          >Cette semaine</UnstyledButton>
          <UnstyledButton
            onClick={() => {
              setDataPeriode(
                getPeriodFromDateOrRange(
                  dayjs().toDate(),
                  "MONTH"
                )
              );
            }}
          >Ce mois</UnstyledButton>
          {/* <DatePicker
            type="range"
            value={valuecalendar}
            onChange={(values) => {
              setValueCalendar(values)
            }}ls
            onBlur={() => {
              if (
                valuecalendar ?  valuecalendar[1] && valuecalendar[0] &&
                valuecalendar[1] !== null && valuecalendar[0] != null) {
                setDataPeriode(getPeriodFromDateOrRange(valuecalendar))
              }
            }}

          /> */}
        </Stack>
      )
    },
    {
      accessor: 'estimated_delivery_date',
      title: "Estimation de livraison",
      width: 'fit-content',
      render: (order) => dayjs(order.estimated_delivery_date).format('DD/MM/YYYY')
    },
    {
      accessor: 'status',
      title: 'Statut',
      width: 'fit-content',
      render: (order) => (
        <Badge color={statusColors[order.status]} size="sm">
          {statusLabels[order.status]}
        </Badge>
      )
    },
    {
      accessor: 'fittings',
      title: 'Essayages',
      width: 'fit-content',
      render: (order) => {
        const pendingFittings = order.fittings?.filter(
          (fitting) =>
            fitting.status !== "COMPLETED" &&
            !dayjs(fitting.scheduled_date).isBefore(dayjs(), 'day')
        ).length || 0;

        return (
          <Badge color="blue" size="sm">
            {pendingFittings}
          </Badge>
        );
      }
    },
  ], [customersName, WorkersName, refetchWithDebounce]);

  const processedRecords = useMemo(() => {
    const rawData = orders?.pages?.flatMap((page) => page.results || []) || [];
    return traitedWhoConatinsFileExtractData({
      data: rawData,
      fields: ["customer.photo"],
      proxy
    });
  }, [orders?.pages, proxy]);

  return (
    <TableSewing
      scrollViewportRef={scrollViewportRef}
      columns={columns}
      height={"100%"}
      records={processedRecords}
      fetching={isLoadingOrders}
      onScrollToBottom={fetchNextPageOrders}
      rowStyle={(record) => {
        if (record.status === "COMPLETED") {
          return { backgroundColor: colorScheme === 'dark' ? darken(theme.colors.success[9], 0.6) : theme.colors.success[2] };
        }
        if (record.status === "CANCELLED" || record.status === "DELETED") {
          return { backgroundColor: colorScheme === 'dark' ? darken(theme.colors.error[9], 0.6) : theme.colors.error[1] };
        }
        if (record.status === "IN_PROGRESS") {
          return { backgroundColor: colorScheme === 'dark' ? darken(theme.colors.info[9], 0.6) : theme.colors.info[2] };
        }
        return { backgroundColor: colorScheme === 'dark' ? darken(theme.colors.gray[9], 0.6) : theme.colors.white[1] };
      }}
      rowExpansion={{
        content: ({ record: order }) => {
          return <RenderFittings order={order} />;
        }
      }}
    />
  );
};

