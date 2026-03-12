const uniqueTokens = (value: string) =>
  Array.from(
    new Set(
      value
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean),
    ),
  )

export const externalRel = (rel = "") => {
  return uniqueTokens(`${rel} noopener noreferrer`).join(" ")
}
