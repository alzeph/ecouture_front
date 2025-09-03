import type { Meta, StoryObj } from '@storybook/react';
import { ListItemSewing } from './ListItemSewing';
import { AvatarSewing } from '@shared/components';
import { Menu } from '@mantine/core';

const meta: Meta<typeof ListItemSewing> = {
  title: 'shared/components/list/ListItemSewing',
  component: ListItemSewing,
  tags: ['autodocs'],
  argTypes: {
    leftSection: {
      control: 'object',
    },
    rightSection: {
      control: 'object',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    content: {
      control: 'object',
    },
    titleProps: {
      control: 'object',
    },
    descriptionProps: {
      control: 'object',
    },
    menu: {
      control: 'object',
    }
  },

};

export default meta;
type Story = StoryObj<typeof ListItemSewing>;

export const Default: Story = {
  args: {
    title: 'Titre de la liste',
    description: 'Description de la liste',
  },
};

export const WithContent: Story = {
  args: {
    title: 'Titre de la liste',
    description: 'Description de la liste',
    content: <p>Contenu de la liste</p>,
  },
};

export const WithAllActions: Story = {
  args: {
    leftSection: <AvatarSewing name="John Doe" username="johndoe" />,
    title: 'Titre de la liste',
    description: 'Description de la liste',
    rightSection: <p>Section droite</p>,
    content: "lorem ipsum dolor sit amet consectetur adipiscing elit quisque sdnkfrcdz rfjsndjbf dsfnzjds f",
    menu: {
      children: (
        <>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Item>Modifier</Menu.Item>
          <Menu.Item>Supprimer</Menu.Item>
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red">Supprimer définitivement</Menu.Item>

        </>
      )
    }
  },
};


export const WithLeftSectionSkeleton: Story = {
  args: {
    skeleton: true
  },
};