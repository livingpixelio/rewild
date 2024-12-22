import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "hsl(273.33, 9.89%, 17.84%)",
        primary: "hsl(163.37, 40.89%, 48.43%)",
        secondary: "hsl(334.29, 32.71%, 20.98%)",
        success: "hsl(86.47, 44.74%, 55.29%)",
        info: "hsl(249.3, 34.3%, 40.59%)",
      },
      fontFamily: {
        sans: ["B612", "sans-serif"],
      },
    },
  },
} satisfies Config;
