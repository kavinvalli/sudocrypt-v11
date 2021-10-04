import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const TextInput: React.FC<IProps> = ({
  label,
  error,
  name,
  className,
  ...props
}: IProps) => {
  return (
    <div className="my-3 w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={
          "bg-dark text-gray-200 block w-full border-0 py-6 px-4" +
          " " +
          className
        }
        type={props.type}
        placeholder={props.placeholder}
        name={name}
        {...props}
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default TextInput;
