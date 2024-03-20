"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { PlacesAutocomplete } from "@/components/google-places/PlacesAutocomplete";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createService } from "@/utils/functions/services/serviceActions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { OrganizationData } from "../../../../types";
import { serviceSchema } from "@/utils/functions/services/serviceSchema";
import { Tables } from "@/types/supabase";
export function CreateService({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const supabase = createClient();
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      location: "",
      location_geo: "",
      description: "",
      thumbnail_path: "",
      service_type: "",
    },
  });
  const { setValue } = form;
  const [locationSelect, setLocationSelect] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [stepTwo, setStepTwo] = useState(false);
  const [uid, setUid] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState(false);

  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    // Check if file is present
    if (file) {
      // Attempt to upload the file
      let { error: uploadError } = await supabase.storage
        .from("service_thumbnails")
        .upload(organizationData.id + "/" + values.thumbnail_path, file);

      // Handle upload error
      if (uploadError) {
        throw uploadError;
      } else {
        // Proceed with creating the service
        try {
          await createService(organizationData.id, values).then((data) => {
            setOrganizationData({
              ...organizationData,
              services: [...organizationData.services, data],
            });
            form.reset();
            setDialogState(false);
            setStepTwo(false);
          });
        } catch (error) {
          alert("Service could not be created.");
        }
      }
    } else {
      // Set error on form if file is not provided
      form.setError("thumbnail_path", { message: "Issue with file upload." });
    }
  }

  const uploadThumbnail: React.ChangeEventHandler<HTMLInputElement> = async (
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
    try {
      if (file) {
        const fileExt = file?.name.split(".").pop();
        setValue("thumbnail_path", `${uid}-${Math.random()}.${fileExt}`);
        setPreview(URL.createObjectURL(file));
        setShowPreview(true);
      }
    } catch (error) {
      alert("Error uploading thumbnail!");
    } finally {
      setUploading(false);
    }
  }, [file]);

  return (
    <AlertDialog onOpenChange={setDialogState} open={dialogState}>
      <AlertDialogTrigger>
        <Button>Create a Service</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a Service</AlertDialogTitle>
        </AlertDialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {!stepTwo && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input placeholder="We will..." {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
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
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (City)</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="w-full">
                              <PlacesAutocomplete
                                setSelectState={setLocationSelect}
                                selectState={locationSelect}
                                onAddressSelect={(address) => {
                                  getGeocode({ address: address }).then(
                                    (results) => {
                                      const { lat, lng } = getLatLng(
                                        results[0]
                                      );
                                      setValue(
                                        "location_geo",
                                        "POINT(" + lat + " " + lng + ")"
                                      );
                                      setValue("location", address);
                                      setLocationSelect(true);
                                    }
                                  );
                                }}
                              />
                            </div>
                            {locationSelect && (
                              <div className="m-2 ml-auto">
                                <X
                                  className="hover:cursor-pointer"
                                  onClick={() => {
                                    setValue("location_geo", "");
                                    setValue("location", "");
                                    setLocationSelect(false);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Leave empty if remote service.
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnail_path"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            onChange={uploadThumbnail}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Service Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Service Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                <SelectItem value="event">
                                  Event (eg. summer camp, workshop, etc.)
                                </SelectItem>
                                <SelectItem value="local">
                                  Local Service (eg. lawn mowing, leave raking,
                                  etc.)
                                </SelectItem>
                                <SelectItem value="freelance">
                                  Freelance Service (eg. graphic design, web
                                  design, etc.)
                                </SelectItem>
                                <SelectItem value="hourly">
                                  Hourly Rate Service (eg. tutoring, dog
                                  walking, etc.)
                                </SelectItem>
                                <SelectItem value="merchandise">
                                  Merchandise (eg. donuts, cookies, etc.)
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {stepTwo && (
                <>
                  <FormField
                    control={form.control}
                    name="order_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Information</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          Tell the customer what information you need from them.{" "}
                          <br /> (eg. address, email, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(form.getValues("service_type") == "freelance" ||
                    form.getValues("service_type") == "local" ||
                    form.getValues("service_type") == "hourly") && (
                    <FormField
                      control={form.control}
                      name="service_details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availablity/Delivery Time</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormDescription>
                            Tell the customer when you are available/expected
                            delivery times. <br /> (eg. 9am-5pm, Monday-Friday)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.getValues("service_type") == "event" && (
                    <FormField
                      control={form.control}
                      name="service_details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormDescription>
                            Tell the customer the details about the event.{" "}
                            <br /> (eg. where it is, what it is, etc.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.getValues("service_type") == "merchandise" && (
                    <FormField
                      control={form.control}
                      name="service_details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Merchandise Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormDescription>
                            Tell the customer the details about the merchandise.{" "}
                            <br /> (eg. what it is, how many, etc.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.getValues("service_type") == "other" && (
                    <FormField
                      control={form.control}
                      name="service_details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormDescription>
                            Tell the customer anything they should know about
                            this service.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex space-x-6">
                    {" "}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Price
                            {form.getValues("service_type") == "hourly" &&
                              " (per hour)"}
                          </FormLabel>
                          <FormControl>
                            <>
                              <Input
                                type="number"
                                prefix="$"
                                step="0.01"
                                placeholder="$"
                                {...field}
                              />
                              <p className="text-xs mt-1">
                                To keep our platform operating safely and
                                securely we charge 5% + 30&#162;
                              </p>
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              <div className="w-full pt-2">
                {!stepTwo && (
                  <Button
                    type="button"
                    onClick={async () => {
                      const isValid = await form.trigger([
                        "thumbnail_path",
                        "title",
                        "description",
                        "location",
                        "service_type",
                        "location_geo",
                      ]);
                      if (isValid) {
                        setStepTwo(true);
                      }
                    }}
                  >
                    Continue
                  </Button>
                )}
                {stepTwo && (
                  <>
                    <Button type="submit">Submit</Button>
                    <Button
                      className="ml-4"
                      type="button"
                      onClick={() => {
                        setStepTwo(false);
                      }}
                    >
                      Back
                    </Button>
                  </>
                )}
                <Button
                  type="button"
                  className="float-right bg-red-500 hover:bg-red-400"
                  onClick={() => {
                    setStepTwo(false);
                    setDialogState(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
      <AlertDialog open={showPreview}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <h1 className="font-heading text-2xl">Preview</h1>
          </AlertDialogHeader>
          {preview && (
            <div className="w-72 h-40 relative mx-auto ">
              <Image
                src={preview}
                alt={""}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          )}
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setShowPreview(false);
              }}
            >
              Looks Good!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
}
