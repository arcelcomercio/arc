import React from 'react'

const Fonts = () => {
  return (
    <style>
      {`
    @font-face {
      font-family: "Encode Sans Condensed";
      font-weight: 600;
      font-style: normal;
      font-display: swap;
      src: local("Encode Sans Condensed"), local("Encode Sans Condensed"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-600.woff2") format("woff2"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-600.woff") format("woff");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
    }
    
    @font-face {
      font-family: "Encode Sans Condensed";
      font-weight: 700;
      font-style: normal;
      font-display: swap;
      src: local("Encode Sans Condensed"), local("Encode Sans Condensed"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-700.woff2") format("woff2"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-700.woff") format("woff");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
    }
    
    @font-face {
      font-family: "Encode Sans Condensed";
      font-weight: 800;
      font-style: normal;
      font-display: swap;
      src: local("Encode Sans Condensed"), local("Encode Sans Condensed"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-800.woff2") format("woff2"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/encode-sans-condensed-v5-latin-800.woff") format("woff");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
    }
    
    @font-face {
      font-family: "Helvetica";
      font-weight: 700;
      font-style: normal;
      font-display: swap;
      src: local("Helvetica"), local("Helvetica"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/Helvetica-Bold.woff2") format("woff2"),
        url("https://cdna.trome.pe/resources/dist/trome/fonts/Helvetica-Bold.woff") format("woff");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
        U+FEFF, U+FFFD;
    }
    `}
    </style>
  )
}

export default Fonts
