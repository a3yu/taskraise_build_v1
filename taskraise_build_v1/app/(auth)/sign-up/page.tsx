"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signup } from "@/utils/functions/auth/authActions";
import { signUpSchema } from "@/utils/functions/auth/authSchema";

export default function SignUp() {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await signup(data);
  };
  return (
    <div className="w-1/2">
      <section>
        <div className="space-y-1 mb-6">
          <p className="text-md text-muted-foreground">
            <span className="text-2xl ">👋</span> Welcome!
          </p>
          <h1 className="text-3xl font-heading">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Have an account?{" "}
            <Link href="/sign-in" className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section>
            {showError && (
              <p className="text-red-500 text-xs font-semibold">{error}</p>
            )}{" "}
            <Button type="submit" className="w-full mt-2" size={"lg"}>
              <span className="font-bold text-sm ">Sign Up</span>
            </Button>
            <p className="text-xs text-muted-foreground my-5 text-center">or</p>
          </section>

          <section className="w-full flex justify-center items-center">
            <div className="flex">
              <Button variant={"outline"} type="submit">
                Sign up using Google
              </Button>
            </div>
          </section>
        </form>{" "}
      </Form>
    </div>
  );
}
