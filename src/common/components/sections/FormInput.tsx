import {
  type UseFormRegister,
  type FieldErrors,
  type FieldValues,
  type Path,
  get,
} from 'react-hook-form';

interface FormInputProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  label: string;
  name: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  type: string;
  value?: TFieldValues[Path<TFieldValues>];
  isDisable?: boolean;
  isRequire?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  value,
  isDisable = false,
  isRequire = true,
}: FormInputProps<TFieldValues>) => {
  const error = get(errors, name);
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {isRequire && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        disabled={isDisable}
        type={type}
        value={value}
        placeholder={`Nhập ${label}`}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
};
