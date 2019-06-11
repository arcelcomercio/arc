import StoryData from '@utilities/story-data'

const deployment = () => {}
const contextPath = '/pf'
const arcSite = 'elcomercio'
const defaultImgSize = 'sm'

const data = {
  _id: 'E34AIQYCZRCQBL4DV6KAO4WFMY',
  canonical_url: '/qa/prueba-de-widgets-noticia',
  display_date: '2019-06-07T16:08:20.150Z',
  headlines: { basic: 'Prueba de widgets 1' },
  taxonomy: {
    sites: [
      {
        _id: '/politica',
        type: 'site',
        version: '0.5.8',
        name: 'Política',
        description: 'Descripcion de la sección Politica',
        path: '/politica',
        parent_id: '/',
        additional_properties: {
          original: {
            _id: '/politica',
            site: {
              site_description: 'Descripcion de la sección Politica',
              site_keywords: 'politica1, politica2, politica3, politica4',
            },
            site_topper: {
              site_logo_image:
                'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/HK4POO53WFE3ZCCBAPHFYI2XNA.jpg',
            },
            _admin: {
              alias_ids: [
                '/politica',
                'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
              ],
            },
            navigation: {
              nav_title: '',
            },
            name: 'Política',
            order: 1014,
            parent: '/',
            inactive: false,
            node_type: 'section',
          },
        },
      },
      {
        _id: '/politica/internacional',
        type: 'site',
        version: '0.5.8',
        name: 'Internacional',
        description: null,
        path: '/politica/internacional',
        parent_id: '/politica',
        additional_properties: {
          original: {
            _id: '/politica/internacional',
            site: {
              site_url: 'internacional',
              site_title: 'internacional',
              pagebuilder_path_for_native_apps: null,
              site_tagline: null,
              site_keywords: null,
              site_about: null,
              site_description: null,
            },
            navigation: {
              nav_title: 'internacional',
            },
            site_topper: {
              site_logo_image: null,
            },
            social: {
              instagram: null,
              twitter: null,
              facebook: null,
              rss: null,
            },
            _admin: {
              alias_ids: ['/politica/internacional'],
            },
            name: 'Internacional',
            parent: '/politica',
            ancestors: ['/politica'],
            inactive: false,
          },
        },
      },
    ],
    tags: [
      {
        text: 'avengers',
        description: 'avengers',
        slug: 'avengers',
      },
    ],
    sections: [
      {
        _id: '/politica',
        _website: 'elcomercio',
        type: 'section',
        version: '0.6.0',
        name: 'Política',
        description: 'Descripcion de la sección Politica',
        path: '/politica',
        parent_id: '/',
        parent: {
          default: '/',
        },
        additional_properties: {
          original: {
            _id: '/politica',
            site: {
              site_description: 'Descripcion de la sección Politica',
              site_keywords: 'politica1, politica2, politica3, politica4',
            },
            site_topper: {
              site_logo_image:
                'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/HK4POO53WFE3ZCCBAPHFYI2XNA.jpg',
            },
            _admin: {
              alias_ids: [
                '/politica',
                'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=',
              ],
            },
            navigation: {
              nav_title: '',
            },
            _website: 'elcomercio',
            name: 'Política',
            order: {
              default: 1014,
              'navbar-header-sections': 1004,
              'Navegacion-Pie_de_pagina-secciones': 1002,
              'navegacion-cabecera-tema-del-dia': 1003,
              'filter-section': 1002,
            },
            parent: {
              default: '/',
              'footer-sections': null,
              'navbar-header-sections': '/',
              'navegacion-Pie_de_pagina-secciones': null,
              'Navegacion-Pie_de_pagina-secciones': '/',
              'navegacion-cabecera-tema-del-dia': '/',
              'filter-section': '/',
            },
            ancestors: {
              'footer-sections': [],
              'navbar-header-sections': ['/'],
              'navegacion-Pie_de_pagina-secciones': [],
              'Navegacion-Pie_de_pagina-secciones': ['/'],
              'navegacion-cabecera-tema-del-dia': ['/'],
              'filter-section': ['/'],
            },
            inactive: false,
            node_type: 'section',
          },
        },
        _website_section_id: 'elcomercio./politica',
      },
      {
        _id: '/mundo/europa',
        _website: 'peru21',
        type: 'section',
        version: '0.6.0',
        name: 'Europa',
        description: null,
        path: '/mundo/europa',
        parent_id: '/mundo',
        parent: {
          default: '/mundo',
        },
        additional_properties: {
          original: {
            _id: '/mundo/europa',
            site: {
              site_url: null,
              site_title: null,
              pagebuilder_path_for_native_apps: null,
              site_tagline: null,
              site_keywords: null,
              site_about: null,
              site_description: null,
            },
            navigation: {
              nav_title: null,
            },
            site_topper: {
              site_logo_image: null,
            },
            social: {
              instagram: null,
              twitter: null,
              facebook: null,
              rss: null,
            },
            name: 'Europa',
            _website: 'peru21',
            parent: {
              default: '/mundo',
            },
            ancestors: {
              default: ['/mundo'],
            },
            _admin: {
              alias_ids: ['/mundo/europa'],
            },
            inactive: false,
            node_type: 'section',
          },
        },
        _website_section_id: 'peru21./mundo/europa',
      },
      {
        _id: '/mundo',
        _website: 'peru21',
        type: 'section',
        version: '0.6.0',
        name: 'Mundo',
        description: null,
        path: '/mundo',
        parent_id: '/',
        parent: {
          default: '/',
        },
        additional_properties: {
          original: {
            _id: '/mundo',
            site: {
              site_url: null,
              site_title: null,
              pagebuilder_path_for_native_apps: null,
              site_about: null,
              site_tagline: null,
              site_keywords: null,
              site_description: null,
            },
            navigation: {
              nav_title: null,
            },
            site_topper: {
              site_logo_image: null,
            },
            social: {
              instagram: null,
              twitter: null,
              facebook: null,
              rss: null,
            },
            name: 'Mundo',
            _website: 'peru21',
            parent: {
              default: '/',
              'pruerbas-aqui': '/',
            },
            ancestors: {
              default: [],
              'pruerbas-aqui': ['/'],
            },
            _admin: {
              alias_ids: ['/mundo'],
            },
            inactive: false,
            node_type: 'section',
            order: {
              'pruerbas-aqui': 1001,
            },
          },
        },
        _website_section_id: 'peru21./mundo',
      },
      {
        _id: '/politica/internacional',
        _website: 'elcomercio',
        type: 'section',
        version: '0.6.0',
        name: 'Internacional',
        description: null,
        path: '/politica/internacional',
        parent_id: '/politica',
        parent: {
          default: '/politica',
        },
        additional_properties: {
          original: {
            _id: '/politica/internacional',
            site: {
              site_url: 'internacional',
              site_title: 'internacional',
              pagebuilder_path_for_native_apps: null,
              site_tagline: null,
              site_keywords: null,
              site_about: null,
              site_description: null,
            },
            navigation: {
              nav_title: 'internacional',
            },
            site_topper: {
              site_logo_image: null,
            },
            social: {
              instagram: null,
              twitter: null,
              facebook: null,
              rss: null,
            },
            _admin: {
              alias_ids: ['/politica/internacional'],
            },
            _website: 'elcomercio',
            name: 'Internacional',
            parent: {
              default: '/politica',
            },
            ancestors: {
              default: ['/politica'],
            },
            inactive: false,
            node_type: 'section',
          },
        },
        _website_section_id: 'elcomercio./politica/internacional',
      },
    ],
    additional_properties: {
      parent_site_primaries: [],
    },
    primary_section: {
      _id: '/politica/internacional',
      _website: 'elcomercio',
      type: 'section',
      version: '0.6.0',
      name: 'Internacional',
      description: null,
      path: '/politica/internacional',
      parent_id: '/politica',
      parent: {
        default: '/politica',
      },
      additional_properties: {
        original: {
          _id: '/politica/internacional',
          site: {
            site_url: 'internacional',
            site_title: 'internacional',
            pagebuilder_path_for_native_apps: null,
            site_tagline: null,
            site_keywords: null,
            site_about: null,
            site_description: null,
          },
          navigation: {
            nav_title: 'internacional',
          },
          site_topper: {
            site_logo_image: null,
          },
          social: {
            instagram: null,
            twitter: null,
            facebook: null,
            rss: null,
          },
          _admin: {
            alias_ids: ['/politica/internacional'],
          },
          _website: 'elcomercio',
          name: 'Internacional',
          parent: {
            default: '/politica',
          },
          ancestors: {
            default: ['/politica'],
          },
          inactive: false,
          node_type: 'section',
        },
      },
    },
    primary_site: {
      _id: '/politica/internacional',
      type: 'site',
      version: '0.5.8',
      name: 'Internacional',
      description: null,
      path: '/politica/internacional',
      parent_id: '/politica',
      additional_properties: {
        original: {
          _id: '/politica/internacional',
          site: {
            site_url: 'internacional',
            site_title: 'internacional',
            pagebuilder_path_for_native_apps: null,
            site_tagline: null,
            site_keywords: null,
            site_about: null,
            site_description: null,
          },
          navigation: {
            nav_title: 'internacional',
          },
          site_topper: {
            site_logo_image: null,
          },
          social: {
            instagram: null,
            twitter: null,
            facebook: null,
            rss: null,
          },
          _admin: {
            alias_ids: ['/politica/internacional'],
          },
          name: 'Internacional',
          parent: '/politica',
          ancestors: ['/politica'],
          inactive: false,
        },
      },
    },
  },
  promo_items: {
    basic: {
      caption: 'GF Default - test',
      type: 'image',
      url:
        'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/6VZPF2SZNNBU3FJ6VPLUDMNKDU.jpeg',
    },
  },
  website_url: '/qa/prueba-de-widgets-noticia',
}
const element = new StoryData({
  deployment,
  contextPath,
  arcSite,
  defaultImgSize,
})

