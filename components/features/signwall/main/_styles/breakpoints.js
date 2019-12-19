const size = {
    mobile: '639px',
    tablet: '640px',
    desktop: '1024px',
    tv: '1400px',
  }
  
  // eslint-disable-next-line import/prefer-default-export
  export const device = {
    mobile: `screen and (max-width: ${size.mobile})`,
    tablet: `screen and (min-width: ${size.tablet})`,
    desktop: `screen and (min-width: ${size.desktop})`,
    tv: `screen and (min-width: ${size.tv})`,
  }