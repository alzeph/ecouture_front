//import styles from './customer-field.module.css';

import { getPageParam, type CustomerWorkshopRead } from "@shared/api";
import { SelectField, type SelectFieldProps } from "../SelectField/SelectField";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@features/core/hook";
import { APP_NAME } from "@features/core/constants";
import { Badge, Group, Text } from "@mantine/core";

export interface CustomerFieldProps extends Omit<SelectFieldProps<CustomerWorkshopRead>, 'query' | 'data' | "render"> { 
  render?: (value: CustomerWorkshopRead) => { label: string | number; value: string | number, data: CustomerWorkshopRead };
  
}


export const CustomerField = ({
  fixeValue,
  name = "customer",
  render = (value) => ({ label: `${value.last_name} ${value.first_name}`, value: value.id, data: value }),
  ...rest }: CustomerFieldProps) => {
  const { proxy, workshop } = useAuth()

  const {
    data: customers,
    isLoading: isLoadingCustomer,
    fetchNextPage: fetchNextPageCustomer,
    // isFetchingNextPage: isFetchingNextPageCustomer
  } = useInfiniteQuery({
    queryKey: [APP_NAME, 'customer_workshop', workshop],
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.workshopCustomersWorkshopsList({ slug: workshop.slug, page: pageParam })
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
    enabled: !!workshop && !!!fixeValue,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })

  return (
    <SelectField<CustomerWorkshopRead>
      name={name}
     
      isError
      data={customers?.pages.map(page => page.results).flat().map(customers => customers)}
      fixeValue={fixeValue}
      placeholder='Selectionner le client'
      query={{
        infiniteScroll: true,
        queryFn: fetchNextPageCustomer,
        isLoading: isLoadingCustomer
      }}
      render={render}
      optionRender={(value) => (
        <Group justify='space-between'>
          <Text>{value.last_name} {value.first_name}</Text>
          <Badge bg={workshop?.settings.max_order_ongoing_by_worker && Number(value.ongoing_orders) > workshop?.settings.max_order_ongoing_by_worker ? 'error.9' : 'info.9'}>{value.ongoing_orders}</Badge>
        </Group>
      )}
      {...rest}
    />
  );
};
