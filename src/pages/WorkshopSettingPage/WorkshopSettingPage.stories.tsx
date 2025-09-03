import type { Meta, StoryObj } from '@storybook/react';
import { WorkshopSettingPage } from './WorkshopSettingPage';

const meta: Meta<typeof WorkshopSettingPage> = {
  title: 'pages/WorkshopSettingPage',
  component: WorkshopSettingPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkshopSettingPage>;

export const Default: Story = {
  args: {},
};
