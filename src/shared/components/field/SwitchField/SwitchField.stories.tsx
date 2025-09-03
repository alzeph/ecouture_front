import type { Meta, StoryObj } from '@storybook/react';
import { SwitchField } from './SwitchField';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Button, Text } from '@mantine/core';
import * as z from 'zod';

const meta: Meta<typeof SwitchField> = {
  title: 'shared/components/field/SwitchField',
  component: SwitchField,
};

export default meta;
type Story = StoryObj<typeof SwitchField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { is_active: true },
      onSubmit: ({ value }) => setValue(value.is_active ? "activer" : "desactiver"),
    });

    return (
      <>
        <SwitchField form={form} name="is_active" />
        <Text>Switch : {value}</Text>
        <Button
          onClick={form.handleSubmit}
        >
          Valider
        </Button>
      </>
    );
  }
};


export const WithErrorValidation: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const schema = z.object({
      is_active: z.boolean().refine(val => val === true, {
        message: "is_active doit être true",
      }),
    });
    const form = useForm({
      validators: { onChange: schema },
      defaultValues: { is_active: false },
      onSubmit: ({ value }) => setValue(value.is_active ? "activer" : "desactiver"),
    });

    return (
      <>
        <SwitchField isError form={form} name="is_active" />
        <Text>Switch : {value}</Text>
        <Button
          onClick={form.handleSubmit}
        >
          Valider
        </Button>
      </>
    );
  }
};

