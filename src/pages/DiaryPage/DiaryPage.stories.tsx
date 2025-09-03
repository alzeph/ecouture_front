import type { Meta, StoryObj } from '@storybook/react';
import { DiaryPage } from './DiaryPage';

const meta: Meta<typeof DiaryPage> = {
  title: 'pages/DiaryPage',
  component: DiaryPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DiaryPage>;

export const Default: Story = {
  render: ()=> {
    return (
      <div style={{height: '90vh'}}>
      <DiaryPage />
      </div>
    )
  },
  args: {},
};
