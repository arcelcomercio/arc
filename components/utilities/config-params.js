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

  static ELEMENT_TEXT = 'text'

  static ELEMENT_BLOCKQUOTE = 'blockquote'

  static ELEMENT_TYPE_CHARBEAT = 'Articulo Nota Simple'

  static COMSCORE_ID = '8429002'

  static OPTA_WIDGET = 'https://assets.trome.pe/opta'

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
}

export const sizeImg = () => {
  return {
    // landscape
    landscape_xl: {
      width: 900,
      height: 528,
    },
    landscape_l: {
      width: 620,
      height: 374,
    },
    landscape_md: {
      width: 300,
      height: 157,
    },    
    landscape_s: {
      width: 220,
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
      height: 620,
    },
    portrait_md: {
      width: 300,
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

export default ConfigParams
