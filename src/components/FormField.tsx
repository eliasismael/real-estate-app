import { UseFormRegister, FieldErrors } from "react-hook-form";

interface IFormInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  defaultValue?: string;
  errors: FieldErrors<any>;
}

const FormField: React.FC<IFormInputProps> = (props) => {
  const { name, type, placeholder, register, defaultValue, errors } = props;
  return (
    <>
      <input
        id={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, { required: true })}
        className="border border-gray-300 focus:border-blue-600 outline-none rounded w-full px-4 h-14 text-sm"
      />

      {errors[name] && (
        <span className="text-red-500">This field is required</span>
      )}
    </>
  );
};

export default FormField;
