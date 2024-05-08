import * as React from "react"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[]
}

export function cn(...props: ClassValue[]) {
  return twMerge(clsx(props))
}
