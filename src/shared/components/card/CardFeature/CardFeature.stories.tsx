import type { Meta, StoryObj } from '@storybook/react';
import { CardFeature } from './CardFeature';
import { IconSearch } from '@tabler/icons-react';

const meta: Meta<typeof CardFeature> = {
  title: 'shared/components/card/CardFeature',
  component: CardFeature,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'object',
    },
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
   
  }
};

export default meta;
type Story = StoryObj<typeof CardFeature>;

export const Default: Story = {
  args: {
    icon: {
      Icon: IconSearch,
      position: "center",
    },
    title : "Title",
    content : "lorem ipsum dolor sit amet consectetum adipiscing elit quisque sdnkfrcdz rfjsndjbf dsfnzjds f",
    contentStyle: {
      
    }

  },
};
