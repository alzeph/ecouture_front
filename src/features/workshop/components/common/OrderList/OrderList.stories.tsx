import type { Meta, StoryObj } from '@storybook/react';
import { OrderList } from './OrderList';
import { useAuth, useDrawerManager } from '@features/core/hook';
import { Button } from '@mantine/core';
import type { WorkerRead } from '@shared/api';
import { OrderWorshoForm } from '../../form';
import { OrderDetail } from '../OrderDetail/OrderDetail';

const meta: Meta<typeof OrderList> = {
  title: 'features/workshop/components/common/OrderList',
  component: OrderList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderList>;

export const Default: Story = {
  render: () => {
    const { openDrawer } = useDrawerManager()
    const { worker } = useAuth()
    return (
      <>
        <Button onClick={() => openDrawer({ id: OrderList.id, data: { filteredOrders: { worker: worker as unknown as WorkerRead } } })} >ouvrir</Button>
        <OrderList />
        <OrderWorshoForm/>
        <OrderDetail/>
      </>
    )
  },
  args: {},
};
