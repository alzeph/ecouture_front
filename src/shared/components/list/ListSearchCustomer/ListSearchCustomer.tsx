//import styles from './list-search-customer.module.css';

import { APP_NAME } from "@features/core/constants";
import { useAuth, useWindow } from "@features/core/hook";
import { openModal } from "@features/core/slides";
import { ActionIcon, ScrollArea, Text } from "@mantine/core";
import { ButtonIcon } from "@shared/components/button";
import { TextField } from "@shared/components/field";
import { SearchSheet } from "@shared/components/layout";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as z from "zod"
import { ListItemSearchCustomer } from "../ListItemSearchCustomer/ListItemSearchCustomer";
import type { CustomerWorkshopRead, PaginatedCustomerWorkshopReadList } from "@shared/api";
import { CUSTOMER_WORKSHOP_SEARCH_MODAL } from "@shared/constants/modal_id";

export interface ListSearchCustomerProps {
  test?: boolean
}

export const ListSearchCustomer = ({ test }: ListSearchCustomerProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const { proxy, workshop } = useAuth()
  const { moreThan: { windowMobile } } = useWindow()
  const [queryName, setQueryName] = useState<string | undefined>(undefined)
  const handleOpenSearchCustomerWorkshop = () => dispatch(openModal({ id: CUSTOMER_WORKSHOP_SEARCH_MODAL }))

  const {
    data: customers,
    // isLoading: isLoadingCustomer,
    fetchNextPage: fetchnextCustomer,
    refetch: refrechCustomer,
    // isFetchingNextPage: isFechingNextCustomer,
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
            last_name: "cedric herve jean",
            first_name: "youan",
            nickname: "la boule",
            email: null,
            phone: "+2250777537954",
            genre: "MAN",
            is_active: true,
            photo: null,
            createdAt: "2025-05-16",
            updatedAt: "2025-07-18"

          } as CustomerWorkshopRead)
        }
      }

      if (workshop) {
        const response = await proxy.api.workshopCustomersWorkshopsList(
          {
            slug: workshop.slug,
            page: pageParam,
            name: queryName ? [queryName] : undefined,
          });
        return response.data
      }
      return {
        count: 0,
        next: undefined,
        previous: undefined,
        results: []
      } as PaginatedCustomerWorkshopReadList
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
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10
  })

  const form = useForm({
    validators: {
      onChange: z.object({
        name: z.string().min(4, "veuillez entrez au moins 4 caractères")
      })
    },
    defaultValues: {
      name: ''
    },
    onSubmit: async ({ value }) => {
      setQueryName(value.name)
      refrechCustomer()
    }
  })

  return (
    <>
      {windowMobile ? (
        <ActionIcon
          variant="subtle"
          size='xl'
          radius="lg"
          color="dimmed.2"
          onClick={handleOpenSearchCustomerWorkshop}
        >
          <IconSearch />
        </ActionIcon>
      ) : (
        <ButtonIcon
          onClick={handleOpenSearchCustomerWorkshop}
          sectionLeft={{
            icon: IconSearch,
          }}
          title="rechercher un client"
        />
      )}

      <SearchSheet
        id={CUSTOMER_WORKSHOP_SEARCH_MODAL}
        field={
          <TextField
            styles={{
              input: {
                border: "none",
                width: "100%"
              }
            }}
            form={form}
            name="name"
            isError
            rightSection={
              <ActionIcon
                variant="subtle"
                size="input-sm"
                radius="md"
                color='primary.2'
                onClick={form.handleSubmit}
              >
                <IconSearch />
              </ActionIcon>
            }
          />}
      >
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
              fetchnextCustomer()
            } 
          }}
        >
          {customers ? (
            customers.pages.map(customer => customer.results).flat().map((customer, index) => {
              return <ListItemSearchCustomer key={index} customer={customer} />
            })
          ) : (
            <Text>Aucun Client trouvé</Text>
          )}
        </ScrollArea.Autosize>

      </SearchSheet>
    </>
  );
};
ListSearchCustomer.id = CUSTOMER_WORKSHOP_SEARCH_MODAL