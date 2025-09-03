import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaField } from './TextAreaField';
import { Button, Text } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import *  as z from 'zod'

const meta: Meta<typeof TextAreaField> = {
  title: 'shared/components/field/TextAreaField',
  component: TextAreaField,
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

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
          <TextAreaField
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
