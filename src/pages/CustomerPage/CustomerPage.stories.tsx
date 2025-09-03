import type { Meta, StoryObj } from '@storybook/react';
import { CustomerPage } from './CustomerPage';

const meta: Meta<typeof CustomerPage> = {
  title: 'pages/CustomerPage',
  component: CustomerPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomerPage>;

export const Default: Story = {
  args: {},
};
