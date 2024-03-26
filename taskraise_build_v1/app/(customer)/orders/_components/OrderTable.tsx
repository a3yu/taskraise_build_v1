"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter, useSearchParams } from "next/navigation";
import { OrderWithOrganization } from "../type";

export const columns: ColumnDef<OrderWithOrganization>[] = [
  {
    accessorKey: "organization",
    header: () => <div className="">Organization</div>,
    cell: function Cell({ row }) {
      return <div className="font-bold">{row.original.organizations.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: function Cell({ row }) {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="">Submitted</div>,
    cell: function Cell({ row }) {
      const a = new Date(row.getValue("created_at"));
      console.log(row.getValue("created_at"));
      return <div className=" font-medium">{a.toDateString()}</div>;
    },
  },
  {
    accessorKey: "order_details",
    header: () => <div className=""></div>,
    cell: function Cell({ row }) {
      const router = useRouter();
      if (row.original.status === "ONGOING") {
        return (
          <div className="float-right">
            <Button
              onClick={() => {
                router.push("/orders/" + row.original.id);
              }}
            >
              Details
            </Button>
          </div>
        );
      } else {
        let badgeClass = "";
        let badge = "";
        if (row.original.status === "COMPLETED") {
          badgeClass = "bg-green-100 text-green-800";
          badge = "COMPLETE";
        } else if (row.original.status === "INCOMING") {
          badgeClass = "bg-yellow-100 text-yellow-800";
          badge = "PENDING";
        } else if (row.original.status === "REJECTED") {
          badgeClass = "bg-red-100 text-red-800";
          badge = "REJECTED";
        }
        return (
          <div className="float-right">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}
            >
              {badge}
            </span>
          </div>
        );
      }
    },
  },
];

export function OrderTable({ orders }: { orders: OrderWithOrganization[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [data, setData] = React.useState(orders);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
