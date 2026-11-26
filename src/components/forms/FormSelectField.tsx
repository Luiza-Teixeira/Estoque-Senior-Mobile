import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { SelectField, SelectFieldProps } from '@/components/forms/SelectField';

interface FormSelectFieldProps<T extends FieldValues, V extends string | number> extends Omit<
  SelectFieldProps<V>,
  'valor' | 'aoSelecionar' | 'erro'
> {
  control: Control<T>;
  name: Path<T>;
}

export function FormSelectField<T extends FieldValues, V extends string | number>({
  control,
  name,
  ...props
}: FormSelectFieldProps<T, V>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <SelectField<V>
          valor={value as V | null}
          aoSelecionar={onChange}
          erro={error?.message}
          {...props}
        />
      )}
    />
  );
}
