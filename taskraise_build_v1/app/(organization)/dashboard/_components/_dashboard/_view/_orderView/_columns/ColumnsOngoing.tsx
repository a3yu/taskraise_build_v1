import { ColumnDef } from "@tanstack/react-table";
import { formatToDollar } from "@/utils/functions/helper";
import { ServiceOrderWithService } from "../../../../types";
import IncomingActionsDialog from "./IncomingActionDialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ServiceOrderWithService>[] = [
  {
    id: "buyer",
    accessorKey: "profiles.username",

    header: "Buyer",

    cell: ({ row }) => (
      <div>
        <h2>{row.original.profiles?.username}</h2>
      </div>
    ),
  },
  {
    id: "title",
    accessorKey: "services.title",

    header: "Service",

    cell: ({ row }) => (
      <div>
        <h2>{row.original.services?.title}</h2>
      </div>
    ),
  },
  {
    id: "quantity",

    header: "Qty.",

    cell: ({ row }) => <h2>{"x" + row.original.quantity}</h2>,
  },
  {
    id: "price",
    accessorFn: (row) => row.price,
    header: ({ column }) => {
      return (
        <div>
          Total
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </div>
      );
    },
    enableSorting: true,

    cell: ({ row }) => {
      return <h2>{formatToDollar(row.original.price)}</h2>;
    },
  },
  {
    id: "actions",
    accessorKey: "created_at",
    header: () => <div className="mx-1">Details</div>,
    size: 1,
    cell: ({ row }) => {
      return (
        <h2 className="text-blue-700 underline hover:cursor-pointer mx-1 ">
          Details
        </h2>
      );
    },
    enableHiding: false,
  },
];
