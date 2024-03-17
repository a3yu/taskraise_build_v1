import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { inviteUser } from "@/utils/functions/organizations/organizationActions";
import { OrganizationData } from "@/app/(organization)/dashboard/_components/types";
import { Loader, Check } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Input must be a valid email.",
  }),
});

function InviteUsers({
  organizationData,
}: {
  organizationData: OrganizationData;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [openMain, setOpenMain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const user = await inviteUser(values.email, organizationData.id);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setOpenMain(false);
      }, 2000);
    } catch (e) {
      if (e instanceof Error) {
        form.setError("root", { message: e.message });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ml-auto">
      <Dialog open={openMain} onOpenChange={setOpenMain}>
        <DialogTrigger>
          <Button>Invite User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Invite User</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <Button type="submit" disabled={loading || success}>
                {loading ? (
                  <Loader className="animate-spin" />
                ) : success ? (
                  <Check />
                ) : (
                  "Send Invite"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InviteUsers;
