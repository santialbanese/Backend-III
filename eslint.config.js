import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // Define las opciones del entorno
  {
    languageOptions: {
      globals: globals.browser,  // Para entornos de navegador
      ecmaVersion: "latest",     // Define la versión de ECMAScript
      sourceType: "module",      // Si usas módulos ES6
    },
    rules: {
      // Aquí puedes añadir más reglas si lo necesitas
      "semi": ["error", "always"],      // Requiere punto y coma al final de las líneas
      "quotes": ["error", "double"],    // Usa comillas dobles
    },
  },
  pluginJs.configs.recommended,
];
