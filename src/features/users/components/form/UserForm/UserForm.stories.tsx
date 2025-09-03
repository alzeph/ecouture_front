import type { Meta, StoryObj } from '@storybook/react';
import { UserForm } from './UserForm';
import { useDrawerManager } from '@features/core/hook';
import { Button } from '@mantine/core';

const meta: Meta<typeof UserForm> = {
  title: 'features/users/components/form/UserForm',
  component: UserForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserForm>;

export const Default: Story = {
  render: () => {
      const { openDrawer } = useDrawerManager()
      return (
        <>
          <Button onClick={() => openDrawer({ id: UserForm.id })}>connecter</Button>
          <UserForm />
        </>
      )
    },
  args: {},
};
