//import styles from './worker-field.module.css';

import { getPageParam, type WorkerRead } from "@shared/api";
import { SelectField, type SelectFieldProps } from "../SelectField/SelectField";
import { useAuth } from "@features/core/hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Badge, Group, Text } from "@mantine/core";

export interface WorkerFieldProps extends Omit<SelectFieldProps<WorkerRead>, 'query' | 'data' | "render"> {
   render?: (value: WorkerRead) => { label: string | number; value: string | number, data: WorkerRead };
}

export const WorkerField = ({
  name='worker', 
  fixeValue, 
  render=(value) => ({ label: `${value.user.last_name} ${value.user.first_name}`, value: value.id, data: value }), 
  ...rest }: WorkerFieldProps) => {

  const { proxy, workshop } = useAuth()

  const {
    data: workers,
    isLoading: isLoadingWorkers,
    fetchNextPage: fetchNextPageWorker,
    // isFetchingNextPage: isFetchingNextPageCustomer
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
    enabled: !!workshop && !!!fixeValue,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })

  return (
    <SelectField<WorkerRead>
      name={name}
      isError
      data={workers?.pages.map(page => page.results).flat().map(worker => worker)}
      fixeValue={fixeValue}
      render={render}
      query={{
        infiniteScroll: true,
        queryFn: fetchNextPageWorker,
        isLoading: isLoadingWorkers
      }}
      optionRender={(value) => (
        <Group justify='space-between'>
          <Text>{value.user.last_name} {value.user.first_name}</Text>
          <Badge bg={workshop?.settings.max_order_ongoing_by_worker && Number(value.ongoing_orders) > workshop?.settings.max_order_ongoing_by_worker ? 'error.9' : 'info.9'}>{value.ongoing_orders}</Badge>
        </Group>
      )}
      disabledOption={(value) => workshop?.settings.max_order_ongoing_by_worker !== undefined && (Number(value.ongoing_orders) > workshop?.settings.max_order_ongoing_by_worker)}
      placeholder='Selectionner un ouvrier'
      {...rest}
    />
  );
};
