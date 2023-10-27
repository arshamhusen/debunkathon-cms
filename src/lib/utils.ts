import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number, format?: string): string {
  const date = new Date(input);

  if (format === null) {
    format = "MM/dd/yyyy";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    minute: "numeric",
    hour: "numeric",
    second: "2-digit",
  });
}

// Uncamel case
export function uncamelCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/_/g, " ");
}
