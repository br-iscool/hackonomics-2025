import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        success: "oklch(67.047% 0.22276 143.238)",
        warning: "oklch(83.468% 0.17124 82.477)",
        error: "oklch(57.7% 0.245 27.325)",
        info: "oklch(75.402% 0.00009 271.152)",
      },
    },
  },
};

export default config;
