import type { Meta, StoryObj } from '@storybook/react';
import { ListSewing } from './ListSewing';
import { AvatarSewing, ListItemSewing } from '@shared/components';

const meta: Meta<typeof ListSewing> = {
  title: 'shared/components/list/ListSewing',
  component: ListSewing,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListSewing>;

export const Default: Story = {
  args: {
    children : Array.from({ length: 100 }, (_, i) => {
      const base = [
        {
          title: 'Item 1',
          description: 'Description 1',
          content: "lorem ipsum dolor sit amet consectetur adipiscing elit quisque sdnkfrcdz rfjsndjbf dsfnzjds f",
          leftSection: <AvatarSewing name="John Doe" username="johndoe" />,
        },
        {
          title: 'Item 2',
          description: 'Description 2',
          leftSection: <AvatarSewing name="John Doe" username="johndoe" />,
        },
        {
          title: 'Item 3',
          description: 'Description 3',
          leftSection: <AvatarSewing name="John Doe" username="johndoe" />,
        }
      ];
      const item = base[i % base.length];
      return {
        ...item,
        title: `Item ${i + 1}`,
        description: `Description ${i + 1}`,
      };
    }).map((item, i) => (
      <ListItemSewing {...item} key={i} />
    ))
  }

};



