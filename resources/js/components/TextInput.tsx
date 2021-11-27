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
          className="uppercase text-sm font-bold mb-1 block transition"
        >
          {label}
        </label>
      )}
      <input
        className={`bg-dark text-gray-200 block w-full border-0 rounded-lg !ring-sudo !border-sudo !outline-sudo focus:ring-2 transition py-4 px-4 ${className}`}
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
