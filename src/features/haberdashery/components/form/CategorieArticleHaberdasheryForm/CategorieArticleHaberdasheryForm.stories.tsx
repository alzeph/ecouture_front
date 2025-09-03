import type { Meta, StoryObj } from '@storybook/react';
import { CategorieArticleHaberdasheryForm } from './CategorieArticleHaberdasheryForm';

const meta: Meta<typeof CategorieArticleHaberdasheryForm> = {
  title: 'features/haberdashery/components/form/CategorieArticleHaberdasheryForm',
  component: CategorieArticleHaberdasheryForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategorieArticleHaberdasheryForm>;

export const Default: Story = {
  args: {},
};
