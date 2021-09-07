import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Recaptcha from "react-recaptcha";
import TextInput from "../../components/TextInput";
import useTitle from "../../lib/use-title";

interface IProps {
  error?: string;
}

const Login: React.FC<IProps> = ({ error }: IProps) => {
  useTitle("Login");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const { setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  // type InputName = "email" | "password";
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as "email" | "password", e.target.value);

  return (
    <div className="flex justify-center items-center h-screen full-page">
      <div className="w-screen h-screen sm:w-auto sm:h-auto flex flex-col justify-center items-center bg-gray-700 p-8 rounded">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            setCaptchaError("");
            if (!isCaptchaVerified) {
              return setCaptchaError("Please verify that you are a human!");
            }
            post("/auth/login", {
              preserveState: true,
            });
          }}
        >
          <TextInput
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            disabled={processing}
            error={errors.email}
            onChange={handleChange}
          />

          <TextInput
            name="password"
            label="Password"
            placeholder="sup3rs3cr3tp4ssw0rd"
            type="password"
            disabled={processing}
            error={errors.password}
            onChange={handleChange}
          />

          {error && (
            <div className="input-group">
              <div className="error">{error}</div>
            </div>
          )}

          <div className="flex flex-col justify-center items-center">
            <Recaptcha
              sitekey="6Ld3iU0cAAAAAH_pvjPNK_fUs695Tn4Dnq33Q4zI"
              render="explicit"
              verifyCallback={() => setIsCaptchaVerified(true)}
            />
            <p className="text-red-500 text-sm">{captchaError}</p>
          </div>

          <div className="input-group">
            <div className="note text-sm text-right">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-bold">
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
  );
};

export default Login;
