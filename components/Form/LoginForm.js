"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import styles from "./loginForm.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  const signInHandler = async (providerId) => {
    if (providerId) {
      await signIn(providerId);
      if (session?.user) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Sign in to your Account
      </Typography>
      <div className="pt-4 flex justify-between">
        {providers && Object.values(providers) && (
          <Button
            className={`${styles.social_btn} ${styles.google_btn}`}
            onClick={() => signInHandler(Object.values(providers)[0].id)}
          >
            Sign in with Google
          </Button>
        )}
        {/* {providers && (
          <Button
            className={`${styles.social_btn} ${styles.google_btn}`}
            onClick={() => signInHandler(providers?.google?.id)}
          >
            Sign in with Google
          </Button>
        )} */}
        <Button className={`${styles.social_btn} ${styles.apple_btn}`}>
          Sign in with Apple
        </Button>
      </div>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-[30px] rounded-2xl bg-white"
        onSubmit={submitHandler}
      >
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <label>Enter email address</label>
            <Input
              size="lg"
              type="email"
              onChange={changeHandler}
              name="email"
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              size="lg"
              onChange={changeHandler}
              name="password"
            />
          </div>
        </div>

        <Button className="mt-6 bg-black text-white" fullWidth type="submit">
          Sign In
        </Button>
      </form>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Don't have an Account?
        <a
          href="/"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Sign up
        </a>
      </Typography>
    </Card>
  );
}
