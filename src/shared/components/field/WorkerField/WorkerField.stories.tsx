import type { Meta, StoryObj } from '@storybook/react';
import { WorkerField } from './WorkerField';

const meta: Meta<typeof WorkerField> = {
  title: 'shared/components/field/WorkerField',
  component: WorkerField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkerField>;

export const Default: Story = {
  args: {},
};
