import { useAuth } from '@features/core/hook';
import { TextField, type TextFieldProps } from '../TextField/TextField';
import { responseIsExists } from '@features/core/tools';
// import styles from './phone-field.module.css';

export interface PhoneFieldProps extends TextFieldProps {
  isUnique?: boolean,
  ignoreValue?: string
}

export const PhoneField = ({
  form,
  name,
  isError = false,
  isUnique = true,
  ignoreValue,
  validators,
  onValueTraited,
  ...props
}: PhoneFieldProps) => {

  const {proxy} = useAuth()

  return (
    <TextField
      form={form}
      name={name}
      isError={isError || isUnique}
      validators={{
        ...(isUnique ? {
          onBlurAsync: async ({ value }) => {
            const response = await proxy.api.apiUserVerifyPhoneCreate({ verify: value, ...(ignoreValue && { exclude: ignoreValue }) })
            const isExists = responseIsExists(response)
            console.log(isExists)
            return isExists ? { message: "numero est deja utilisé" } : undefined
          }
        } : {}),
        ...validators
      }}
      type="phone"
      onValueTraited={onValueTraited}
      {...props}
    />
  );
};
