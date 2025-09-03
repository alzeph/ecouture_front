import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'shared/components/layout/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  args: {
    test: true
  },
};
