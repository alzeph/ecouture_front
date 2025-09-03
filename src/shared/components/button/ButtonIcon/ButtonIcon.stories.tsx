import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from './ButtonIcon';
import { IconSearch } from '@tabler/icons-react';

const meta: Meta<typeof ButtonIcon> = {
  title: 'shared/components/button/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    sectionLeft: {
      control: 'object',
    },
    sectionRight: {
      control: 'object',
    },
    onClick: {
      control: () => console.log("click"),
    },
    buttonProps: {
      control: 'object',
    },
    mode: {
      control: 'radio',
      options: ['default', 'filled'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    title: 'Effectuer une recherche',
    sectionLeft: {
      icon: IconSearch,
    },
  },
};

export const WithRightSection: Story = {
  args: {
    title: 'Effectuer une recherche',
    sectionLeft: {
      icon: IconSearch,
    },
    sectionRight: {
      icon: IconSearch
    },
  },
};

export const Filled: Story = {
  args: {
    title: 'Effectuer une recherche',
    sectionLeft: {
      icon: IconSearch,
    },
    mode: 'filled'
  },
};

export const FilledWithRightSection: Story = {
  args: {
    title: 'Effectuer une recherche',
    sectionLeft: {
      icon: IconSearch,
    },
    sectionRight: {
      icon: IconSearch,

    },
    mode: 'filled'
  },
}

export const WithDescriptionFilled: Story = {
  args: {
    title: 'Effectuer une recherche',
    description: 'Description de la recherche',
    sectionLeft: {
      icon: IconSearch,
    },
    mode: 'filled'
  },
}

export const WithDescriptionFilledWithRightSection: Story = {
  args: {
    title: 'Effectuer une recherche',
    description: 'Description de la recherche',
    sectionLeft: {
      icon: IconSearch,
    },
    sectionRight: {
      icon: IconSearch,
    },
    mode: 'filled'
  }
}
