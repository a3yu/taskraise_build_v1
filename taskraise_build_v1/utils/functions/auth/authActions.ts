"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signInSchema, signUpSchema } from "./authSchema";
import { z } from "zod";

export async function signin(values: z.infer<typeof signInSchema>) {
  const supabase = createClient();

  const data = {
    email: values.email,
    password: values.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(values: z.infer<typeof signUpSchema>) {
  const supabase = createClient();
  console.log(values);
  const data = {
    email: values.email,
    password: values.password,
    options: {
      data: {
        username: values.username,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
