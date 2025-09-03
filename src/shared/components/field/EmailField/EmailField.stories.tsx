import type { Meta, StoryObj } from '@storybook/react';
import { EmailField } from './EmailField';
import { Button, Text } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

const meta: Meta<typeof EmailField> = {
  title: 'shared/components/field/EmailField',
  component: EmailField,
};

export default meta;
type Story = StoryObj<typeof EmailField>;

export const Default: Story = {
  render: () => {
      const [value, setValue] = useState('')
      const form = useForm({
        defaultValues: { email: '' },
        onSubmit: ({ value }) => setValue(value.email),
      });
  
      return (
        <>
          <EmailField
            isError={true} form={form} name="email" placeholder="Votre nom" />
          <Text>Nom : {value}</Text>
          <Button
            onClick={form.handleSubmit}
          >
            Valider
          </Button>
        </>
      );
    },
};
