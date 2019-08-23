class ConfigParams {
  static VIDEO = 'basic_video'

  static GALLERY = 'basic_gallery'

  // TIPO DE GALLERRY: NUEVA OPCION DE ELLIPSIS
  static GALLERY_VERTICAL = 'gallery_vertical'

  static HTML = 'basic_html'

  static IMAGE = 'basic'

  static ELEMENT_IMAGE = 'image'

  static ELEMENT_VIDEO = 'video'

  static ELEMENT_GALLERY = 'gallery'

  static ELEMENT_TABLE = 'table'

  static ELEMENT_QUOTE = 'quote'

  static ELEMENT_OEMBED = 'oembed_response'

  static ELEMENT_STORY = 'story'

  static ELEMENT_RAW_HTML = 'raw_html'

  static ELEMENT_INFOGRAFIA = 'infografia'

  static ELEMENT_TEXT = 'text'

  static ELEMENT_BLOCKQUOTE = 'blockquote'

  static ELEMENT_TYPE_CHARBEAT = 'Articulo Nota Simple'

  static COMSCORE_ID = '8429002'

  static OPTA_WIDGET = 'https://assets.trome.pe/opta'

  static ELEMENT_YOUTUBE_ID = 'youtube_id'

  // nombre de los Sitios
  static SITE_PUBLIMETRO = 'publimetro'

  static SITE_GESTION = 'gestion'

  static SITE_DEPOR = 'depor'

  static SITE_ELCOMERCIO = 'elcomercio'

  static SITE_PERU21 = 'peru21'

  static SITE_OJO = 'ojo'

  // opta
  static OPTA_CSS_LINK =
    'https://secure.widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'

  static OPTA_JS_LINK =
    'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js'

  // Image Size
  static IMAGE_ORIGINAL = 'original'

  static LANDSCAPE_XL = 'landscape_xl'

  static LANDSCAPE_L = 'landscape_l'

  static LANDSCAPE_MD = 'landscape_md'

  static LANDSCAPE_S = 'landscape_s'

  static LANDSCAPE_XS = 'landscape_xs'

  static PORTRAIT_XL = 'portrait_xl'

  static PORTRAIT_L = 'portrait_l'

  static PORTRAIT_MD = 'portrait_md'

  static PORTRAIT_S = 'portrait_s'

  static PORTRAIT_XS = 'portrait_xs'

  static SQUARE_XL = 'square_xl'

  static SQUARE_L = 'square_l'

  static SQUARE_MD = 'square_md'

  static SQUARE_S = 'square_s'

  static SQUARE_XS = 'square_xs'

  static LAZY_DEFAULT = 'lazy_default'

  static AUTOR_SOCIAL_NETWORK_TWITTER = 'twitter'
}

export const sizeImg = () => {
  return {
    // landscape
    landscape_xl: {
      width: 980,
      height: 528,
    },
    landscape_l: {
      width: 648,
      height: 374,
    },
    landscape_md: {
      width: 314,
      height: 157,
    },
    landscape_s: {
      width: 234,
      height: 161,
    },
    landscape_xs: {
      width: 118,
      height: 72,
    },
    // portrait
    // TODO: actualizar tamaño
    portrait_xl: {
      width: 528,
      height: 900,
    },
    // TODO: actualizar tamaño
    portrait_l: {
      width: 374,
      height: 648,
    },
    portrait_md: {
      width: 314,
      height: 374,
    },
    // TODO: actualizar tamaño
    portrait_s: {
      width: 161,
      height: 220,
    },
    portrait_xs: {
      width: 75,
      height: 90,
    },
    // square
    // TODO: actualizar tamaño a todos
    square_xl: {
      width: 900,
      height: 900,
    },
    square_l: {
      width: 600,
      height: 600,
    },
    square_md: {
      width: 300,
      height: 300,
    },
    square_s: {
      width: 150,
      height: 150,
    },
    square_xs: {
      width: 75,
      height: 75,
    },
    lazy_default: {
      width: 5,
      height: 5,
    },
    // TODO: Eliminar estos tamaños despues de actualizar
    // los tamaños de las imagenes de todos los componentes.
    small: {
      width: 100,
      height: 200,
    },
    medium: {
      width: 480,
    },
    large: {
      width: 940,
      height: 569,
    },
    amp: {
      width: 600,
      height: 375,
    },
  }
}

export const sizeImgNewsLetter = () => {
  return {
    // landscape
    tbmax: {
      width: 648,
      height: 364,
    },
    tbmin: {
      width: 214,
      height: 135,
    },
    tb250x366: {
      width: 250,
      height: 366,
    },
    tb148x83: {
      width: 148,
      height: 83,
    },
    tb210x118: {
      width: 210,
      height: 118,
    },
    tb403x227: {
      width: 403,
      height: 227,
    },

    tb241x136: {
      width: 241,
      height: 136,
    },
    tbgrande: {
      width: 618,
      height: 348,
    },

    tbflujo: {
      width: 290,
      height: 163,
    },
  }
}

export default ConfigParams
