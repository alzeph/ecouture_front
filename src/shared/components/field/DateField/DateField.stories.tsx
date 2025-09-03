import type { Meta, StoryObj } from '@storybook/react';
import { DateField } from './DateField';
import { Button, Text } from '@mantine/core';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

const meta: Meta<typeof DateField> = {
  title: 'shared/components/field/DateField',
  component: DateField,
};

export default meta;
type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { nom: '12-31-2020' },
      onSubmit: ({ value }) => setValue(value.nom),
    });

    return (
      <>
        <DateField
          form={form} name="nom" placeholder="Votre nom" />
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
