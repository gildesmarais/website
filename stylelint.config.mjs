/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  customSyntax: "postcss-html",
  defaultSeverity: "error",
  rules: {
    "color-no-hex": true,
    "declaration-property-value-disallowed-list": {
      "/.*/": [
        "/rgba?\\(\\s*255[\\s,]+136[\\s,]+0/",
        "/hsla?\\(\\s*32(?:deg)?[\\s,]+100%[\\s,]+50%/",
        "/#ff8800/i",
        "/#fff4de/i",
      ],
    },
    "no-descending-specificity": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "property-no-vendor-prefix": true,
    "property-no-deprecated": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-property-value-keyword-no-deprecated": true,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["open"],
      },
    ],
  },
  overrides: [
    {
      files: ["src/styles/partials/01-tokens.css"],
      customSyntax: "postcss",
      rules: {
        "color-no-hex": null,
        "declaration-property-value-disallowed-list": null,
      },
    },
    {
      files: ["**/*.css"],
      customSyntax: "postcss",
    },
    // Safari < 18 still requires -webkit-backdrop-filter alongside backdrop-filter.
    {
      files: [
        "src/styles/partials/05-content.css",
        "src/components/MovieFilters.astro",
        "src/pages/movies/*.astro",
      ],
      rules: {
        "property-no-vendor-prefix": [
          true,
          {
            ignoreProperties: ["-webkit-backdrop-filter"],
          },
        ],
      },
    },
    // WebKit/Blink still need -webkit-background-clip for background-clip: text.
    {
      files: ["src/components/Navigation.astro"],
      rules: {
        "property-no-vendor-prefix": [
          true,
          {
            ignoreProperties: ["-webkit-background-clip"],
          },
        ],
      },
    },
  ],
}
