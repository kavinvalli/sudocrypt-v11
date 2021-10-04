import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Recaptcha from "react-recaptcha";
import TextInput from "../../components/TextInput";
import useTitle from "../../lib/use-title";

const Register: React.FC = () => {
  useTitle("Register");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    name: "",
    username: "",
    password: "",
    institution: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as any, e.target.value);

  return (
    <div className="flex justify-center items-center h-screen full-page">
      <div className="w-screen h-screen sm:w-auto sm:h-auto flex w-100 flex-col justify-center items-center bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            setCaptchaError("");
            if (!isCaptchaVerified) {
              return setCaptchaError("Please verify that you are a human!");
            }
            post("/auth/register", {
              preserveState: true,
            });
          }}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <TextInput
              name="name"
              label="Name"
              placeholder="John Doe"
              className="mr-2"
              type="text"
              value={data.name}
              disabled={processing}
              error={errors.name}
              onChange={handleChange}
            />

            <TextInput
              name="username"
              label="Username"
              placeholder="johndoe"
              className="ml-2"
              type="text"
              value={data.username}
              disabled={processing}
              error={errors.username}
              onChange={handleChange}
            />
          </div>

          <TextInput
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={data.email}
            disabled={processing}
            error={errors.email}
            onChange={handleChange}
          />

          <TextInput
            name="institution"
            label="Institution"
            placeholder="Delhi Public School, R.K. Puram"
            type="text"
            value={data.institution}
            disabled={processing}
            error={errors.institution}
            onChange={handleChange}
          />

          <TextInput
            name="password"
            label="Password"
            placeholder="sup3rs3cr3tp4ssw0rd"
            type="password"
            className="mb-2"
            value={data.password}
            disabled={processing}
            error={errors.password}
            onChange={handleChange}
          />

          <div className="flex flex-col justify-center items-center">
            <Recaptcha
              sitekey="6Ld3iU0cAAAAAH_pvjPNK_fUs695Tn4Dnq33Q4zI"
              render="explicit"
              verifyCallback={() => setIsCaptchaVerified(true)}
            />
            <p className="text-red-500 text-sm">{captchaError}</p>
          </div>

          <div className="flex justify-end">
            <div className="text-xs mt-2">
              Already have an account?{" "}
              <Link className="font-bold" href="/auth/login">
                Login
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button type="submit" className="button p-6" disabled={processing}>
              Register
            </button>
          </div>
        </form>

        {
          // <div
          //   className="input-group"
          //   style={{
          //     textAlign: "center",
          //     fontWeight: "bold",
          //     color: "var(--color-light)",
          //     fontSize: "0.9rem"
          //   }}>
          //   OR
          // </div>
          // <div className="social">
          //   <SignInWithGithub />
          //   <SignInWithGoogle />
          // </div>
        }
      </div>
    </div>
  );
};

export default Register;
