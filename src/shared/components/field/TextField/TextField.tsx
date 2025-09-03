import { TextInput, type TextInputProps } from "@mantine/core";
import { useField } from '@tanstack/react-form';
import { useMemo } from "react";

export interface TextFieldProps extends Omit<TextInputProps, 'onChange'> {
  form: any;
  name: string;
  isError?: boolean;
  validators?: {
    onChange?: (state: any) => { message: string | number | boolean } | undefined;
    onBlur?: (state: any) => { message: string | number | boolean } | undefined;
    onChangeAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
    onBlurAsync?: (state: any) => Promise<{ message: string | number | boolean } | undefined>;
  };
  onValueTraited?: (value: any) => any
}

export const TextField = ({
  form,
  name,
  isError = false,
  validators,
  onValueTraited,
  error,
  ...props
}:
  TextFieldProps) => {

  const field = useField({
    form,
    name,
    validators: validators,
  });

  // Récupération de la première erreur si elle existe
  const errorMessage = useMemo(() => {
    const _error = isError && field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? (field.state.meta.errors[0] as unknown as { message: string }).message
      : undefined
    return _error || error 
  },[field.state.meta.isTouched, field.state.meta.errors, error]);

  const handleChange = (value: string) => {
    const transformedValue = onValueTraited ? onValueTraited(value) : value;
    field.handleChange(transformedValue);
  }

  
  return (
    <TextInput
      name={name}
      value={field.state.value as string}
      onChange={(e) => handleChange(e.currentTarget.value)}
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
