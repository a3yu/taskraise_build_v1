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
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  MembersWithProfile,
  OrganizationData,
  ProfileWithMember,
} from "@/app/(organization)/dashboard/_components/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InviteUsers from "./InviteUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columns = (
  profile: ProfileWithMember
): ColumnDef<MembersWithProfile>[] => [
  {
    id: "fullname",

    header: "Full Name",

    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Avatar className="h-9 w-9">
          <AvatarImage />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <h2>Aedin Yu</h2>
      </div>
    ),
  },

  {
    id: "email",

    header: "Email",

    cell: ({ row }) => (
      <div>
        <h2>{row.original.profiles?.email}</h2>
      </div>
    ),
  },
  {
    id: "role",
    accessorKey: "org_role",

    header: "Role",

    cell: ({ row }) => (
      <div>
        <h2>{row.original.org_role}</h2>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    size: 1,
    cell: ({ row }) => (
      <div className="">
        {row.original.profile != profile.id ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size={"icon"} variant={"ghost"}>
                <DotsHorizontalIcon className="mx-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {profile.organization_members[0].org_role === "ADMIN" && (
                <>
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>Remove User</DropdownMenuItem>
                </>
              )}
              {profile.organization_members[0].org_role === "MEMBER" && (
                <DropdownMenuItem>View Profile</DropdownMenuItem>
              )}
              {profile.organization_members[0].org_role === "OWNER" && (
                <>
                  {row.original.org_role != "ADMIN" && (
                    <DropdownMenuItem>Promote User</DropdownMenuItem>
                  )}
                  {row.original.org_role == "ADMIN" && (
                    <DropdownMenuItem>Demote User</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Remove User</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button size={"icon"} variant={"ghost"} disabled>
              <DotsHorizontalIcon className="mx-2" />
            </Button>
          </>
        )}
      </div>
    ),
  },
];
export default function MembersTable({
  profileData,
  organizationData,
  setOrganizationData,
}: {
  profileData: ProfileWithMember;
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
  const tableColumns = React.useMemo(() => columns(profileData), [profileData]);
  const table = useReactTable({
    data: organizationData.organization_members,
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
          placeholder="Search usernames..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <InviteUsers organizationData={organizationData} />
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
