// import styles from './switch-field.module.css';
import { Switch, type SwitchProps } from '@mantine/core';
import { useField } from '@tanstack/react-form';
import { IconCheck, IconX } from '@tabler/icons-react';

export interface SwitchFieldProps extends Omit<SwitchProps, 'label'> {
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
  lableCheck?: string;
  lableUncheck?: string;
  description?: string;
}

export const SwitchField = ({
  form,
  name,
  isError = false,
  validators,
  lableCheck = "Activer",
  lableUncheck = "Desactiver",
  description,
  ...props
}: SwitchFieldProps) => {

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
    <Switch
      name={name}
      checked={field.state.value as boolean}
      onChange={(event) => field.handleChange(event.currentTarget.checked)}
      onBlur={field.handleBlur}
      color="teal"
      size="md"
      label={field.state.value ? lableCheck : lableUncheck}
      description={description}
      thumbIcon={
        field.state.value ? (
          <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
        ) : (
          <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
        )
      }
      error={errorMessage}
      {...props}
    />
  );
};
