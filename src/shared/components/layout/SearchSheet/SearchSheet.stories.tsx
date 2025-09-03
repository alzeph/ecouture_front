import type { Meta, StoryObj } from '@storybook/react';
import { SearchSheet } from './SearchSheet';
import { useForm } from '@tanstack/react-form';
import * as z from 'zod'
import { TextField } from '@shared/components/field';
import { ActionIcon, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { openModal } from '@features/core/slides';
import { useState } from 'react';

const meta: Meta<typeof SearchSheet> = {
  title: 'shared/components/layout/SearchSheet',
  component: SearchSheet,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchSheet>;

export const Default: Story = {
  render: () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const form = useForm({
      validators: {
        onChange: z.object({
          name: z.string().min(4, "veuillez entrez au moins 4 caractères")
        })
      },
      defaultValues: {
        name: ''
      },
      onSubmit: ({value}) => setName(value.name)
    })
    return (
      <>
        <Button onClick={() => dispatch(openModal({ id: 'test-search' }))}>ourvir</Button>
        <SearchSheet
          id='test-search'
          field={
            <TextField
              styles={{
                input: {
                  border: "none",
                  width: "100%"
                }
              }}
              form={form}
              name="name"
              isError
              rightSection={
                <ActionIcon
                  variant="subtle"
                  size="input-sm"
                  radius="md"
                  color='primary.2'
                  onClick={form.handleSubmit}
                >
                  <IconSearch />
                </ActionIcon>
              }
            />}
        >

          Value de la recherche : {name}

        </SearchSheet>
      </>
    )
  },
  args: {},
};
