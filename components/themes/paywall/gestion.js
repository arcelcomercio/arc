export default ({
  colors: { red, grey, lightBlue },
  createTheme,
  fusionContext,
  getImageDeployment,
}) => {
  const { arcSite } = fusionContext
  return createTheme({
    name: arcSite,
    palette: {
      background: { default: grey[200] },
      divider: grey[600],
      primary: {
        main: '#8f071f',
        light: red[400],
        contrastText: '#f4f4f4',
      },
      secondary: {
        main: lightBlue[800],
      },
      terciary: {
        main: '#000',
        light: grey[700],
        contrastText: grey[100],
      },
      common: { black: '#000', blackboard: grey[700], white: '#fff' },
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
      action: {
        disabledBackground: grey[100],
      },
    },
    breakpoints: {
      values: { xs: 0, sm: 640, md: 1024, lg: 1280, xl: 1920 },
    },
    typography: {
      fontWeightHeavy: 700,
    },
    // prettier-ignore
    images: {
      pixel:          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      icon:              getImageDeployment('favicon.png'),
      apple_icon:        getImageDeployment('apple-touch-icon.png'),
      apple_icon_76:     getImageDeployment('apple-touch-icon-76x76.png'),
      apple_icon_120:    getImageDeployment('apple-touch-icon-120x120.png'),
      apple_icon_144:    getImageDeployment('apple-touch-icon-144x144.png'),
      apple_icon_152:    getImageDeployment('apple-touch-icon-152x152.png'),
      apple_icon_180:    getImageDeployment('apple-touch-icon-180x180.png'),
      lector_png:        getImageDeployment('img_lector.png'),
      corporativo_webp:  getImageDeployment('img_corporativo.webp'),
      corporativo_png:   getImageDeployment('img_corporativo.png'),
      confirmation_jpg:  getImageDeployment('img_confirmation.jpg'),
      confirmation_webp: getImageDeployment('img_confirmation_1.webp'),
      support:           getImageDeployment('img_soporte.png'),
      contact_form_left: getImageDeployment('img_soporte.png'),
      support_webp:      getImageDeployment('img_soporte.webp'),
      backgroundx1:      getImageDeployment('bg_planes_10.jpg'),
      check:             getImageDeployment('check2.png'),
    },
    icon: {
      logo: 'ges_logo',
      logo_full: 'ges_logo_full',
      loading: 'ges_loading',
      arrowRight: 'arrowRight',
    },
  })
}
