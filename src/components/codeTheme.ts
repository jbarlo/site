import { createCssVariablesTheme } from "shiki/core";

export const codeTheme = createCssVariablesTheme({
  name: "site",
  variablePrefix: "--code-",
  fontStyle: true,
});
