import type { Meta, StoryObj } from '@storybook/react';
import { WorkerPage } from './WorkerPage';

const meta: Meta<typeof WorkerPage> = {
  title: 'pages/WorkerPage',
  component: WorkerPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerPage>;

export const Default: Story = {
  args: {},
};
