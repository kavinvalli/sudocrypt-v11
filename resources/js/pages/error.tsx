import React from "react";

const Error: React.FC<{ status: number }> = ({ status }) => {
  return (
    <div className="container-flex-center">
      <div className="box">
        <h1>{status}</h1>
        <p>An error occured</p>
      </div>
    </div>
  );
};

export default Error;
