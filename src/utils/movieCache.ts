import recommendations from "../data/recommendations.json"

let recommendationsCache: { set: Set<string>; notes: Map<string, string> } | null = null

export function getRecommendationsCache(): { set: Set<string>; notes: Map<string, string> } {
  if (!recommendationsCache) {
    recommendationsCache = {
      set: new Set(recommendations.map((r) => r.const).filter(Boolean)),
      notes: new Map(
        recommendations
          .map((r) => [r.const, r.note])
          .filter(([constId, note]) => constId && note)
          .map(([constId, note]) => [constId as string, note as string]),
      ),
    }
  }
  return recommendationsCache!
}
