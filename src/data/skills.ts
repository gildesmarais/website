export type Category = {
  label: string
  skills: readonly string[]
}

export const skills = [
  {
    label: "Agent-Driven Engineering",
    skills: ["Agent skills & rules authoring", "MCP server design", "Planning, review, and delivery"],
  },
  {
    label: "Systems & Architecture",
    skills: [
      "System Architecture",
      "API Design (OpenAPI)",
      "Legacy System Modernization",
      "Observability Strategy",
      "Audio DSP & MIR",
    ],
  },
  {
    label: "Languages & Runtimes",
    skills: ["Ruby on Rails", "TypeScript", "Rust", "Swift (bindings)", "WebAssembly", "PostgreSQL"],
  },
  {
    label: "Infrastructure & Delivery",
    skills: [
      "Docker",
      "Terraform",
      "CI/CD (GitHub Actions)",
      "AWS (Lambda, Cognito, MediaConvert)",
      "Cloudflare Workers",
      "Datadog & Sentry",
    ],
  },
  {
    label: "Security & Compliance",
    skills: ["Security Reviews", "Risk Assessment", "ISO/IEC 27001", "C5", "GDPR Compliance"],
  },
] as const satisfies readonly Category[]
