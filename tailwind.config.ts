import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#5E6F3D",
          hover: "#4D5D32",
          light: "#EEF2E6",
        },
        sage: {
          DEFAULT: "#7A8C53",
          light: "#F0F4E8",
        },
        canvas: "#FAF9F5",
        sandstone: {
          DEFAULT: "#EFEAE1",
          hover: "#E8E2D7",
        },
        oatmeal: "#E2DBD0",
        charcoal: {
          DEFAULT: "#1F201D",
          light: "#343632",
        },
        "muted-clay": "#6E6D68",
        cat: {
          electronics: "#D9E2EC",
          fashion: "#F3D8D7",
          home: "#EEDBBF",
          beauty: "#E0DBEC",
          sports: "#D4E7DC",
          accessories: "#F7DEC8",
          textbooks: "#E2E8F0",
          hostel: "#FEF08A",
        },
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        heading: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        playful: ["var(--font-playful)", "Caveat", "cursive"],
        script: ["'Covered By Your Grace'", "cursive"],
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(31, 32, 29, 0.04)",
        card: "0 4px 14px rgba(31, 32, 29, 0.06)",
        float: "0 10px 25px -5px rgba(31, 32, 29, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
