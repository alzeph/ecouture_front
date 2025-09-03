// import styles from './date-field.module.css';
import { useField } from '@tanstack/react-form';
import { DateInput, type DateInputProps } from '@mantine/dates';

export interface DateFieldProps extends DateInputProps {
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
}

export const DateField = ({
  form,
  name,
  isError = false,
  validators,
  ...props
}: DateFieldProps) => {

  const field = useField({
    form,
    name,
    validators: validators,
  });

  // Récupération de la première erreur si elle existe
  const errorMessage =
    isError && field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? (field.state.meta.errors[0] as unknown as { message: string }).message
      : undefined;

  return (
    <DateInput
      name={name}
      valueFormat="DD/MM/YYYY"
      value={field.state.value && field.state.value != '' ? field.state.value as string : undefined}
      onChange={(value) => field.handleChange(value)}
      onBlur={field.handleBlur}
      error={errorMessage}
      errorProps={{ ms: "lg" }}
      placeholder={name}
      radius="md"
      size="md"
      {...props}
    />
  );
};
