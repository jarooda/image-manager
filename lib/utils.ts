import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageToRange(page: number, itemsPerPage: number = 10) {
  const offset = (page - 1) * itemsPerPage
  return [offset, offset + itemsPerPage - 1]
}

export function objectToQueryString(obj: Record<string, any>) {
  return new URLSearchParams(obj).toString()
}