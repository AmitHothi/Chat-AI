export * from "./handle-graphql-error";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function hasFileNameSpaces(fileName: string) {
  return /\s/.test(fileName);
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getImageKeyFromUrl = (url: string) => {
  const parts = url.split("/");
  return parts.at(-1);
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export function slugify(string_: string) {
  return string_
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-{2,}/g, "-");
}

/**
 * Replaces the organization ID in the given URL with the desired value.
 *
 * @param {string} url - The original URL containing the organization ID.
 * @param {string} newId - The new organization ID to replace with.
 * @returns {string} - The updated URL with the new organization ID.
 */
export const replaceOrganizationId = (url: string, newId: string): string => {
  return url.replace(/\/organization\/([^/]+)\//, `/organization/${newId}/`);
};

/**
 * Replaces the organization ID in the given URL with the desired value.
 *
 * @param {string} url - The original URL containing the organization ID.
 * @param {string} newId - The new organization ID to replace with.
 * @returns {string} - The updated URL with the new organization ID.
 */
export const replaceStoreId = (url: string, newId: string): string => {
  return url.replace(/\/store\/([^/]+)\//, `/store/${newId}/`);
};
