import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Recaptcha from "react-google-recaptcha";
import TextInput from "../../components/TextInput";
import Layout from "../../components/Layout";
import useTitle from "../../lib/use-title";
import { IPageProps } from "../../lib/types";
import IndexCard from "../../components/Home/IndexCard";

const Register: React.FC = () => {
  useTitle("Register");
  const { errors } = usePage<IPageProps>().props;
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    institution: "",
    password: "",
    recaptcha: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    setData((values) => {
      return { ...values, [e.target.name as string]: e.target.value as string };
    });

  return (
    <Layout>
      <div className="flex justify-center h-full w-full px-4 my-4">
        <IndexCard
          title="Register"
          className="sm:h-[85vh] w-full sm:w-3/4 md:w-1/2"
        >
          <>
            <form
              className="w-full"
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                Inertia.post("/auth/register", data, {
                  preserveState: true,
                  preserveScroll: true,
                });
              }}
            >
              <TextInput
                name="name"
                label="Name"
                placeholder="John Doe"
                containerClassName="my-5"
                type="text"
                value={data.name}
                disabled={false}
                error={errors.name}
                onChange={handleChange}
              />

              <TextInput
                name="username"
                label="Username"
                placeholder="johndoe"
                containerClassName="my-5"
                type="text"
                value={data.username}
                disabled={false}
                error={errors.username}
                onChange={handleChange}
              />

              <TextInput
                name="email"
                label="Email"
                placeholder="john@example.com"
                containerClassName="my-5"
                type="email"
                value={data.email}
                disabled={false}
                error={errors.email}
                onChange={handleChange}
              />

              <TextInput
                name="institution"
                label="Institution"
                placeholder="Delhi Public School, R.K. Puram"
                containerClassName="my-5"
                type="text"
                value={data.institution}
                disabled={false}
                error={errors.institution}
                onChange={handleChange}
              />

              <TextInput
                name="password"
                label="Password"
                placeholder="sup3rs3cr3tp4ssw0rd"
                containerClassName="my-5"
                type="password"
                value={data.password}
                disabled={false}
                error={errors.password}
                onChange={handleChange}
              />

              <div className="flex flex-col justify-center items-center">
                <Recaptcha
                  sitekey="6Ld3iU0cAAAAAH_pvjPNK_fUs695Tn4Dnq33Q4zI"
                  theme="dark"
                  size="normal"
                  onChange={(token: string | null) => {
                    setData((values) => {
                      return { ...values, recaptcha: token || "" };
                    });
                  }}
                  onExpired={() => {
                    setData((values) => {
                      return { ...values, recaptcha: "" };
                    });
                  }}
                />
                {errors.recaptcha && (
                  <p className="text-red-500 text-sm">{errors.recaptcha}</p>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <button type="submit" className="button" disabled={false}>
                  Register
                </button>
              </div>

              <div className="my-5">
                <div className="text-base text-center">
                  Already have an account?{" "}
                  <Link
                    className="font-bold text-sudo focus:text-sudo-light"
                    href="/auth/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </>
        </IndexCard>
      </div>
    </Layout>
  );
};

export default Register;
