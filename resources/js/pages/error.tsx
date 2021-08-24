import React from "react";

interface IErrorProps {
  status: number;
  message?: string;
}

const Error: React.FC<IErrorProps> = ({ status, message }: IErrorProps) => {
  return (
    <div className="container-flex-center">
      <div className="box">
        <h1>{status}</h1>
        {message ? <p>{message}</p> : <p>An error occured</p>}
      </div>
    </div>
  );
};

export default Error;
