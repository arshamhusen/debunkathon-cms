"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useNavigate } from "react-router-dom";

// import { priorities, statuses } from "./data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /**
   * The name of the column to filter by.
   * If not provided, the default is "name".
   */
  filterColumnName?: string;
  filterableColumns?: string[];
}

export function DataTableToolbar<TData>({
  table,
  filterColumnName = undefined,
  filterableColumns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getFilterOptions = (column: string) => {
    const values = table.getColumn(column)?.getFacetedUniqueValues();

    if (!values) return [];

    const entries = [...values.entries()];

    const options = entries.map(([label, index]) => {
      return {
        label: label ?? "None",
        value: label ?? "None",
      };
    });

    return options;
  };

  const uncamelCaseAndCapitalize = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const navigate = useNavigate();
  return (
    <div className="sticky top-0">
      <div className=" flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {filterColumnName && (
            <Input
              placeholder={`Search by ${filterColumnName}`}
              value={
                (table
                  .getColumn(filterColumnName)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )}
          <div className="flex space-x-6 ">
            {filterableColumns &&
              filterableColumns.map((column) => {
                return (
                  <DataTableFacetedFilter
                    column={table.getColumn(column)}
                    title={uncamelCaseAndCapitalize(column)}
                    options={getFilterOptions(column)}
                  />
                );
              })}
          </div>
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <DataTableViewOptions table={table} />{" "}
          <Button
            variant="default"
            onClick={() => {
              // Add a add route
              navigate("add");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Add{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
