module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      'smoke-darkest': 'rgba(0, 0, 0, 0.9)',
      'smoke-darker': 'rgba(0, 0, 0, 0.75)',
      'smoke-dark': 'rgba(0, 0, 0, 0.6)',
      smoke: 'rgba(0, 0, 0, 0.5)',
      'smoke-light': 'rgba(0, 0, 0, 0.4)',
      'smoke-lighter': 'rgba(0, 0, 0, 0.25)',
      'smoke-lightest': 'rgba(0, 0, 0, 0.1)',
      transparent: 'transparent',
      black: '#000',
      'black-800': '#2D3748',
      'black-900': '#1A202C',
      white: '#fff',

      gray: {
        100: '#F7FAFC',
        200: '#EDF2F7',
        300: '#E2E8F0',
        400: '#CBD5E0',
        500: '#A0AEC0',
        600: '#718096',
        700: '#4A5568',
        800: '#2D3748',
        900: '#1A202C',
        1000: '#f1f3f5',
        'primary': '#f1f3f5',
      },
      red: {
        100: '#fff5f5',
        200: '#fed7d7',
        300: '#feb2b2',
        400: '#fc8181',
        500: '#FE0040',
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a',
      },
      orange: {
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e',
      },
      yellow: {
        100: '#fffff0',
        200: '#fefcbf',
        300: '#faf089',
        400: '#f6e05e',
        500: '#FFC300',
        600: '#d69e2e',
        700: '#b7791f',
        800: '#975a16',
        900: '#744210',
      },
      green: {
        100: '#f0fff4',
        200: '#c6f6d5',
        300: '#9AE6B4',
        400: '#68d391',
        500: '#49B900',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
        900: '#22543d',
      },
      teal: {
        100: '#e6fffa',
        200: '#b2f5ea',
        300: '#81e6d9',
        400: '#4fd1c5',
        500: '#38b2ac',
        600: '#319795',
        700: '#2c7a7b',
        800: '#285e61',
        900: '#234e52',
      },
      blue: {
        100: '#041e41',
        200: '#041e41',
        300: '#1b163c',
        400: '#21274e',
        500: '#0000fa',
        600: '#aabdc4',
        700: '#bbcdcd',
        800: '#4c6cff',
        900: '#4c6cff',
      },
      indigo: {
        100: '#ebf4ff',
        200: '#c3dafe',
        300: '#a3bffa',
        400: '#7f9cf5',
        500: '#667eea',
        600: '#5a67d8',
        700: '#4c51bf',
        800: '#434190',
        900: '#3c366b',
      },
      purple: {
        100: '#faf5ff',
        200: '#e9d8fd',
        300: '#d6bcfa',
        400: '#b794f4',
        500: '#8A00FA',
        600: '#805ad5',
        700: '#6b46c1',
        800: '#553c9a',
        900: '#44337a',
      },
      pink: {
        100: '#fff5f7',
        200: '#fed7e2',
        300: '#fbb6ce',
        400: '#f687b3',
        500: '#ed64a6',
        600: '#d53f8c',
        700: '#b83280',
        800: '#97266d',
        900: '#702459',
      },
    },
    spacing: {
      px: '1px',
      '0': '0',
      '0.5': '0.15rem',
      '-0.5': '-0.15rem',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
    },
    backgroundColor: theme => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '110%': '110%',
      '103p': '103p'
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
      'transparent': 'transparent',
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      lg: '0.5rem',
      full: '9999px',
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
      '10': '10px',
      '15': '15px',
      '16': '16px',
    },
    boxShadow: {
      default:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      '1': '1 1 0%',
      '5': '5 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      '0': '0',
      default: '1',
    },
    flexShrink: {
      '0': '0',
      default: '1',
    },
    fontFamily: {
      sans: [
        'Hind',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      body: [
        'Hind',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      heading: [
        'Montserrat',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'Hind',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      smBase: '0.95rem',
      base: '1rem',
      baseLg: '1.075rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '8.5xl': '6.5rem',
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      '8vh': '8vh',
      '92vh': '92vh',
      '35em': '35em',
      '40em': '40em',
      '95vh': '95vh',
      '5rem': '5rem',
      '80p': '80%',
      '70p': '70%',
      '60p': '60%',
      '50p': '50%',
      '40p': '40%',
      '30p': '30%',
      '20p': '20%',
    }),
    inset: {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      'full': '100%',
      auto: 'auto',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      '7': '1.75rem', 
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh',
      5: '5em',
      '40em': '40em',
      '4rem': '4rem',
    },
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '26': '26rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
      '50ch': '50ch',
      '120rem': '120rem',
      'screen-md': '768px',
      'screen-lg': '1024px',
      '1000': '1000px',
      '1170': '1170px',
      '80' : '20rem',
    },
    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh',
      '24': '6rem'
    },
    minWidth: {
      '0': '0',
      full: '100%',
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '60': '0.6',
      '75': '0.75',
      '100': '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    padding: theme => theme('spacing'),
    stroke: {
      current: 'currentColor',
    },
    textColor: theme => theme('colors'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '5/10': '15%',
      '1/6': '16.66667%',
      '2/6': '33.33333%',
      '8/25': '32%',
      '12/25': '48.6%',
      '3/6': '50%',
      '4/6': '66.66667%',
      '5/6': '83.33333%',
      '1/7': '14.285%',
      '2/7': '28.571%',
      '3/7': '42.857%',
      '4/7': '57.143%',
      '5/7': '71.429%',
      '6/7': '85.714%',
      '1/12': '8.33333%',
      '2/12': '16.66667%',
      '3/12': '25%',
      '4/12': '33.33333%',
      '5/12': '41.66667%',
      '6/12': '50%',
      '7/12': '58.33333%',
      '8/12': '66.66667%',
      '9/12': '75%',
      '10/12': '83.33333%',
      '11/12': '91.66667%',
      '45/100': '45%',
      '46/100': '46%',
      '47/100': '47%',
      '48/100': '48%',
      full: '100%',
      screen: '100vw',
      fit_cont: 'fit-content',
      '1140': '1140px',
      '6rem': '6rem',
      '7rem': '7rem',
      '30p': '30%',
      '20p': '20%',
      '60%': '60%',

    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '60': '60',
      '150': '150',
      '1000': '1000',
      '99999': '99999',
    },
    scale: {
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.90',
      95: '.95',
      100: '1',
      110: '1.1'
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'odd'],
    alignContent: ['responsive', 'odd'],
    alignItems: ['responsive', 'odd'],
    alignSelf: ['responsive', 'odd'],
    appearance: ['responsive', 'odd'],
    backgroundAttachment: ['responsive', 'odd'],
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'odd'],
    backgroundPosition: ['responsive', 'odd'],
    backgroundRepeat: ['responsive', 'odd'],
    backgroundSize: ['responsive', 'odd'],
    borderCollapse: ['responsive', 'odd'],
    borderColor: ['responsive', 'hover', 'focus', 'odd'],
    borderRadius: ['responsive', 'odd'],
    borderStyle: ['responsive', 'odd'],
    borderWidth: ['responsive', 'odd'],
    boxShadow: ['responsive', 'hover', 'focus', 'odd'],
    cursor: ['responsive', 'odd'],
    display: ['responsive', 'odd'],
    fill: ['responsive', 'odd'],
    flex: ['responsive', 'odd'],
    flexDirection: ['responsive', 'odd'],
    flexGrow: ['responsive', 'odd'],
    flexShrink: ['responsive', 'odd'],
    flexWrap: ['responsive', 'odd'],
    float: ['responsive', 'odd'],
    fontFamily: ['responsive', 'odd'],
    fontSize: ['responsive', 'odd'],
    fontSmoothing: ['responsive', 'odd'],
    fontStyle: ['responsive', 'odd'],
    fontWeight: ['responsive', 'hover', 'focus', 'odd'],
    height: ['responsive', 'odd'],
    inset: ['responsive', 'odd'],
    justifyContent: ['responsive', 'odd'],
    letterSpacing: ['responsive', 'odd'],
    lineHeight: ['responsive', 'odd'],
    listStylePosition: ['responsive', 'odd'],
    listStyleType: ['responsive', 'odd'],
    margin: ['responsive', 'odd'],
    maxHeight: ['responsive', 'odd'],
    maxWidth: ['responsive', 'odd'],
    minHeight: ['responsive', 'odd'],
    minWidth: ['responsive', 'odd'],
    objectFit: ['responsive', 'odd'],
    objectPosition: ['responsive', 'odd'],
    opacity: ['responsive', 'odd', 'hover'],
    order: ['responsive', 'odd'],
    outline: ['responsive', 'focus', 'odd'],
    overflow: ['responsive', 'odd'],
    padding: ['responsive', 'odd'],
    pointerEvents: ['responsive', 'odd'],
    position: ['responsive', 'odd'],
    resize: ['responsive', 'odd'],
    stroke: ['responsive', 'odd'],
    tableLayout: ['responsive', 'odd'],
    textAlign: ['responsive', 'odd'],
    textColor: ['responsive', 'hover', 'focus', 'odd'],
    textDecoration: ['responsive', 'hover', 'focus', 'odd'],
    textTransform: ['responsive', 'odd'],
    userSelect: ['responsive', 'odd'],
    verticalAlign: ['responsive', 'odd'],
    visibility: ['responsive', 'odd'],
    whitespace: ['responsive', 'odd'],
    width: ['responsive', 'odd'],
    wordBreak: ['responsive', 'odd'],
    zIndex: ['responsive', 'odd'],
  },
  corePlugins: {},
  plugins: [],
};
