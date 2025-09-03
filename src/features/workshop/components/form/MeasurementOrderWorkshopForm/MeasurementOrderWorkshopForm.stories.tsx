import type { Meta, StoryObj } from '@storybook/react';
import { MeasurementOrderWorkshopForm } from './MeasurementOrderWorkshopForm';

const meta: Meta<typeof MeasurementOrderWorkshopForm> = {
  title: 'features/workshop/components/form/MeasurementOrderWorkshopForm',
  component: MeasurementOrderWorkshopForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MeasurementOrderWorkshopForm>;

export const Default: Story = {
  args: {},
};
