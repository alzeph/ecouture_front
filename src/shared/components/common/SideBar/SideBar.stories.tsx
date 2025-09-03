import type { Meta, StoryObj } from '@storybook/react';
import { SideBar } from './SideBar';

const meta: Meta<typeof SideBar> = {
  title: 'shared/components/common/SideBar',
  component: SideBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {},
};
