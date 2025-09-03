import type { Meta, StoryObj } from '@storybook/react';
import { ListItemSearchCustomer } from './ListItemSearchCustomer';

const meta: Meta<typeof ListItemSearchCustomer> = {
  title: 'shared/components/list/ListItemSearchCustomer',
  component: ListItemSearchCustomer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListItemSearchCustomer>;

export const Default: Story = {
  args: {
    customer: {
      id: 1,
      last_name: "cedric herve",
      first_name: "Youan",
      nickname: "La boule",
      genre: "MAN",
      email: "hervecedricyouan@gmail.com",
      phone: "0777537954",
      is_active: true,
      createdAt: "2025-12-6",
      updatedAt: "2025-12-6",
      photo: null
    }
  },
};
