"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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

import { Tables } from "@/types/supabase";
import { OrganizationData } from "@/app/(organization)/dashboard/_components/types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { CreateService } from "./_components/CreateService";
import { Cog } from "lucide-react";
import ServiceDropdown from "./_components/ServiceDropdown";
import { getActive } from "@/utils/functions/helper";

const columns = (
  organizationData: OrganizationData
): ColumnDef<Tables<"services">>[] => [
  {
    size: 1,
    accessorKey: "thumbnail_path",
    header: () => <div className=""></div>,
    cell: function Cell({ row }) {
      const supabase = createClient();
      const [thumbnail, setThumbnail] = React.useState("");
      React.useEffect(() => {
        async function downloadImage(path: string) {
          try {
            const { data, error } = await supabase.storage
              .from("public/service_thumbnails")
              .download(path);
            if (error) {
              throw error;
            }

            const url = URL.createObjectURL(data);
            setThumbnail(url);
          } catch (error) {
            console.log("Error downloading image: ", error);
          }
        }
        downloadImage(row.getValue("thumbnail_path"));
        console.log(row.getValue("thumbnail_path"));
      }, [supabase]);

      return (
        <div className="w-[100px] h-[56.25px] relative">
          {" "}
          <Image
            src={thumbnail}
            layout="fill"
            alt="thumbnail"
            className="rounded"
          />
        </div>
      );
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",

    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <h2>{row.original.title}</h2>
      </div>
    ),
  },
  {
    id: "location",

    header: "Location",

    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <h2>{row.original.location ? row.original.location : "REMOTE"}</h2>
      </div>
    ),
  },
  {
    id: "location",

    header: "",
    size: 1,

    cell: ({ row }) => (
      <div className="flex items-center">
        <ServiceDropdown service={row.original}>
          <Button size={"icon"} variant={"ghost"}>
            <Cog className="h-5 w-5 text-gray-800" />
          </Button>
        </ServiceDropdown>
      </div>
    ),
  },
];
export default function Services({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const tableColumns = React.useMemo(
    () => columns(organizationData),
    [organizationData]
  );

  const table = useReactTable({
    data: getActive(organizationData.services),
    columns: tableColumns,

    onSortingChange: setSorting,
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search services..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto">
          <CreateService
            organizationData={organizationData}
            setOrganizationData={setOrganizationData}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-gray-50"
                      style={{
                        width:
                          header.getSize() !== 0 ? header.getSize() : undefined,
                      }}
                    >
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
                  className="hover:bg-transparent"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-l border-r"
                      style={{
                        width:
                          cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined,
                      }}
                    >
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
    </>
  );
}
