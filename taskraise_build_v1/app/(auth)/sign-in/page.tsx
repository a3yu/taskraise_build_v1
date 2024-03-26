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
import { signInSchema } from "@/utils/functions/auth/authSchema";
import { signin } from "@/utils/functions/auth/authActions";

export default function SignIn() {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await signin(data);
  };

  return (
    <div className="w-1/2">
      <section>
        <div className="space-y-1 mb-6">
          <p className="text-md text-muted-foreground">
            <span className="text-2xl">👋</span> Welcome Back!
          </p>
          <h1 className="text-3xl font-heading">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-700 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
              <span className="font-bold text-sm ">Sign In</span>
            </Button>
            <p className="text-xs text-muted-foreground my-5 text-center">or</p>
          </section>

          <section className="w-full flex justify-center items-center">
            <div className="flex">
              <Button variant={"outline"}>Sign in using Google</Button>
            </div>
          </section>
        </form>{" "}
      </Form>
    </div>
  );
}
