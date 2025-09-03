import type { Meta, StoryObj } from '@storybook/react';
import { WorkshopCreateForm } from './WorkshopCreateForm';
import { LoginForm } from '@features/users/components/form';
import { Button } from '@mantine/core';
import { useDrawerManager } from '@features/core/hook';

const meta: Meta<typeof WorkshopCreateForm> = {
  title: 'features/workshop/components/form/WorkshopCreateForm',
  component: WorkshopCreateForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkshopCreateForm>;

export const Default: Story = {
  render: () => {
      const { openDrawer } = useDrawerManager()
      return (
        <>
          <Button onClick={() => openDrawer({ id: WorkshopCreateForm.id  })}>connecter</Button>
          <WorkshopCreateForm/>
          <LoginForm />
        </>
      )
    },
  args: {},
};
