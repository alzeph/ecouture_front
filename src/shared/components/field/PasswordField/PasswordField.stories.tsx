import type { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from './PasswordField';
import { Button, Text } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod'

const meta: Meta<typeof PasswordField> = {
  title: 'shared/components/field/PasswordField',
  component: PasswordField,
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
  render: () => {
      const [value, setValue] = useState('')
      const schema = z.object({ nom: z.string().min(3, "Le nom doit avoir au moins 3 caractères") });
      const form = useForm({
        validators: { onChange: schema },
        defaultValues: { nom: 'cedric herve' },
        onSubmit: ({ value }) => setValue(value.nom),
      });
  
      return (
        <>
          <PasswordField
            validators={{
              onChange: (state) => (state.value.length <= 6 ? { message: "Le nom doit avoir au moins 6 caractères" } : undefined),
            }}
            isError={true} form={form} name="nom" placeholder="Votre nom" />
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
