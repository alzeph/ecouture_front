// import styles from './text-area-field.module.css';
import { Textarea, type TextareaProps } from '@mantine/core';
import { useField } from '@tanstack/react-form';

export interface TextAreaFieldProps extends TextareaProps {
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

export const TextAreaField = ({
  form,
  name,
  isError = false,
  validators,
  ...props
}: TextAreaFieldProps) => {

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
    <Textarea
      name={name}
      value={field.state.value as string}
      onChange={(e) => field.handleChange(e.currentTarget.value)}
      onBlur={field.handleBlur}
      error={errorMessage}
      errorProps={{ ms: "lg" }}
      placeholder={name}
      radius="md"
      size="md"
      rows={5}
      {...props}
    />
  );
};
