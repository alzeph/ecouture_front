import type { Meta, StoryObj } from '@storybook/react';
import { ListSearchCustomer } from './ListSearchCustomer';

const meta: Meta<typeof ListSearchCustomer> = {
  title: 'shared/components/list/ListSearchCustomer',
  component: ListSearchCustomer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListSearchCustomer>;

export const Default: Story = {
  args: {test:true},
};
