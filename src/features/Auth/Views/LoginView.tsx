import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
// import { loginAsync } from "../Store/authSlice";

const loginForm = () => {
  const navigate = useNavigate();
  const accountFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountFormSchema),
  });

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLoginSubmit = (data: any) => {
    console.log(data);
    // dispatch(loginAsync(data)).then((result) => {
    //   if (result.payload) {
    //     console.log("Login Success");
    //     navigate("/");
    //   } else {
    //     console.log("Login Failed");
    //   }
    // });
  };

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          {loading}
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder=""
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Password
          </Label>
          <Input
            id="password"
            placeholder=""
            type="password"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("password")}
          />
        </div>
        <Button type="submit">
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default function LoginView() {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLoginSubmit = () => {
    dispatch({ type: "auth/login" });
  };

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center "></div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sign in
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              {loginForm()}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="bg-blue-400"
                disabled={loading}
              >
                {/* {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "} */}
                Azure Active Directory
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
