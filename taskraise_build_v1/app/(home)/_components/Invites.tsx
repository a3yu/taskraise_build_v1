import {
  InvitationWithOrganization,
  ProfileWithOrganization,
} from "@/app/(marketplace)/marketplace/types";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { Dispatch, SetStateAction } from "react";
import { Tables } from "@/types/supabase";
import { acceptInvite } from "@/utils/functions/organizations/organizationActions";
export const columns = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setProfileState: React.Dispatch<
    React.SetStateAction<ProfileWithOrganization | null>
  >,
  profileState: ProfileWithOrganization
): ColumnDef<InvitationWithOrganization>[] => [
  {
    header: "Invited at",
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.original.created_at).toLocaleDateString()}
      </div>
    ),
  },
  {
    header: "Organization",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.organizations?.name}</div>
    ),
  },
  {
    id: "actions",
    header: () => {
      return <div className="float-right"></div>;
    },
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      async function acceptInviteButton() {
        await acceptInvite(
          row.original.profile,
          row.original.organization
        ).then((data) => {
          setProfileState(data);
          setOpen(false);
          router.push("/dashboard");
        });
      }
      return (
        <div className="flex ml-auto space-x-2 float-right">
          <Button
            size={"sm"}
            className="bg-green-500 hover:bg-green-400"
            onClick={acceptInviteButton}
          >
            Accept
          </Button>
        </div>
      );
    },
  },
];
function Invites({
  profile,
  open,
  setOpen,
  setProfile,
}: {
  profile: ProfileWithOrganization;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setProfile: Dispatch<SetStateAction<ProfileWithOrganization | null>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const tableColumns = React.useMemo(
    () => columns(setOpen, setProfile, profile),
    [setOpen, setProfile, profile]
  );
  const table = useReactTable({
    data: profile.invitations,
    columns: tableColumns,
    onSortingChange: setSorting,
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invites</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <div className="rounded-md border">
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Invites;
