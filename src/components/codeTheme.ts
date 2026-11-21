import { createCssVariablesTheme } from "shiki/core";

// token colours come from CSS variables (--code-*), so code takes the page's
// palette instead of a theme's
export const codeTheme = createCssVariablesTheme({
  name: "site",
  variablePrefix: "--code-",
  fontStyle: true,
});
