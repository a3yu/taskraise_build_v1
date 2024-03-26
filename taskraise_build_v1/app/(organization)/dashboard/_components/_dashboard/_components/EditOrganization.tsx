"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/types/supabase";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, UserRound } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OrganizationData } from "../../types";
import { getOrganizationAll } from "@/utils/functions/organizations/organizationsQuery";

const profileFormSchema = z.object({
  org_name: z
    .string()
    .min(1, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string().max(160).min(1),
  file_path: z
    .string()
    .min(1, {
      message: "Service must have a thumbnail.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function EditOrganization({
  organization,
  show,
  setShow,
  setOrganization,
}: {
  organization: OrganizationData;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const supabase = createClient();
  const defaultValues: Partial<ProfileFormValues> = {
    org_name: organization.name,
    description: organization.description,
    file_path: organization.pfp_path || "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { setValue, getValues } = form;
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uid, setUid] = useState("");
  const uploadPFP: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);
      const user = await (await supabase.auth.getUser()).data.user;
      if (user) {
        if (!event.target.files || event.target.files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        setFile(event.target.files[0]);
        setUid(user.id);
      }
    } catch (error) {
      alert("Error uploading thumbnail!");
    }
  };
  useEffect(() => {
    async function downloadImage(pathPfp: string | null) {
      try {
        if (pathPfp) {
          const { data: pfpdata, error: pfperror } = await supabase.storage
            .from("public/org_pfps")
            .download(organization.id + "/" + pathPfp);
          if (pfperror) {
            return;
          }
          const urlPfp = URL.createObjectURL(pfpdata);
          setPreview(urlPfp);
        }
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }
    downloadImage(organization.pfp_path);
  }, [supabase]);
  useEffect(() => {
    try {
      if (file) {
        const fileExt = file?.name.split(".").pop();
        setValue("file_path", `${uid}-${Math.random()}.${fileExt}`);
        setPreview(URL.createObjectURL(file));
      }
    } catch (error) {
      alert("Error uploading thumbnail!");
    } finally {
      setUploading(false);
    }
  }, [file]);

  async function onSubmit(data: ProfileFormValues) {
    if (data.file_path && file) {
      let { error: uploadError } = await supabase.storage
        .from("org_pfps")
        .upload(organization.id + "/" + data.file_path, file);
      console.log(uploadError);
      if (uploadError) {
        throw uploadError;
      }
    } else {
      form.setError("file_path", { message: "Issue with file upload." });
    }
    const { error } = await supabase
      .from("organizations")
      .update({
        name: data.org_name,
        description: data.description,
        pfp_path: data.file_path,
      })
      .eq("id", organization.id);
    await getOrganizationAll(organization.id).then((orgData) => {
      setOrganization(orgData);
    });

    if (error) {
      console.log(error);
      window.alert("Error updating profile!");
    }
    setShow(false);
  }
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <div>
          <div>
            <div className="">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="file_path"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4">
                            <Avatar>
                              {preview && (
                                <AvatarImage src={preview} alt="pfp" />
                              )}
                              <AvatarFallback>
                                <UserRound />
                              </AvatarFallback>
                            </Avatar>
                            <Input
                              type="file"
                              accept="image/*"
                              disabled={uploading}
                              onChange={uploadPFP}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input placeholder={organization.name} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={organization.description}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div></div>
                  <Button type="submit">Update Organization</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrganization;
