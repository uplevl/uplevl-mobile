const config = {
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  printWidth: 120,
  importOrderSeparation: true,
  importOrder: [
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "^@/assets(.*)$",
    "^@/(constants|hooks|lib)(.*)$",
    "^@/contexts/(.*)$",
    "^@/components(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default config;
