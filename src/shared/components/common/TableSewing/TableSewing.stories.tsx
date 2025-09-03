import type { Meta, StoryObj } from '@storybook/react';
import { TableSewing } from './TableSewing';

const meta: Meta<typeof TableSewing> = {
  title: 'shared/components/common/TableSewing',
  component: TableSewing,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableSewing>;

export const Default: Story = {
  args: {},
};
