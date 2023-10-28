import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import StatusCard from "@/components/status-card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import httpClient from "@/lib/http-client";
import { formatDate } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import { News } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [articles, setArticles] = useState<News[]>([]);
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
      accessorKey: "title",
      accessorFn: (row) => row.title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="title">
          <Link
            className="text-blue-500 hover:underline"
            to={`/news?title=${row.getValue("title")}`}
          >
            {row.getValue("title")}
          </Link>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "description",
    //   accessorFn: (row) => row.description,
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Description" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="description">{row.getValue("description")}</div>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <div className="date">{formatDate(row.getValue("createdAt"))}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => (
        <div className="date">{formatDate(row.getValue("updatedAt"))}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const loadNews = () => {
    httpClient.get("/articles/all").then((res) => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    loadNews();
  }, []);

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
            data={articles}
          />
        </div>
      </div>
    </>
  );
}
