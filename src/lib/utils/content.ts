import type * as React from "react"

export const splitReactNodes = (elements: React.ReactNode[]) => {
  const splitIndex = Math.ceil(elements.length / 2)
  return {
    firstContent: elements.slice(0, splitIndex),
    secondContent: elements.slice(splitIndex),
  }
}
