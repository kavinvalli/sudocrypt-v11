import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { SignInWithGithub, SignInWithGoogle } from "../../components/SocialButton";
import useTitle from "../../lib/use-title";
import TextInput from "../../components/TextInput";

const Register: React.FC = () => {
  useTitle("Register");

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    name: "",
    password: ""
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    (e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.name as any, e.target.value);

  return (
    <div className="container-flex-center full-page">
      <div className="box responsive">
        <h1>Register</h1>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post("/auth/register", {
              preserveState: true,
            });
          }}
        >
          <TextInput
            name="name"
            label="Name"
            placeholder="John Doe"
            type="text"
            value={data.name}
            disabled={processing}
            error={errors.name}
            onChange={handleChange}
          />

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
            name="password"
            label="Password"
            placeholder="sup3rs3cr3tp4ssw0rd"
            type="password"
            value={data.password}
            disabled={processing}
            error={errors.password}
            onChange={handleChange}
          />

          <div className="input-group container-flex-center">
            <div className="note">Already have an account? <Link href="/auth/login">Login</Link></div>
          </div>

          <div className="input-group container-flex-center">
            <button type="submit" className="button--primary" disabled={processing}>
              Register
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

export default Register;
