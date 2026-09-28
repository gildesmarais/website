export type Category = {
  label: string
  skills: readonly string[]
}

export const skills = [
  {
    label: "Agent-Driven Engineering",
    skills: [
      "Agent skills & rules authoring",
      "MCP server design",
      "Agentic SDLC (triage → review → release)",
      "Prompt & spec compilation",
      "AI-assisted code review",
    ],
  },
  {
    label: "Systems & Architecture",
    skills: [
      "System Architecture",
      "API Design (OpenAPI)",
      "Legacy System Modernization",
      "Business Process Analysis & Optimization",
      "Observability Strategy",
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
    skills: [
      "Security Reviews",
      "Risk Assessment",
      "ISO/IEC 27001",
      "C5",
      "GDPR Compliance",
      "Trusted Publishing (supply chain)",
    ],
  },
] as const satisfies readonly Category[]
