import type { Meta, StoryObj } from '@storybook/react';
import { DeliveryOrderWorkshopForm } from './DeliveryOrderWorkshopForm';

const meta: Meta<typeof DeliveryOrderWorkshopForm> = {
  title: 'features/workshop/components/form/DeliveryOrderWorkshopForm',
  component: DeliveryOrderWorkshopForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeliveryOrderWorkshopForm>;

export const Default: Story = {
  args: {},
};
