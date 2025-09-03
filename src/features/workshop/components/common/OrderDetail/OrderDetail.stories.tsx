import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetail } from './OrderDetail';

const meta: Meta<typeof OrderDetail> = {
  title: 'features/workshop/components/common/OrderDetail',
  component: OrderDetail,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderDetail>;

export const Default: Story = {
  args: {},
};
