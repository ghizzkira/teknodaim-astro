import type * as React from "react"

export const splitReactNodes = (elements: React.ReactNode[]) => {
  const splitIndex = Math.ceil(elements.length / 2)
  return {
    firstContent: elements.slice(0, splitIndex),
    secondContent: elements.slice(splitIndex),
  }
}

export const trimText = (text: string, maxLength: number): string => {
  const strippedText = text.replace(/(<([^>]+)>)/gi, "")

  if (strippedText.length <= maxLength) {
    return strippedText
  }

  return strippedText.substring(0, maxLength)
}
