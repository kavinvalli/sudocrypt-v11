import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

const TextInput: React.FC<IProps> = ({
  label,
  error,
  name,
  className,
  containerClassName,
  ...props
}: IProps) => {
  return (
    <div
      className={`my-3 w-full ${containerClassName} text-gray-600 focus-within:text-gray-300`}
    >
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-bold uppercase transition"
        >
          {label}
        </label>
      )}
      <input
        className={`bg-transparent text-gray-200 block w-full border-0 border-b-2 border-gray-600 transition focus:ring-0 focus:!outline-none focus:!shadow-none focus:border-sudo py-4 px-1 ${className}`}
        type={props.type}
        placeholder={props.placeholder}
        name={name}
        {...props}
      />
      {error && <div className="text-sm text-red-500 pt-2">{error}</div>}
    </div>
  );
};

export default TextInput;
