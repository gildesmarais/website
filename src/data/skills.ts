export type Category = {
  label: string
  skills: readonly string[]
}

export const skills = [
  {
    label: "Leadership & Process",
    skills: [
      "System Architecture",
      "Mentoring / Team Lead",
      "API Design (OpenAPI)",
      "Business Process Analysis & Optimization",
      "Requirements Gathering",
      "Process Modeling",
      "Technical & Business Documentation",
      "Legacy System Modernization",
      "SEO",
    ],
  },
  {
    label: "Infrastructure & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Terraform",
      "CI/CD (GitHub Actions)",
      "Ansible",
      "AWS Lambda",
      "nginx",
      "AWS Elemental MediaConvert",
      "AWS Cognito",
      "ffmpeg",
    ],
  },
  {
    label: "Security & Compliance",
    skills: [
      "Security Reviews",
      "Security Auditing",
      "ISO/IEC 27001 (requirements, collaboration with Security / QA)",
      "GDPR Compliance",
      "Risk Assessment",
    ],
  },
  {
    label: "Backend & Languages",
    skills: ["Ruby on Rails", "Ruby", "TypeScript", "GraphQL", "Sidekiq"],
  },
  {
    label: "Databases & Storage",
    skills: ["PostgreSQL", "Redis", "S3", "PostGIS"],
  },
  {
    label: "Frontend & UI",
    skills: ["React", "Vue.js", "Angular", "Astro.js", "Progressive Enhancement", "Accessibility (a11y)"],
  },
  {
    label: "Testing & Quality",
    skills: [
      "Test-Driven Development (TDD)",
      "RSpec",
      "Jest",
      "Cypress",
      "Selenium & Capybara",
      "Performance Optimization",
    ],
  },
  {
    label: "Monitoring & Observability",
    skills: [
      "Datadog",
      "Sentry.io",
      "Observability Strategy",
      "CDN & Edge Optimization",
      "Cloudflare Workers",
      "UptimeRobot",
    ],
  },
] as const satisfies readonly Category[]
