// import styles from './email-field.module.css';

import { useAuth } from "@features/core/hook";
import { TextField, type TextFieldProps } from "../TextField/TextField";
import { responseIsExists } from "@features/core/tools";

export interface EmailFieldProps extends TextFieldProps {
  isUnique?: boolean
  ignoreValue?: string
}

export const EmailField = ({
  form,
  name,
  isError = false,
  isUnique = true,
  ignoreValue,
  validators,
  ...props
}: EmailFieldProps) => {

  const {proxy} = useAuth()

  return (
    <TextField
      form={form}
      name={name}
      isError={isError}
      validators={{
        ...(isUnique ? {
          onBlurAsync: async ({ value }) => {
            const response = await proxy.api.userVerifyEmailCreate({ verify: value, ...(ignoreValue && { exclude: ignoreValue }) })
            const isExists = responseIsExists(response)
            return isExists ? { message: "l'email est deja utilisé" } : undefined
          }
        } : {}),
        ...validators
      }}
      type="email"
      {...props}
    />
  );
};
