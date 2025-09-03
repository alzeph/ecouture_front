import type { Meta, StoryObj } from '@storybook/react';
import { HaberdasheryPage } from './HaberdasheryPage';

const meta: Meta<typeof HaberdasheryPage> = {
  title: 'pages/HaberdasheryPage',
  component: HaberdasheryPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HaberdasheryPage>;

export const Default: Story = {
  args: {},
};
