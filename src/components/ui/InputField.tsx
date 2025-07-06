interface InputFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  value?: any;
  onChange?: any;
  name?: string;
  disabled?: boolean;
}

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
}: InputFieldProps) => (
  <div className="flex flex-col space-y-1">
    {/* <label className="text-base font-medium text-gray-700">{placeholder}</label> */}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      disabled={disabled}
      required={true}
    />
  </div>
);

export default InputField;
