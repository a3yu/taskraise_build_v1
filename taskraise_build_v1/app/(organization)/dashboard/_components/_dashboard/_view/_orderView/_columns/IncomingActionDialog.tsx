import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatNumberToId } from "@/utils/functions/helper";
import React, { useState } from "react";
import { ServiceOrderWithService } from "../../../../types";
import {
  acceptOrder,
  rejectOrder,
} from "@/utils/functions/service_orders/serviceOrderActions";
import { Loader } from "lucide-react";

export default function IncomingActionsDialog({
  children,
  order,
  setOrders,
  allOrders,
}: {
  children: React.ReactNode;
  order: ServiceOrderWithService;
  setOrders: React.Dispatch<React.SetStateAction<ServiceOrderWithService[]>>;
  allOrders: ServiceOrderWithService[];
}) {
  const [open, setOpen] = useState(false);
  const [acceptClickCount, setAcceptClickCount] = useState(0);
  const [rejectClickCount, setRejectClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleAcceptOrder() {
    if (acceptClickCount === 1) {
      setLoading(true);
      await acceptOrder(order.id).then((newOrder) => {
        const updatedOrders = allOrders.map((o) =>
          o.id === newOrder.id ? newOrder : o
        );
        setOrders(updatedOrders);
      });
      setOpen(false);
      setAcceptClickCount(0);
      setLoading(false);
    } else {
      setAcceptClickCount(acceptClickCount + 1);
      setRejectClickCount(0);
    }
  }

  async function handleRejectOrder() {
    if (rejectClickCount === 1) {
      setLoading(true);
      await rejectOrder(order.id).then((newOrder) => {
        const updatedOrders = allOrders.map((o) =>
          o.id === newOrder.id ? newOrder : o
        );
        setOrders(updatedOrders);
      });
      setOpen(false);
      setAcceptClickCount(0);
      setLoading(false);
    } else {
      setRejectClickCount(rejectClickCount + 1);
      setAcceptClickCount(0);
    }
  }

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setAcceptClickCount(0);
          setRejectClickCount(0);
        }
      }}
      open={open}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-2xl font-bold">
            Order #{formatNumberToId(order.id)}
          </h2>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-md">Order Details</h3>
            <p>{order.details}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-green-600 hover:bg-green-500"
            onClick={handleAcceptOrder}
            disabled={loading}
          >
            {loading && acceptClickCount === 1 ? (
              <Loader className="animate-spin" />
            ) : acceptClickCount === 1 ? (
              "Confirm Accept"
            ) : (
              "Accept Order"
            )}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={handleRejectOrder}
            disabled={loading}
          >
            {loading && rejectClickCount === 1 ? (
              <Loader className="animate-spin" />
            ) : rejectClickCount === 1 ? (
              "Confirm Reject"
            ) : (
              "Reject Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
