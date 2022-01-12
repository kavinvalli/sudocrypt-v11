import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";
import { useToasts } from "react-toast-notifications";
import { IPageProps } from "../../lib/types";
import { usePage } from "@inertiajs/inertia-react";
import IndexCard from "../../components/Home/IndexCard";

interface IProps {
  error?: string;
}

const Login: React.FC<IProps> = ({ error }: IProps) => {
  useTitle("Login");
  const { addToast } = useToasts();
  const {
    props: {
      flash: { error: flashError },
    },
  } = usePage<IPageProps>();
  const { setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (flashError) {
      addToast(flashError, { appearance: "error" });
    }
  }, []);

  // type InputName = "email" | "password";
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as "email" | "password", e.target.value);

  return (
    <Layout>
      <div className="flex justify-center items-center h-[calc(100vh-104px-120px)] w-full px-4 py-8">
        <IndexCard
          title="Login"
          className="sm:h-[60vh] w-full sm:w-3/4 md:w-1/2"
        >
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
              containerClassName="my-5"
              type="password"
              disabled={processing}
              error={errors.password}
              onChange={handleChange}
            />

            {error && (
              <div className="my-5">
                <div className="text-red-500 text-center font-bold">
                  {error}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-20 mb-5">
              <button type="submit" className="button" disabled={processing}>
                Login
              </button>
            </div>

            <div className="my-5 text-center uppercase font-bold text-gray-600">
              or
            </div>

            <div className="flex justify-center my-5">
              <Link
                className="focus:ring-[#3e48b4] !bg-[#5865F2] !flex items-center justify-center button"
                disabled={processing}
                href="/discord/login"
              >
                <img
                  src="/img/Discord-Logo-White.svg"
                  className="h-4 w-auto mr-2"
                />
                Login with Discord
              </Link>
            </div>

            <div className="my-5">
              <div className="text-base text-center">
                Don&apos;t have an account?{" "}
                <Link
                  className="font-bold text-sudo focus:text-sudo-light"
                  href="/auth/register"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </IndexCard>
      </div>
    </Layout>
  );
};

export default Login;
