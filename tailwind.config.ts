import type { Config } from 'tailwindcss'
import { THEME } from './styles/theme'
import { MAIN_FONT } from './styles/fonts'

const config: Config = {
  // mode: 'jit',
  // purge: [
  //   './public/**/*.html',
  //   './**/*.{js,jsx,ts,tsx,vue}',
  // ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: THEME.PRIMARY_COLOR,
        "dark-primary": THEME.DARK_PRIMARY_COLOR,
        "light-primary": THEME.LIGHT_PRIMARY_COLOR,
        secondary: THEME.SECONDARY_COLOR,
        "royal-gray": THEME.ROYAL_GRAY_COLOR,
        'table-border': THEME.TABLE_BORDER_COLOR,
        'danger': THEME.DANGER_COLOR
      },
      fontSize: {
        'fs-inherit': 'inherit'
      }
    },
  },
  plugins: [],
}
export default config
