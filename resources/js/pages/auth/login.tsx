import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";

interface IProps {
  error?: string;
}

const Login: React.FC<IProps> = ({ error }: IProps) => {
  useTitle("Login");
  const { setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  // type InputName = "email" | "password";
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as "email" | "password", e.target.value);

  return (
    <Layout footer={true}>
      <div className="flex justify-center items-center h-full w-full px-4 py-8">
        <div className="w-full max-w-md h-auto flex w-100 flex-col justify-center items-center sm:bg-gray-800 p-0 sm:p-8 rounded-lg sm:shadow-2xl">
          <h1 className="w-full text-gray-400 text-3xl font-bold mb-3">Login</h1>
          <form
            className="w-full"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/auth/login", {
                preserveState: true,
              });
            }}
          >
            <TextInput
              name="email"
              label="Email"
              placeholder="john@example.com"
              className="bg-dark-lighter sm:bg-dark"
              containerClassName="my-5"
              type="email"
              disabled={processing}
              error={errors.email}
              onChange={handleChange}
            />

            <TextInput
              name="password"
              label="Password"
              placeholder="sup3rs3cr3tp4ssw0rd"
              className="bg-dark-lighter sm:bg-dark"
              containerClassName="my-5"
              type="password"
              disabled={processing}
              error={errors.password}
              onChange={handleChange}
            />

            {error && (
              <div className="my-5">
                <div className="text-red-500 text-center font-bold">{error}</div>
              </div>
            )}

            <div className="my-5">
              <div className="text-sm text-center">
              Don&apos;t have an account?{" "}
                <Link className="font-bold text-sudo" href="/auth/register">
                Register
                </Link>
              </div>
            </div>
            

            <div className="flex justify-center mt-4">
              <button type="submit" className="button" disabled={processing}>
              Login
              </button>
            </div>
          </form>

          {
          //         <div
          //           className="input-group"
          //           style={{
          //             textAlign: "center",
          //             fontWeight: "bold",
          //             color: "var(--color-light)",
          //             fontSize: "0.9rem",
          //           }}
          //         >
          //           OR
          //         </div>
          //         <div className="social">
          //           <SignInWithGithub />
          //           <SignInWithGoogle />
          //           <SignInWithDiscord />
          //         </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Login;
