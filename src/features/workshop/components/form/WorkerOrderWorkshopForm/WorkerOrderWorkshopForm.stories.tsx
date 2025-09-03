import type { Meta, StoryObj } from '@storybook/react';
import { WorkerOrderWorkshopForm } from './WorkerOrderWorkshopForm';

const meta: Meta<typeof WorkerOrderWorkshopForm> = {
  title: 'features/workshop/components/form/WorkerOrderWorkshopForm',
  component: WorkerOrderWorkshopForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerOrderWorkshopForm>;

export const Default: Story = {
  args: {},
};
