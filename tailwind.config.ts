import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ube: "#967B8E",
        'bright-ube': "#fff1ff",
        blurple: "#5865F2",
        dischat: "#36393e",
        dispink: "#c9cdfb",
        disdblue: "#4752c4"
      }
    }
  },
  plugins: [
    require('tailwindcss-hero-patterns'),
  ],
}
export default config
