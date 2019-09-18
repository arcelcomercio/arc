import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export default ({ getImageDeployment }) => {
  return createMuiTheme({
    themeName: 'gestion',
    palette: {
      primary: {
        main: '#8f071f',
        light: '#f4e0d2',
        dark: 'rgb(100, 4, 21)',
        contrastText: '#f4f4f4',
      },
      secondary: {
        main: '#000000',
        light: '#444444',
        contrastText: '#f4f4f4',
      },
      terciary: {
        main: '#e05e2f',
      },
      common: { black: '#000', white: '#fff' },
      success: {
        main: '#22810b',
        light: 'rgba(34, 129, 11, 0.1)',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A700: '#616161',
        A100: '#d5d5d5',
        A400: '#303030',
        A200: '#aaaaaa',
      },
    },
    // prettier-ignore
    images: {
      icon:           getImageDeployment('favicon.png'),
      apple_icon:     getImageDeployment('apple-touch-icon.png'),
      apple_icon_76:  getImageDeployment('apple-touch-icon-76x76.png'),
      apple_icon_120: getImageDeployment('apple-touch-icon-120x120.png'),
      apple_icon_144: getImageDeployment('apple-touch-icon-144x144.png'),
      apple_icon_152: getImageDeployment('apple-touch-icon-152x152.png'),
      apple_icon_180: getImageDeployment('apple-touch-icon-180x180.png'),
      logo:           getImageDeployment('logo.svg'),
      lector:         getImageDeployment('img_lector.png'),
      corporativo:    getImageDeployment('img_corporativo.webp'),
      confirmation:   getImageDeployment('img_confirmation.jpg'),
      confirmation_webp: getImageDeployment('img_confirmation_1.webp'),
      support:        getImageDeployment('img_soporte.png'),
      contact_form_left: getImageDeployment('img_soporte.png'),
      support_webp:   getImageDeployment('img_soporte.webp'),
      backgroundx1:   getImageDeployment('bg_planes_10.jpg'),
      check:          getImageDeployment('check2.png'),
    },
    icon: {
      logo: 'ges_logo',
      logo_full: 'ges_logo_full',
    },
  })
}
