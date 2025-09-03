import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { Button } from '@mantine/core';
import { useDrawerManager } from '@features/core/hook';

const meta: Meta<typeof LoginForm> = {
  title: 'features/users/components/form/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: () => {
    const { openDrawer } = useDrawerManager()
    return (
      <>
        <Button onClick={() => openDrawer({ id: LoginForm.id })}>connecter</Button>
        <LoginForm />
      </>
    )
  },
  args: {},
};
