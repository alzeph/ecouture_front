import type { Meta, StoryObj } from '@storybook/react';
import { CardPricing } from './CardPricing';

const meta: Meta<typeof CardPricing> = {
  title: 'shared/components/card/CardPricing',
  component: CardPricing,
};

export default meta;
type Story = StoryObj<typeof CardPricing>;

export const Default: Story = {
  args: {
    title : 'Pro',
    price : '20 000',
    features : ["boss", "flex", "serein"],
    isPopular: true,
  },
};
