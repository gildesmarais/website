import type { Category } from "../components/SkillsMatrix.astro"

export const skills: Category[] = [
  {
    label: "Core",
    skills: [
      "Ruby",
      "Ruby on Rails",
      "Sidekiq",
      "Redis",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "GraphQL",
      "Docker",
      "AWS",
      "CI/CD (GitHub Actions)",
      "Testing (RSpec, Jest)",
      "Monitoring / Observability",
    ],
  },
  {
    label: "Frontend",
    skills: ["Astro", "HTML5", "React", "Nuxt.js", "Vue.js", "Angular", "SCSS"],
  },
  {
    label: "Data & Infrastructure",
    skills: ["PostGIS", "Elasticsearch", "nginx", "Ansible", "Puppet", "AWS Lambda", "RabbitMQ"],
  },
  {
    label: "Practices",
    skills: [
      "Architecture",
      "Test-Driven Development (TDD)",
      "Agile / Scrum",
      "Process Optimization",
      "Legacy Application Rescue & Maintainability",
      "SEO",
      "Documentation",
      "Mentoring / Team Lead",
    ],
  },
  {
    label: "Compliance",
    skills: ["ISO/IEC 27001 (requirements, collaboration with Security / QA)"],
  },
  {
    label: "Tooling",
    skills: ["Git / GitHub", "Datadog", "Sentry.io", "Cypress", "Selenium & Capybara", "UptimeRobot"],
  },
]
