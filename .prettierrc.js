module.exports = {
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "singleQuote": true,
  "semi": true,
  "arrowParens": "avoid",
  "bracketSameLine": true,
  "printWidth": 100,
  "importOrder": [
    "^(express|react)(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@lunaticenslaved(.*)$",
    "^#/(.*)$",
    "^../(.*)$",
    "^./(.*)$"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
