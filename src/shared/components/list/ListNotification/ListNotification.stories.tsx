import type { Meta, StoryObj } from '@storybook/react';
import { ListNotification } from './ListNotification';

const meta: Meta<typeof ListNotification> = {
  title: 'shared/components/list/ListNotification',
  component: ListNotification,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListNotification>;

export const Default: Story = {
  args: {test:true},
};
