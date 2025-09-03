import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { useForm } from '@tanstack/react-form';
import { Button, Text } from '@mantine/core';
import { useState } from 'react';
import * as z from 'zod';

const meta: Meta<typeof TextField> = {
  title: 'shared/components/field/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

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
        <TextField
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
