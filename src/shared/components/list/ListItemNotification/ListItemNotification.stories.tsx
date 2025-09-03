import type { Meta, StoryObj } from '@storybook/react';
import { ListItemNotification } from './ListItemNotification';

const meta: Meta<typeof ListItemNotification> = {
  title: 'shared/components/list/ListItemNotification',
  component: ListItemNotification,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListItemNotification>;

export const Default: Story = {
  args: {
    test:true,
    notification: {
      id: 1,
      title: "Créatino d'atelier",
      message: "votre boutique a ete crée avec success",
      category: "WORKER_CREATION",
      type: 'success',
      createdAt: '2023-05-19'
    }
  },
};
