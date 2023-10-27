import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import { News } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

export default function Dashboard() {
  const { news } = useAppSelector((state) => state.app);

  const columns: ColumnDef<News>[] = [
    {
      id: "select",
      accessorKey: "id",
      accessorFn: (row) => row.id,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "source_name",
      accessorKey: "source_name",
      cell: ({ row }) => (
        <div className="title">
          <a
            className="text-blue-500 hover:underline hover:text-blue-400 cursor-pointer"
            href={row.getValue("source_url")}
            target="_blank"
          >
            {row.getValue("source_name")}
          </a>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      accessorFn: (row) => row.title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="title ">
          <span className="title block font-bold">{row.getValue("title")}</span>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "reference_urls",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="References" />
      ),
      cell: ({ row }) => (
        <div className="title ">
          <span className="title block font-bold">
            {/* @ts-ignore */}
            {row.getValue("reference_urls")?.length || 0}
          </span>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "score",
      accessorKey: "score",
      accessorFn: (row) => row.score,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "rating",
      accessorKey: "rating",
      accessorFn: (row) => row.rating,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <div className="date">{formatDate(row.getValue("created_at"))}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "updated_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => (
        <div className="date">{formatDate(row.getValue("updated_at"))}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  useEffect(() => {}, []);

  return (
    <>
      <div className="dashboard">
        {/*@ts-ignore */}
        <DataTable
          name="Recently Debunked"
          columns={columns}
          // @ts-ignore
          data={news}
        />
      </div>
    </>
  );
}
