import type { Meta, StoryObj } from '@storybook/react';
import { AvatarSewing } from './AvatarSewing';
import { string } from 'zod';
// import blank_profil from '@assets/img/blank_profil.png';

const meta: Meta<typeof AvatarSewing> = {
  title: 'shared/components/common/AvatarSewing',
  component: AvatarSewing,
  tags: ['autodocs'],
  argTypes: {
    name: string,
    username: string,
    photo: string
  },
};

export default meta;
type Story = StoryObj<typeof AvatarSewing>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
  },
};

// export const WithPhoto: Story = {
//   args: {
//     name: 'John Doe',
//     username: 'johndoe',
//     photo: blank_profil,
//   },
// };

export const WithLongName: Story = {
  args: {
    name: 'Avrell',
    username: 'Cassandra',
  },
};
