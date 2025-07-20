export default [
  {
    files: ["frontend/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly"
      }
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
]; 