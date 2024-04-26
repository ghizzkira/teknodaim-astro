export function santizeCharacter(item: string) {
  return item.replace(/"/g, "'")
}
