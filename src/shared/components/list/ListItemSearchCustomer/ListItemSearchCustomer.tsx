//import styles from './list-item-search-customer.module.css';

import { CUSTOMER_WORKSHOP_DETAIL_ORDER_MODAL, CUSTOMER_WORKSHOP_FORM_MODAL, CUSTOMER_WORKSHOP_SEARCH_MODAL, ORDER_WORKSHOP_FORM_MODAL } from "@shared/constants";
import { closeModal, openModal } from "@features/core/slides";
import type { CustomerWorkshopRead } from "@shared/api";
import { useDispatch } from "react-redux";
import { ListItemSewing } from "../ListItemSewing/ListItemSewing";
import { Avatar, Group, Menu, Text } from "@mantine/core";
import {IconPhoneCall } from "@tabler/icons-react";

export interface ListItemSearchCustomerProps {
  customer: CustomerWorkshopRead,
  skeleton?: boolean,
  separator?: boolean
}

export const ListItemSearchCustomer = ({
  customer,
  skeleton,
  separator
}: ListItemSearchCustomerProps) => {
  const dispatch = useDispatch()

  const handleCloseSearchCustomerModal = () => dispatch(closeModal(CUSTOMER_WORKSHOP_SEARCH_MODAL))
  const handleOpenOrderDetail = () => dispatch(openModal({ id: CUSTOMER_WORKSHOP_DETAIL_ORDER_MODAL, data: { customer } }))
  const handleOpenOrderForm = () => dispatch(openModal({ id: ORDER_WORKSHOP_FORM_MODAL, data: { fixedCustomer: customer } }))
  const handleOpenCustomerForm = () => dispatch(openModal({ id: CUSTOMER_WORKSHOP_FORM_MODAL, data: { customer } }))


  return (
    <div {...(separator && { style: { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' } })}>
      <ListItemSewing
        skeleton={skeleton}
        title={`${customer.last_name} ${customer.first_name}`}
        description={customer.nickname}
        leftSection={
          <Avatar src={customer.photo} name={`${customer.last_name} ${customer.first_name}`} />
        }
        content={
          <Group gap={3} pt={5}>
            <Group gap={5} wrap="nowrap">
              <IconPhoneCall size={15} />
              <Text
                href={`tel:${customer.phone}`}
                component="a"
                size="xs">{customer.phone}</Text></Group>
          </Group>
        }
        menu={{
          onClick: handleCloseSearchCustomerModal,
          children: (
            <>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item onClick={handleOpenCustomerForm}>profil</Menu.Item>
              <Menu.Label>Commande</Menu.Label>
              <Menu.Item onClick={handleOpenOrderForm}>ajouter</Menu.Item>
              <Menu.Item onClick={handleOpenOrderDetail}>liste</Menu.Item>
            </>
          )
        }}
      />
    </div>
  );
};
