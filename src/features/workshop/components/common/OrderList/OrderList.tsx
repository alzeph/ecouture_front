//import styles from './order-list.module.css';

import { DrawerStack } from "@features/core/components";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { getPageParam, traitedWhoConatinsFileExtractData, type CustomerWorkshopRead, type OrderWorkshopRead, type WorkerRead } from "@shared/api";
import { ListSewing } from "@shared/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ListItemOrder } from "../ListItemOrder/ListItemOrder";
import { APP_NAME } from "@features/core/constants";

export interface OrderListProps {

}

const id = "OrderList"
export const OrderList = ({ }: OrderListProps) => {

  const { workshop, proxy } = useAuth()
  const { getData } = useDrawerManager()
  const [valueOrderStatusSearch, setValueOrderStatusSearch] = useState<OrderWorkshopRead['status'] | undefined>(undefined)
  const filteredOrders = useMemo(() => {
    const data = getData() as {
      filteredOrders:
      | { worker: WorkerRead; customer?: undefined }
      | { customer: CustomerWorkshopRead; worker?: undefined }
    }
    return data?.filteredOrders
  }, [getData])

  const { data: orders, isLoading: isLoadingOrders, fetchNextPage: fetchNextPageOrders, isFetchingNextPage: isFetchingNextPageOrders } = useInfiniteQuery({
    queryKey: [APP_NAME, 'orders_workshop', filteredOrders, workshop, valueOrderStatusSearch],
    queryFn: async () => {
      const response = filteredOrders.customer
        ? await proxy.api.workshopOrdersList({ slug: workshop?.slug || "", customer: [filteredOrders.customer.id], status: valueOrderStatusSearch as any  }, { secure: true })
        : await proxy.api.workshopOrdersList({ slug: workshop?.slug || "", worker: [filteredOrders.worker.id], status: valueOrderStatusSearch as any}, { secure: true })
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!workshop && !!filteredOrders,
    retry: !!workshop && filteredOrders && !!valueOrderStatusSearch,
    initialPageParam: 1,
    getNextPageParam: (response) => getPageParam({ response, name: 'next' },)
  })

  return (
    <DrawerStack
      isLoading={isFetchingNextPageOrders}
      containerProps={{ overflow: 'hidden' }}
      title={
        <Stack gap='sm'>
          <Title order={5}>Commandes</Title>
          <Group justify="center">
            <SegmentedControl
              radius="md"
              color="primary.9"
              onChange={(value) => setValueOrderStatusSearch(value === 'undefined' ? undefined : value as OrderWorkshopRead['status'])}
              fullWidth
              withItemsBorders={false} defaultValue='undefined' data={[
                { value: 'undefined', label: 'Tous' },
                { value: 'NEW', label: 'En attente', },
                { value: 'IN_PROGRESS', label: 'En cours', },
                { value: 'COMPLETED', label: 'Terminée' },
                { value: 'CANCELLED', label: 'Annuler' },
              ]} />
          </Group>

        </Stack>
      }
      id={id}

    >

      <ListSewing skeleton={isLoadingOrders} handleScrollBottom={fetchNextPageOrders}>
        {orders && traitedWhoConatinsFileExtractData({
          data: orders.pages.map(page => page.results).flat(),
          proxy,
          fields: ['photo_of_clothing_model', 'photo_of_fabric']
        })
          .map((order, index) => (
            <ListItemOrder key={index} order={order} />
          ))}
      </ListSewing>


    </DrawerStack>
  );
};

OrderList.id = id