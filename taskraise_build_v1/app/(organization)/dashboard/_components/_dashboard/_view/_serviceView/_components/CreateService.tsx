import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Check, PenLine } from "lucide-react";
import { addCampaign } from "@/utils/functions/campaign/campaignActions";
import { campaignCreation } from "@/utils/functions/campaign/campaignSchema";
import { OrganizationData } from "@/app/(organization)/dashboard/_components/types";

function CreateService({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const form = useForm<z.infer<typeof campaignCreation>>({
    resolver: zodResolver(campaignCreation),
    defaultValues: {
      description: "",
      goal: 0,
      title: "",
    },
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof campaignCreation>) {
    try {
      setLoading(true);
      setShowConfirm(false);

      await addCampaign(
        values.goal,
        values.title,
        values.description,
        organizationData.id
      ).then((data) => {
        setOrganizationData((prevState) => ({
          ...prevState,
          campaigns: data, // Set 'campaigns' to the new data directly
        }));
      });
      setSuccess(true);
      form.reset();
      setTimeout(() => {
        setSuccess(false);
        setShow(false);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ml-auto">
      <Button className="ml-auto" onClick={() => setShow(true)}>
        Create Service
      </Button>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New/Change Campaign</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Campaign Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fundraising Goal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        prefix="$"
                        step="0.01"
                        placeholder="$"
                        {...field}
                      />
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
                    <FormLabel>Campaign Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to change your campaign?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex mt-2 space-x-5">
                    <Button
                      className="bg-green-500 hover:bg-green-400"
                      onClick={() => {
                        onSubmit(form.getValues());
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-400"
                      onClick={() => {
                        form.handleSubmit(onSubmit);

                        setShow(false);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => {
                    form.trigger().then((isValid) => {
                      if (isValid) {
                        setShowConfirm(true);
                      }
                    });
                  }}
                  disabled={loading || success}
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : success ? (
                    <Check />
                  ) : (
                    "Add/Change Campaign"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateService;
