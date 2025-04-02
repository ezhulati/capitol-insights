/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#80c9fb',
          400: '#40aaf7',
          500: '#1a8df0',
          600: '#086ece',
          700: '#0756a7',
          800: '#084988',
          900: '#0a3d72',
          950: '#072649',
        },
        secondary: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9df',
          300: '#b8b9c4',
          400: '#9294a5',
          500: '#75768a',
          600: '#5f6073',
          700: '#4d4e5e',
          800: '#42434f',
          900: '#25262e',
          950: '#1a1a21',
        },
        navy: {
          50: '#f0f5fa',
          100: '#e0ebf5',
          200: '#c1d7eb',
          300: '#92bad9',
          400: '#6096c3',
          500: '#4078ab',
          600: '#2d5f91',
          700: '#244c76',
          800: '#1d3d5e',
          900: '#0F2539', // Brand primary navy - slightly adjusted for better contrast
          950: '#0A1E30', // Adjusted for better contrast with white text in footer
        },
        gold: {
          50: '#ffffff', // Changed to pure white for better contrast with gold text
          100: '#faf8e8', // Lightened for better contrast with gold text
          200: '#f9e9a9',
          300: '#f5d872',
          400: '#f0c742',
          500: '#F0C030', // Lightened for better contrast
          600: '#D9A800', // Brand primary gold - lightened for better contrast with navy text
          700: '#BE9000', // Brand deep gold - lightened for better contrast
          800: '#925400',
          900: '#784504',
          950: '#432204',
        },
        slate: {
          50: '#f4f6f9',
          100: '#e2e7ee',
          200: '#cad1df',
          300: '#a6b2c7',
          400: '#7c8daa',
          500: '#455575', // Further darkened for better contrast
          600: '#4f5d7a',
          700: '#415067',
          800: '#334E68', // Brand slate
          900: '#2d364c',
          950: '#1c2230',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        display: ['Georgia', 'Times', 'Times New Roman', 'serif'],
        accent: ['Georgia', 'Times', 'Times New Roman', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            h1: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '700',
              lineHeight: '1.2',
            },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '600',
              lineHeight: '1.25',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '600',
              lineHeight: '1.3',
            },
            h4: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '600',
              lineHeight: '1.4',
            },
            h5: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '600',
            },
            h6: {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.navy.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.gold.600'),
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'color 150ms ease',
              '&:hover': {
                color: theme('colors.gold.700'),
              },
            },
            strong: {
              color: theme('colors.navy.800'),
              fontWeight: '600',
            },
            ol: {
              li: {
                '&:before': { color: theme('colors.gold.600') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gold.500') },
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.gold.300'),
              color: theme('colors.navy.700'),
              fontStyle: 'italic',
            },
            code: {
              color: theme('colors.navy.700'),
              backgroundColor: theme('colors.slate.100'),
              borderRadius: theme('borderRadius.DEFAULT'),
              fontWeight: '400',
              padding: theme('spacing[0.5]') + ' ' + theme('spacing.1'),
            },
            pre: {
              backgroundColor: theme('colors.navy.50'),
              color: theme('colors.navy.900'),
              borderRadius: theme('borderRadius.lg'),
            },
          },
        },
      }),
      backgroundImage: {
        'texture': "url('/images/texture-background.webp')",
        'capitol': "url('/images/capitol-background.webp')",
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'smooth': '0 10px 30px -3px rgba(7, 38, 73, 0.1), 0 4px 6px -2px rgba(7, 38, 73, 0.05)',
        'card': '0 2px 15px rgba(7, 38, 73, 0.05), 0 0 1px rgba(7, 38, 73, 0.1)',
        'elevated': '0 20px 25px -5px rgba(7, 38, 73, 0.07), 0 10px 10px -5px rgba(7, 38, 73, 0.04)',
        'inner-glow': 'inset 0 1px 3px 0 rgba(7, 38, 73, 0.08)',
      },
      borderWidth: {
        '3': '3px',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      backdropBlur: {
        xs: '2px',
      },
      lineHeight: {
        'extra-tight': '1.15',
      },
      letterSpacing: {
        'tightest': '-.075em',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
