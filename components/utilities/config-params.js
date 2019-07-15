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
}

export const sizeImg = () => {
  return {
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
