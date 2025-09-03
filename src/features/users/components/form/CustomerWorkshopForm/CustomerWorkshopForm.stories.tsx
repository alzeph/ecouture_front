import type { Meta, StoryObj } from '@storybook/react';
import { CustomerWorkshopForm } from './CustomerWorkshopForm';
import { useDrawerManager } from '@features/core/hook';
import { Button } from '@mantine/core';

const meta: Meta<typeof CustomerWorkshopForm> = {
  title: 'features/users/components/form/CustomerWorkshopForm',
  component: CustomerWorkshopForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomerWorkshopForm>;

export const Default: Story = {
  render: () => {
    const { openDrawer } = useDrawerManager()
    return (
      <>
        <Button onClick={() => openDrawer({ id: CustomerWorkshopForm.id })}>connecter</Button>
        <CustomerWorkshopForm />
      </>
    )
  },
  args: {},
};
