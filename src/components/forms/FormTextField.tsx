import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { TextField, TextFieldProps } from '@/components/forms/TextField';

interface FormTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  'value' | 'onChangeText' | 'erro'
> {
  control: Control<T>;
  name: Path<T>;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  ...props
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          value={value == null ? '' : String(value)}
          onChangeText={onChange}
          onBlur={onBlur}
          erro={error?.message}
          {...props}
        />
      )}
    />
  );
}
