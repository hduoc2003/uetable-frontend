import type { Config } from 'tailwindcss'
import { THEME } from './styles/theme'
import { MAIN_FONT } from './styles/fonts'
import { NAVBAR_STYLE } from './styles/navBar'

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
        'nav-curve': 'url("../public/images/curve-nav.svg")'
      },
      colors: {
        primary: THEME.PRIMARY_COLOR,
        "dark-primary": THEME.DARK_PRIMARY_COLOR,
        "light-primary": THEME.LIGHT_PRIMARY_COLOR,
        secondary: THEME.SECONDARY_COLOR,
        "royal-gray": THEME.ROYAL_GRAY_COLOR,
        'table-border': THEME.TABLE_BORDER_COLOR,
        'danger': THEME.DANGER_COLOR,
        'underground': THEME.UNDERGROUND_COLOR,
        'contrast': THEME.SECONDARY_CONTRAST_COLOR,
        'nav-highlight': NAVBAR_STYLE.ITEM_HIGHLIGHT_COLOR,
        'nav-selected-bg': NAVBAR_STYLE.ITEM_SELECTED_BACKGROUND_COLOR,
        'clickable': THEME.CLICKABLE_COLOR,
        'inherit': 'inherit'
      },
      fontSize: {
        'fs-inherit': 'inherit'
      },
      borderRadius: {
        'layout-el': THEME.LAYOUT_ELEMENT_BORDER_RADIUS
      },
      spacing: {
        'layout-el': THEME.LAYOUT_ELEMENT_SPACE,
        'body-pd': THEME.BODY_PADDING
      },
      keyframes: {
        blink: {
          '0%': {
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        }
      },
      animation: {
        blink: 'blink 1s linear 2'
      }
    },
  },
  plugins: [],
}
export default config
