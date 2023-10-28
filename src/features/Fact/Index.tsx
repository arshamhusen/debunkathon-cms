import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { News } from "@/types";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "@/lib/http-client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Fact {
  id: number;
  title: string;
  description?: any;
  articleId: number;
  source: string;
  verdict: boolean;
  userId: number;
  verified: boolean;
  verifiedBy: number;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

const verifyFact = (id: number) => {
  httpClient.put(`/facts/verify/${id}`).then((res) => {
    console.log(res);
  });
};

const columns: ColumnDef<Fact>[] = [
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
  {
    id: "verified",
    accessorKey: "verified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verification" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "verdict",
    accessorKey: "verdict",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verdict" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  {
    id: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-4">
        <button
          onClick={() => {
            verifyFact(row.getValue("id"));
          }}
          className="p-2 rounded-lg btn btn-primary bg-green-500"
        >
          Verify
        </button>
        <button
          onClick={() => {}}
          className="p-2 rounded-lg btn btn-danger bg-red-500 text-white"
        >
          Reject
        </button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function FactsIndex() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const loadFacts = () => {
    httpClient.get("/facts").then((res) => {
      setFacts(res.data?.facts);
    });
  };

  useEffect(() => {
    loadFacts();
  }, []);

  return (
    <div>
      <div className="pt-5">
        {/*@ts-ignore */}
        <DataTable
          name="Facts"
          columns={columns}
          // @ts-ignore
          data={facts}
        />
      </div>
    </div>
  );
}
