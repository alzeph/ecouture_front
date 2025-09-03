import { Chip, Group, Text, type ChipGroupProps, type ChipProps, type GroupProps } from '@mantine/core';
import { useField } from '@tanstack/react-form';
// import styles from './chip-field.module.css';

export interface ChipFieldProps extends Omit<ChipProps, "children" | "onChange"> {
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
  chipGroupProps?: ChipGroupProps
  groupProps?: GroupProps
  onChange?: (value: any) => void;
  data: { label: React.ReactNode, value: string }[]
  label?: React.ReactNode
}

export const ChipField = ({
  form,
  name,
  isError = false,
  validators,
  chipGroupProps,
  groupProps,
  onChange,
  data,
  label = "Fiate un choix",
  ...props
}: ChipFieldProps) => {

  const field = useField({
    form,
    name,
    validators: validators,
  });

  const errorMessage =
    isError && field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? (field.state.meta.errors[0] as unknown as { message: string }).message
      : undefined;

  return (
    <Chip.Group
      {...chipGroupProps}
      value={field.state.value as any}
      onChange={(value) => {
        onChange && onChange(value)
        field.handleChange(typeof value === 'string' ? value : value[0])
      }}
    >
      {typeof label === "string" ? <Text>{label}</Text> : label}
      <Group mt="sm" {...groupProps}>
        {data.map(({ label, value }) => (
          <Chip {...props} onBlur={field.handleBlur} key={value} name={name} variant="light" value={value}>
            {label}
          </Chip>
        ))}
      </Group>
      {errorMessage && <Text size='sm' c="error.9">{errorMessage}</Text>}
    </Chip.Group>
  );
};
