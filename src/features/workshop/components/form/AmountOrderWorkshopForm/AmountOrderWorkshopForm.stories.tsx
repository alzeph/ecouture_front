import type { Meta, StoryObj } from '@storybook/react';
import { AmountOrderWorkshopForm } from './AmountOrderWorkshopForm';

const meta: Meta<typeof AmountOrderWorkshopForm> = {
  title: 'features/workshop/components/form/AmountOrderWorkshopForm',
  component: AmountOrderWorkshopForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AmountOrderWorkshopForm>;

export const Default: Story = {
  args: {},
};
