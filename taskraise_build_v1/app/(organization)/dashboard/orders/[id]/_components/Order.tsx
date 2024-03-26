"use client";
import { formatToDollar } from "@/utils/functions/helper";
import NavigationBarSearch from "@/app/(marketplace)/marketplace/_components/NavigationBarSearch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tables } from "@/types/supabase";
import Link from "next/link";
import React, { useState } from "react";
import { Pagination } from "./MessagePagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { insertMessage } from "@/utils/functions/messages/messageActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { OrderWithMessages } from "../types";
const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message must have content." })
    .max(600, { message: "Message must be at most 600 characters." }),
});
function Order({ order }: { order: OrderWithMessages }) {
  const [messagesState, setMessages] = useState<Tables<"messages">[]>(
    order.messages
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5); // Adjust the number of messages per page as needed
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const totalMessages = messagesState?.length ? messagesState.length : 0;
  const indexOfLastMessage =
    totalMessages - (currentPage - 1) * messagesPerPage;
  const indexOfFirstMessage = Math.max(indexOfLastMessage - messagesPerPage, 0);
  const currentMessages = messagesState?.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const [show, setShow] = useState(false);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newMessage = await insertMessage(
      order.organization,
      order.customer,
      order.id,
      values.message,
      true
    );
    if (newMessage != null) {
      setMessages(messagesState.concat(newMessage));
      form.reset();
      setShow(false);
    }
  }
  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex">
              <div className="flex-row space-y-1">
                <CardTitle className="font-bold">Order #{order.id}</CardTitle>
                <div>
                  <p className="text-sm mt-2">
                    Organization:{" "}
                    <span className="font-bold">
                      {order.organizations.name}
                    </span>{" "}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Gig:{" "}
                    <Link
                      className="text-blue-500 font-semibold hover:underline"
                      href={"/marketplace/" + order.services.id}
                    >
                      {order.services.title}
                    </Link>
                  </p>
                </div>
                <div>
                  <p className="text-sm">Amount: {order.quantity}</p>
                </div>
                {order.services.service_type === "hourly" && (
                  <>
                    <p className="text-sm">Hours: {order.hours}</p>
                  </>
                )}
              </div>
              <div className="ml-auto">
                <h2 className="font-semibold text-3xl">
                  {formatToDollar(order.price)}
                </h2>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="mt-5">
          <CardHeader>
            <div className="flex">
              <Dialog open={show} onOpenChange={setShow}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Message</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button>Send</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <CardTitle>Messages</CardTitle>
              <div className="flex ml-auto space-x-4">
                <Button
                  disabled={order.status === "COMPLETED"}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Send a Message
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMessages?.length === 0 && (
                <p className="text-center">No messages.</p>
              )}
              {currentMessages?.toReversed().map((message) => (
                <Card key={message.id}>
                  <CardHeader>
                    <CardTitle>
                      {message.to_customer
                        ? order.organizations.name
                        : order.profiles.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{message.message}</CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <Pagination
                  messagesPerPage={messagesPerPage}
                  totalMessages={
                    messagesState?.length ? messagesState.length : 0
                  }
                  paginate={paginate}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Order;
