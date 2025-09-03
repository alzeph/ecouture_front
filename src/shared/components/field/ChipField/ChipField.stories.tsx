import type { Meta, StoryObj } from '@storybook/react';
import { ChipField } from './ChipField';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Button, Text } from '@mantine/core';

const meta: Meta<typeof ChipField> = {
  title: 'shared/components/field/ChipField',
  component: ChipField,
};

export default meta;
type Story = StoryObj<typeof ChipField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { genre: '' },
      onSubmit: ({ value }) => setValue(value.genre),
    });

    return (
      <>
        <ChipField
          data={[
            { label: "homme", value: "homme" },
            { label: "femme", value: "femme" }
          ]}
          form={form}
          name="genre" />
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
