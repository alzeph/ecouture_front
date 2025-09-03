import type { Meta, StoryObj } from '@storybook/react';
import { ArticleHaberdasheryForm } from './ArticleHaberdasheryForm';

const meta: Meta<typeof ArticleHaberdasheryForm> = {
  title: 'features/haberdashery/components/form/ArticleHaberdasheryForm',
  component: ArticleHaberdasheryForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleHaberdasheryForm>;

export const Default: Story = {
  args: {},
};
