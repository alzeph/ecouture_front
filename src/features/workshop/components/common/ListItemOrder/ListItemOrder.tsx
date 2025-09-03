//import styles from './list-item-order.module.css';

import { useDrawerManager } from "@features/core/hook";
import { Avatar, Badge, Group, Menu, Stack, Text, ThemeIcon } from "@mantine/core";
import type { OrderWorkshopRead } from "@shared/api";
import { ListItemSewing } from "@shared/components";
import { formatDateOrTime } from "@shared/utils";
import { IconCalendar, IconClock2, IconEdit, IconEye } from "@tabler/icons-react";
import { OrderDetail } from "../OrderDetail/OrderDetail";
import { OrderList } from "../OrderList/OrderList";
import { OrderWorshoForm } from "../../form";

export interface ListItemOrderProps {
  order: OrderWorkshopRead
}

export const ListItemOrder = ({ order }: ListItemOrderProps) => {
  const { openDrawer } = useDrawerManager()
  return (
    <ListItemSewing
      title={order.number}
      description={order.description || ""}
      content={
        <Stack mt='sm' w="100%">
          <Group wrap='nowrap'>
            <Avatar size={'xl'} radius='md' src={order.photo_of_clothing_model} />
            <Avatar size="xl" radius='md' src={order.photo_of_fabric} />
          </Group>
          <Group justify='space-between' wrap='nowrap'>
            <Group align='center' justify='space-between'>
              <Group gap={5} align='center' wrap='nowrap'>
                <ThemeIcon size='xs' variant='white' c="dimmed">
                  <IconClock2 />
                </ThemeIcon>
                <Text size='xs' c='dimmed'>{formatDateOrTime(order.createdAt, "time")}</Text>
              </Group>
              <Group gap={5} align='center' wrap='nowrap'>
                <ThemeIcon size='xs' variant='white' c="dimmed">
                  <IconCalendar />
                </ThemeIcon>
                <Text size='xs' c='dimmed'>{formatDateOrTime(order.createdAt, "date")}</Text>
              </Group>
            </Group>
            <Badge
              variant="light"
              color={order.status === 'CANCELLED' ? 'error.9' : order.status === 'COMPLETED' ? 'green' : order.status === 'IN_PROGRESS' ? 'warning' : 'info.9'}
              radius="lg">
              {order.status === 'CANCELLED' ? 'Annulee' : order.status === 'COMPLETED' ? 'Terminee' : order.status === 'IN_PROGRESS' ? 'En cours' : 'En attente'}</Badge>
          </Group>
        </Stack>
      }
      menu={{
        children: (
          <>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              onClick={() => openDrawer({
                id: OrderDetail.id,
                parentId: OrderList.id,
                data: { order }
              })}
              leftSection={
                <ThemeIcon variant="transparent" size="sm">
                  <IconEye />
                </ThemeIcon>
              }>voir plus</Menu.Item>
            <Menu.Item
              onClick={() => openDrawer({
                id: OrderWorshoForm.id,
                parentId: OrderList.id,
                data: { order }
              })}
              leftSection={
                <ThemeIcon variant="transparent" size="sm">
                  <IconEdit />
                </ThemeIcon>}
            >
              modifier</Menu.Item>
          </>
        )
      }}
    />
  );
};
