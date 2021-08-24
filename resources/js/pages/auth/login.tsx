import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { SignInWithGithub, SignInWithGoogle } from "../../components/SocialButton";
import TextInput from "../../components/TextInput";
import useTitle from "../../lib/use-title";

interface IProps {
  error?: string;
}

const Login: React.FC<IProps> = ({ error }: IProps) => {
  useTitle("Login");

  const { setData, post, processing, errors } = useForm({
    email: "",
    password: ""
  });

  type InputName = "email" | "password";
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    (e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.name as any, e.target.value);

  return (
    <div className="container-flex-center full-page">
      <div className="box responsive">
        <h1>Login</h1>
        <form
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

          {error &&
            <div className="input-group">
              <div className="error">{error}</div>
            </div>}

          <div className="input-group">
            <div className="note">Don't have an account? <Link href="/auth/register">Register</Link></div>
          </div>

          <div className="input-group container-flex-center">
            <button type="submit" className="button--primary" disabled={processing}>
              Login
            </button>
          </div>
        </form>

        <div
          className="input-group"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "var(--color-light)",
            fontSize: "0.9rem"
          }}>
          OR
        </div>

        <div className="social">
          <SignInWithGithub />
          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default Login;
