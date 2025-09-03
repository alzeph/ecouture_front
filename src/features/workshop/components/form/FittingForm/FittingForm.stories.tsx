import type { Meta, StoryObj } from '@storybook/react';
import { FittingForm } from './FittingForm';

const meta: Meta<typeof FittingForm> = {
  title: 'features/workshop/components/form/FittingForm',
  component: FittingForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FittingForm>;

export const Default: Story = {
  args: {},
};
