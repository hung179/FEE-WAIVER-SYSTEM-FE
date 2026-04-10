import type {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

interface FormSelect<TFieldValues extends FieldValues, TOption> {
  register: UseFormRegister<TFieldValues>;
  label: string;
  name: Path<TFieldValues>;
  options: TOption[];
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | number;
  disabled?: boolean;
  errors: FieldErrors<TFieldValues>;
}

export const FormSelect = <TFieldValues extends FieldValues, TOption>({
  label,
  name,
  options,
  getOptionLabel,
  getOptionValue,
  disabled,
  register,
  errors,
}: FormSelect<TFieldValues, TOption>) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...register(name)}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          errors[name]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}>
        <option value="">-- Chọn --</option>
        {options.map((opt, idx) => (
          <option
            key={idx}
            value={getOptionValue(opt)}>
            {getOptionLabel(opt)}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};
