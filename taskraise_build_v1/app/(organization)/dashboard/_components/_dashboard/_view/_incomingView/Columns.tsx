import { Checkbox } from "@/components/ui/checkbox";
import { Tables } from "@/types/supabase";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tables<"service_orders">>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Item",

    cell: ({ row }) => <h2>{row.getValue("id")}</h2>,
  },
];
