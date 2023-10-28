import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import StatusCard from "@/components/status-card";
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
      id: "source_url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Source" />
      ),
      cell: ({ row }) => (
        <a
          className="text-blue-500 hover:underline hover:text-blue-400 cursor-pointer"
          href={row.getValue("source_url")}
          target="_blank"
        >
          {JSON.stringify(row.getValue("source_url"))}
        </a>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      accessorFn: (row) => {
        row.title, row.description;
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="title">
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score" />
      ),
      cell: ({ row }) => {
        const value = row.getValue("score") as number;
        let color = "bg-red-400";
        switch (value) {
          // @ts-ignore
          case value < 25:
            color = "bg-blue-400";
            break;
          // @ts-ignore
          case value < 50:
            color = "bg-pink-400";
            break;
          // @ts-ignore
          case value < 75:
            color = "bg-yellow-400";
            break;
          // @ts-ignore
          case value < 75:
            color = "bg-green-400";
            break;
        }

        return (
          <>
            <Badge className={color}>{value}</Badge>
          </>
        );
      },
    },
    {
      id: "rating",
      accessorKey: "rating",
      accessorFn: (row) => row.rating,
      enableSorting: false,
      enableHiding: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rating" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={
            row.getValue("rating") === "positive"
              ? "bg-[#34D399] bg-opacity-[0.15] text-[#18A16F] hover:bg-[#34D399] hover:text-white hover:cursor-pointer"
              : "bg-red-400 bg-opacity-[0.15] text-red-400 hover:bg-red-400 hover:text-white hover:cursor-pointer"
          }
        >
          {row.getValue("rating")}
        </Badge>
      ),
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
        <div className="stats flex gap-2">
          <StatusCard title="Total News Detected" value={100000} />
          <StatusCard title="Total News" value={30000} />
          <StatusCard title="Total News" value={3000} />
          <StatusCard title="Total News" value={1000} />
        </div>

        <div className="pt-5">
          {/*@ts-ignore */}
          <DataTable
            name="Recently Debunked"
            columns={columns}
            // @ts-ignore
            data={news}
          />
        </div>
      </div>
    </>
  );
}
