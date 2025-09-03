//import styles from './customer-page.module.css';

import { APP_NAME } from "@features/core/constants";
import { useAuth, useDrawerManager } from "@features/core/hook";
import { CustomerWorkshopForm } from "@features/users/components/form";
import { OrderList } from "@features/workshop/components/common";
import { OrderWorshoForm } from "@features/workshop/components/form";
import { ActionIcon, Group, Radio, Stack, Text, TextInput, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { getPageParam, traitedWhoConatinsFileExtractData, type WorkshopCustomersWorkshopsListParams, type CustomerWorkshopRead } from "@shared/api";
import { AvatarSewing, TableSewing } from "@shared/components";
import { IconCubePlus, IconEdit, IconEye } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type DataTableColumn } from 'mantine-datatable';

import { useRef, useState } from "react";

export interface CustomerPageProps { }

export const CustomerPage = ({ }: CustomerPageProps) => {

  const { openDrawer } = useDrawerManager()
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const { proxy, workshop } = useAuth()
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const [searchCustomerByGender, setSearchCustomerByGender] = useState<WorkshopCustomersWorkshopsListParams['genre'] | undefined>(undefined);
  const [searchCustomerName, setSearchCustomerName] = useState<string | undefined>(undefined);


  const { data: customers, fetchNextPage: fetchNextPageCustomer, isLoading: isLoadingCustomer, isFetchingNextPage, refetch: refreshCustomer } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [APP_NAME, workshop, searchCustomerByGender],
    enabled: !!workshop,
    retry: !!searchCustomerByGender && !!workshop,
    queryFn: async ({ pageParam }) => {
      if (workshop) {
        const response = await proxy.api.workshopCustomersWorkshopsList({
          slug: workshop.slug,
          page: pageParam,
          genre: searchCustomerByGender,
          name: searchCustomerName ? [searchCustomerName] : [],
        }, {
          secure: true
        })
        return response.data
      }
      return {
        next: undefined,
        previous: undefined,
        count: 0,
        results: [] as CustomerWorkshopRead[]
      }
    },
    getNextPageParam: (response) => getPageParam({ response, name: 'next' },),
  })

  const columns: DataTableColumn<CustomerWorkshopRead>[] = [
    {
      accessor: 'last_name',
      title: "Nom et prénoms",
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      width: 'max-content',
      render: (customer) => (
        <AvatarSewing
          photo={proxy.instance.defaults.baseURL && proxy.instance.defaults.baseURL + customer.photo || ''}
          name={`${customer.last_name} ${customer.first_name}`}
          username={customer.nickname}
          noName={false} />
      ),
      filter: ({ close }) => {
        return (
          <Group>
            <TextInput
              onChange={(event) => {
                setSearchCustomerName(event.target.value)
              }}
              onBlur={() => {
                if (searchCustomerName && searchCustomerName.length > 3) {
                  refreshCustomer()
                }
                close()
              }}
              value={searchCustomerName}
              placeholder="Rechercher par nom, prénoms ou surnom"
            />
          </Group>
        )
      }
    },
    {
      accessor: 'phone',
      title: 'Contact',
      width: 'fit-content',
      render: (customer) => (
        <Stack gap={0}>
          <Text component='a' href={`tel:${customer.phone}`}>{customer.phone}</Text>
          <Text c='dimmed' component='a' href={`mailto:${customer.email}`}>{customer.email}</Text>
        </Stack>
      )
    },
    {
      width: "0%",
      accessor: 'genre',
      title: 'Genre',
      render: (customer) => customer.genre === 'MAN' ? "Homme" : customer.genre === 'WOMAN' ? "Femme" : "Enfant",
      filter: ({ close }) => {
        return (
          <Radio.Group
            label="Selectionnez le genre"
            description='filtrez selon le genre'
            onChange={(value) => {
              setSearchCustomerByGender(value as WorkshopCustomersWorkshopsListParams['genre'] | undefined)
              close()
            }}
            defaultValue={searchCustomerByGender}
          >
            <Group mt="xs">
              {[['MAN', 'Hommes'], ['WOMAN', 'Femmes'], ['CHILDREN', 'Enfants'], [undefined, 'Tous']].map((genre) => (
                <Radio checked={genre[0] === searchCustomerByGender} value={genre[0]} label={genre[1]} />
              ))}
            </Group>
          </Radio.Group>
        )
      }
    },
    { width: "0%", accessor: 'ongoing_orders', title: 'Commandes en cours' },
    { width: "0%", accessor: 'total_orders', title: 'Commandes totales' },
    {
      width: "0%",
      accessor: 'actions',
      title: 'Actions',
      cellsStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      titleStyle: () => { return { backgroundColor: colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white[0] } },
      render: (customer) => (
        <Group wrap='nowrap'>
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: OrderWorshoForm.id, data: { fixedCustomer: customer } })}
          >
            <IconCubePlus />
          </ActionIcon>
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: CustomerWorkshopForm.id, data: { customer } })}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={'md'}
            radius="sm"
            variant='transparent'
            gradient={{ from: 'primary.4', to: 'secondary.4', deg: 90 }}
            onClick={() => openDrawer({ id: OrderList.id, data: { filteredOrders: { customer: customer } } })}
          >
            <IconEye />
          </ActionIcon>
        </Group>
      )
    }
  ]

  return (
    <TableSewing
      scrollViewportRef={scrollViewportRef}
      columns={columns}
      records={traitedWhoConatinsFileExtractData({
        data: customers?.pages.map((page) => page.results).flat(),
        fields: ['photo'],
        proxy
      }) || []}
      fetching={isLoadingCustomer || isFetchingNextPage}
      onScrollToBottom={fetchNextPageCustomer}
    />
  );
};
