import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { IconSearch } from '@tabler/icons-react';

const meta: Meta<typeof StatCard> = {
  title: 'shared/components/card/StatCard',
  component: StatCard,
  tags: ['autodocs'],

};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    titleHover: 'Hover',
    title: 'Title',
    subtitle: 'Subtitle',
  },
};

export const WithIcon: Story = {

  render: (args) => <div style={{padding: '1rem'}}><StatCard {...args} /></div>,

  args: {
    titleHover: 'Hover',
    title: '150k ',
    subtitle: 'Subtitle',
    color: 'blue',
    icon: { icon: IconSearch },
  },
}

export const WithIconToBlack: Story = {

  render: (args) => <div style={{padding: '1rem'}}><StatCard {...args} /></div>,

  args: {
    titleHover: 'Hover',
    title: '150k ',
    subtitle: 'Subtitle',
    color: 'black',
    icon: { icon: IconSearch },
  },
}