element.__data = data

describe('Guardado de data en StoryData', () => {
  it('Debe validar que este definida la clase StoryData', () => {
    expect(element).toBeDefined()
  })
  it('Debe validar que la funcion retorne la data que se esta guardando', () => {
    expect(element.__data).toBe(data)
  })
})
describe('Get y Set de website - StoryData', () => {
  it('Debe validar que retorne el valor del website que ingresa como parametro', () => {
    expect(element.__website).toBe(arcSite)
  })

  it('Debe validar que se pueda guardar el website y validar que sea el website guardado', () => {
    element.__website = 'trome'

    expect(element.__website).toBe('trome')
  })
})

describe('Get y Set de defaultImgSize - StoryData', () => {
  it('Debe validar que retorne el valor del defaultImgSize que ingresa como parametro', () => {
    expect(element.__defaultImgSize).toBe(defaultImgSize)
  })

  it('Debe validar que se pueda guardar el defaultImgSize y validar que sea el website guardado', () => {
    element.__defaultImgSize = 'xl'
    expect(element.__defaultImgSize).toBe('xl')
  })
})

describe('Get id de la  guardada con __data - StoryData', () => {
  it('Debe validar que retorne el id guardado en data', () => {
    const data2 = {
      _id: 'E34AIQYCZRCQBL4DV6KAO4WFMY',
      canonical_url: '/qa/prueba-de-widgets-noticia',
      display_date: '2019-06-07T16:08:20.150Z',
      headlines: { basic: 'Prueba de widgets 1' },
      promo_items: {
        basic: {
          caption: 'GF Default - test',
          type: 'image',
          url:
            'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/6VZPF2SZNNBU3FJ6VPLUDMNKDU.jpeg',
        },
      },
      website_url: '/qa/prueba-de-widgets-noticia',
    }
    element.__data = data2
    expect(element.id).toBe('E34AIQYCZRCQBL4DV6KAO4WFMY')
  })
  it('Debe validar que retorne el id vacio si es que no esta definico en la data', () => {
    const data2 = {
      // _id: 'E34AIQYCZRCQBL4DV6KAO4WFMY',
      canonical_url: '/qa/prueba-de-widgets-noticia',
      display_date: '2019-06-07T16:08:20.150Z',
      headlines: { basic: 'Prueba de widgets 1' },
      promo_items: {
        basic: {
          caption: 'GF Default - test',
          type: 'image',
          url:
            'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/6VZPF2SZNNBU3FJ6VPLUDMNKDU.jpeg',
        },
      },
      website_url: '/qa/prueba-de-widgets-noticia',
    }
    element.__data = data2
    expect(element.id).toBe('')
  })
})

describe('Get title de la  guardada con __data - StoryData', () => {
  it('Debe validar que retorne el title guardado en data', () => {
    expect(element.title).toBe('Prueba de widgets 1')
  })
  it('Debe validar que retorne el title vacio si es que no esta definido en el objeto data', () => {
    const data2 = {
      canonical_url: '/qa/prueba-de-widgets-noticia',
      display_date: '2019-06-07T16:08:20.150Z',
      promo_items: {
        basic: {
          caption: 'GF Default - test',
          type: 'image',
          url:
            'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/6VZPF2SZNNBU3FJ6VPLUDMNKDU.jpeg',
        },
      },
      website_url: '/qa/prueba-de-widgets-noticia',
    }
    element.__data = data2

    expect(element.title).toBe('')
  })
})
describe('Get tag - StoryData', () => {
  it('Debe retornar el objeto tags dede la data que viene como parametro ', () => {
    element.__data = data
    const tagtest = [
      {
        text: 'avengers',
        description: 'avengers',
        slug: 'avengers',
      },
    ]
    expect(element.tags).toEqual(tagtest)
  })

  // it("")
})
