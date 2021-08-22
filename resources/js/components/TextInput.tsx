import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextInput: React.FC<IProps> = ({ label, error, name, ...props }: IProps) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input type={props.type} placeholder={props.placeholder} name={name} {...props} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TextInput;
