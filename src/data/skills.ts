import type { Category } from "../components/SkillsMatrix.astro"

export const skills: Category[] = [
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
    segment: "leadership",
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
    segment: "delivery",
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
    segment: "leadership",
  },
  {
    label: "Backend & Languages",
    skills: ["Ruby on Rails", "Ruby", "TypeScript", "GraphQL", "Sidekiq"],
    segment: "delivery",
  },
  {
    label: "Databases & Storage",
    skills: ["PostgreSQL", "Redis", "S3", "PostGIS"],
    segment: "delivery",
  },
  {
    label: "Frontend & UI",
    skills: ["React", "Vue.js", "Angular", "Astro.js", "Progressive Enhancement", "Accessibility (a11y)"],
    segment: "delivery",
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
    segment: "delivery",
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
    segment: "delivery",
  },
]
