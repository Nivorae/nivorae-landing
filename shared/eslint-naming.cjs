/**
 * Shared naming convention ESLint rules.
 *
 * Consumed by frontend, backend, and shared .eslintrc.cjs files.
 * Spread into the `rules` object: `...require("../shared/eslint-naming.cjs")`
 */
module.exports = {
  "@typescript-eslint/naming-convention": [
    "error",
    // Default: camelCase for everything
    { selector: "default", format: ["camelCase"] },

    // Variables: camelCase + UPPER_CASE (constants) + PascalCase (React components)
    { selector: "variable", format: ["camelCase", "UPPER_CASE", "PascalCase"] },

    // Functions: camelCase + PascalCase (React components)
    { selector: "function", format: ["camelCase", "PascalCase"] },

    // Parameters: camelCase, allow leading underscore
    {
      selector: "parameter",
      format: ["camelCase"],
      leadingUnderscore: "allow",
    },

    // Types, interfaces, enums, classes: PascalCase
    { selector: "typeLike", format: ["PascalCase"] },

    // Enum members: PascalCase or UPPER_CASE (both common conventions)
    { selector: "enumMember", format: ["PascalCase", "UPPER_CASE"] },

    // Readonly class properties: allow UPPER_CASE for class-level constants
    {
      selector: "classProperty",
      modifiers: ["readonly"],
      format: ["camelCase", "UPPER_CASE"],
    },

    // Allow any format for destructured variables (external API shapes)
    { selector: "variable", modifiers: ["destructured"], format: null },

    // Object/type properties and methods: no enforcement (third-party shapes)
    { selector: "objectLiteralProperty", format: null },
    { selector: "objectLiteralMethod", format: null },
    { selector: "typeProperty", format: null },
    { selector: "typeMethod", format: null },

    // Allow any format for quoted properties
    {
      selector: "objectLiteralProperty",
      modifiers: ["requiresQuotes"],
      format: null,
    },

    // Imports: allow any (can't control what libraries export)
    { selector: "import", format: null },
  ],
};
