import type { Meta, StoryObj } from '@storybook/react';
import { OrderWorshoForm } from './OrderWorshoForm';
import { useDrawerManager } from '@features/core/hook';
import { Button } from '@mantine/core';

const meta: Meta<typeof OrderWorshoForm> = {
  title: 'features/workshop/components/form/OrderWorshoForm',
  component: OrderWorshoForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderWorshoForm>;

export const Default: Story = {
    render: () => {
        const { openDrawer } = useDrawerManager()
        return (
          <>
            <Button onClick={() => openDrawer({ id: OrderWorshoForm.id  })}>connecter</Button>
            <OrderWorshoForm/>
           
          </>
        )
      },
  args: {},
};
