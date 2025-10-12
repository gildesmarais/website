# Project Brief - Portfolio Website Resume UX Improvement

## Current Work

Improving the UX of the resume page (src/pages/resume.astro) because it is too long to scroll.

## Goals

- Minimal, fast, professional presence
- Pages must work without JavaScript (progressive enhancement)
- Accessible (a11y) by design
- Use modern HTML with a lightweight custom design system
- Low maintenance and evergreen content
- Target audience: tech professionals, recruiters, general public

## Current Resume Page

- Long, detailed resume with multiple sections: Experience, Service, Skills, Case Study, Education
- Uses semantic HTML, <details> for collapsible tech stacks
- No table of contents or section-level collapsibles

## Proposed UX Improvements

- Add a Table of Contents with anchor links to main sections for quick navigation
- Wrap major sections (Experience, Service, Education) in <details> for collapsible content
- Possibly group older experience entries under collapsible containers
- Maintain accessibility and minimal design
- Ensure skip links and focus styles remain effective

## Next Steps

- Implement TOC at top of resume page
- Add <details> wrappers for major sections
- Test accessibility and no-JS behavior
- Review and refine styling to keep minimal and professional look
