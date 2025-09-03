import type { Meta, StoryObj } from '@storybook/react';
import { SelectField } from './SelectField';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Badge, Button, Group, Text } from '@mantine/core';

const meta: Meta<typeof SelectField> = {
  title: 'shared/components/field/SelectField',
  component: SelectField,
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { customer: '' },
      onSubmit: ({ value }) => setValue(value.customer),
    });

    return (
      <>
        <SelectField<{ first_name: string, last_name: string, id: number }>
          form={form}
          name="customer"
          render={(value) => ({ label: `${value.first_name} ${value.last_name}`, value: value.id, data: value })}
          data={[
            { id: 1, first_name: 'John', last_name: 'Doe' },
            { id: 2, first_name: 'david', last_name: 'koffi' },
            { id: 3, first_name: 'emmanuelle', last_name: 'zran' }]}

        />
        <Text>Selection : {value}</Text>
        <Button
          onClick={form.handleSubmit}
        >
          Valider
        </Button>
      </>
    );
  },
};


export const WithFixedValue: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { customer: '' },
      onSubmit: ({ value }) => setValue(value.customer),
    });

    return (
      <>
        <SelectField<{ first_name: string, last_name: string, id: number }>
          fixeValue={{ first_name: 'John', last_name: 'Doe', id: 1 }}
          form={form}
          name="customer"
          render={(value) => ({ label: `${value.first_name} ${value.last_name}`, value: value.id, data: value })}
          data={[
            { id: 1, first_name: 'John', last_name: 'Doe' },
            { id: 2, first_name: 'david', last_name: 'koffi' },
            { id: 3, first_name: 'emmanuelle', last_name: 'zran' }]}

        />
        <Text>Selection : {value}</Text>
        <Button
          onClick={form.handleSubmit}
        >
          Valider
        </Button>
      </>
    );
  },
};


export const WithInfiniteScroll: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [data, setData] = useState([
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'David', last_name: 'Koffi' },
      { id: 3, first_name: 'Emmanuelle', last_name: 'Zran' },
      { id: 4, first_name: 'Paul', last_name: 'Koffi' },
      { id: 5, first_name: 'Claire', last_name: 'pathci' },
      { id: 6, first_name: 'Julie', last_name: 'Ameka' },
      { id: 7, first_name: 'Cedric', last_name: 'Herve' },
      { id: 8, first_name: 'John', last_name: 'Doe' },
      { id: 9, first_name: 'David', last_name: 'Koffi' },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
      defaultValues: { customer: '' },
      onSubmit: ({ value }) => setValue(value.customer),
    });

    const fetchMore = async () => {
      setIsLoading(true);
      // Simule un fetch avec délai
      await new Promise((r) => setTimeout(r, 3000));
      const nextId = data.length + 1;
      setData((prev) => [
        ...prev,
        { id: nextId, first_name: `New`, last_name: `User ${nextId}` },
      ]);
      setIsLoading(false);
    };

    return (
      <>
        <SelectField<{ first_name: string; last_name: string; id: number }>
          form={form}
          name="customer"
          render={(value) => ({ label: `${value.first_name} ${value.last_name}`, value: value.id, data: value })}
          data={data}
          query={{ infiniteScroll: true, queryFn: fetchMore, isLoading }}
          inputProps={{ label: "client" }}
        />
        <Text>Selection : {value}</Text>
        <Button onClick={form.handleSubmit}>Valider</Button>
      </>
    );
  },
};

export const withOptionRender: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const form = useForm({
      defaultValues: { customer: '' },
      onSubmit: ({ value }) => setValue(value.customer),
    });

    return (
      <>
        <SelectField<{ first_name: string, last_name: string, id: number }>
          form={form}
          name="customer"
          render={(value) => ({ label: `${value.first_name} ${value.last_name}`, value: value.id, data: value })}
          data={[
            { id: 1, first_name: 'John', last_name: 'Doe' },
            { id: 2, first_name: 'david', last_name: 'koffi' },
            { id: 3, first_name: 'emmanuelle', last_name: 'zran' }]}
          optionRender={(value) => <Group justify='space-between'><Text>{value.first_name} {value.last_name}</Text> <Badge>{value.id}</Badge></Group>}

        />
        <Text>Selection : {value}</Text>
        <Button
          onClick={form.handleSubmit}
        >
          Valider
        </Button>
      </>
    );
  },
};
