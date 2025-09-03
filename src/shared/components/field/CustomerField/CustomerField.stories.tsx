import type { Meta, StoryObj } from '@storybook/react';
import { CustomerField } from './CustomerField';

const meta: Meta<typeof CustomerField> = {
  title: 'shared/components/field/CustomerField',
  component: CustomerField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomerField>;

export const Default: Story = {
  args: {},
};
