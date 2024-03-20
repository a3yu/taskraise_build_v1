import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types/supabase";

function ServiceDropdown({
  service,
  children,
}: {
  service: Tables<"services">;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleViewDetails = () => {
    setOpen(true);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleViewDetails}>
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <span className="font-semibold block">Title:</span>
              {service.title}
            </div>
            <div>
              <span className="font-semibold block">Description:</span>
              {service.description}
            </div>
            <div>
              <span className="font-semibold block">Customer Info:</span>
              {service.order_details}
            </div>
            <div>
              <span className="font-semibold block">Service Info:</span>
              {service.service_details}
            </div>
            <div>
              <span className="font-semibold block">Location:</span>
              {service.location || "REMOTE"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ServiceDropdown;
