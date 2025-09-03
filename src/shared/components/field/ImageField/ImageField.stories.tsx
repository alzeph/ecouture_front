// ImageField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from '@tanstack/react-form';
import { ImageField } from './ImageField';

const meta: Meta<typeof ImageField> = {
  title: 'shared/components/field/ImageField',
  component: ImageField,
};
export default meta;

type Story = StoryObj<typeof ImageField>;

export const Default: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { image: null },
    });

    return (
      <ImageField form={form} name="image" />
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { image: "https://placehold.co/300x200.png?text=Image+par+défau" },
    });
    return (
      <ImageField form={form} name="image" />
    );
  },
};
