import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import httpClient from "@/lib/http-client";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface FactDetailPayload {
  message: string;
  article: Article;
  relatedArticles: RelatedArticle[];
  facts: Fact[];
}

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

interface RelatedArticle {
  id: number;
  articleId: number;
  relatedArticleId: number;
  createdAt: string;
  updatedAt: string;
  relatedArticleAlias: Article;
}

interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
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

export default function FactDetails() {
  const [data, setData] = useState<FactDetailPayload>();
  const [loading, setLoading] = useState(false);

  const GetFacts = () => {
    // Get title from query params

    let params = new URLSearchParams(window.location.search);

    let title = params.get("title");

    setLoading(true);
    httpClient
      .post("/articles/check", {
        title: title,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        // form.setValue("title", res.data.title);
        // form.setValue("description", res.data.description);
        // form.setValue("source", res.data.source);
      });
  };

  useEffect(() => {
    GetFacts();
  }, []);

  return loading ? (
    <div className="loading">Loading ....</div>
  ) : (
    data && (
      <div>
        <div className="article-info">
          <div className="title text-4xl font-bold">{data.article?.title}</div>
          <div className="description text-gray-500 italic">
            {data.article?.description}
          </div>
          <div className="source text-gray-500 italic">
            <a
              target="_blank"
              className="text-blue-500 underline"
              href={data.article?.source}
            >
              Read original article
            </a>
          </div>
        </div>

        <div className="related-articles">
          {data.relatedArticles?.length > 0 && (
            <div>
              <div className="title text-2xl font-bold">
                Related Articles ({data.relatedArticles?.length})
              </div>
              <div className="grid grid-cols-4 pt-10 gap-4">
                {data.relatedArticles.map((article) => (
                  <div className="article p-4 card border aspect-square">
                    <div className="title text-2xl font-bold">
                      {article.relatedArticleAlias.title}
                    </div>
                    <div className="description text-gray-500 italic">
                      {article.relatedArticleAlias.description}
                    </div>
                    <div className="source text-gray-500 italic"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.relatedArticles?.length === 0 && (
            <div className="no-facts">
              <h1 className="font-bold text-4xl">Please contribute facts.</h1>
            </div>
          )}
        </div>

        {data.facts?.length > 0 && (
          <div className="pt-5 facts">
            {/* @ts-ignore */}
            <DataTable
              name="Facts"
              columns={columns}
              // @ts-ignore
              data={data.facts}
            />
          </div>
        )}
      </div>
    )
  );
}
