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
const taxonomy = {
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
}

const subheadlines = {
  basic:
    '“Game of Thrones”, “Avengers: Endgame” y el documental “RBG” lideran con cuatro nominaciones cada uno las candidaturas de los premios MTV Movie & TV Awards',
}

const credits = {
  by: [
    {
      _id: 'Tracy',
      type: 'author',
      version: '0.5.8',
      name: 'Tracy Aliaga',
      image: {
        url:
          'https://s3.amazonaws.com/arc-authors/elcomercio/cd54c1e8-cbf4-4282-ad03-6e2a063883ee.png',
        version: '0.5.8',
      },
      description: '',
      url: '/autor/tracy',
      slug: '',
      social_links: [
        {
          site: 'email',
          url: 'tracy@gmail.com',
        },
      ],
      socialLinks: [
        {
          site: 'email',
          url: 'tracy@gmail.com',
          deprecated: true,
          deprecation_msg: 'Please use social_links.',
        },
      ],
      additional_properties: {
        original: {
          _id: 'Tracy',
          firstName: 'Tracy',
          lastName: 'Aliaga',
          byline: 'Tracy Aliaga',
          image:
            'https://s3.amazonaws.com/arc-authors/elcomercio/cd54c1e8-cbf4-4282-ad03-6e2a063883ee.png',
          email: 'tracy@gmail.com',
          affiliations: '',
          education: [],
          awards: [],
          books: [],
          podcasts: [
            {
              name: '',
              url: '',
              download_url: '',
            },
          ],
          bio_page: '/autor/tracy',
          bio: '',
          longBio: '',
          slug: '',
          native_app_rendering: false,
          fuzzy_match: false,
          contributor: false,
          status: true,
          last_updated_date: '2019-05-16T16:40:09.270Z',
          type: 'author',
        },
      },
    },
  ],
}

const websites = {
  elcomercio: {
    website_section: {
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
    website_url:
      '/politica/mtv-movie-tv-awards-avengers-endgame-y-got-lideran-nominaciones-noticia',
  },
  peru21: {
    website_section: {
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
    website_url:
      '/politica/mtv-movie-tv-awards-avengers-endgame-y-got-lideran-nominaciones-noticia',
  },
}

const related_content = {
  basic: [
    {
      type: 'reference',
      _id: 'RWXERJIMOFBMZNNDPLMC4YZ6O4',
      referent: {
        id: 'RWXERJIMOFBMZNNDPLMC4YZ6O4',
        provider: '',
        type: 'story',
      },
    },
    {
      type: 'reference',
      _id: 'BDWNOEVFAFDDXPRQU2EAR6J5JU',
      referent: {
        id: 'BDWNOEVFAFDDXPRQU2EAR6J5JU',
        provider: '',
        type: 'story',
      },
    },
    {
      type: 'reference',
      _id: 'TSAIVBRONNESVBRUIPCW66I7T4',
      referent: {
        id: 'TSAIVBRONNESVBRUIPCW66I7T4',
        provider: '',
        type: 'story',
      },
    },
  ],
  redirect: [],
}

describe('Guardado de data en StoryData', () => {
  it('Debe validar que este definida la clase StoryData', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    expect(element).toBeDefined()
  })
  it('Debe validar que la funcion retorne la data que se esta guardando', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    expect(element.__data).toBe(data)
  })
})
describe('Get y Set de website - StoryData', () => {
  it('Debe validar que retorne el valor del website que ingresa como parametro', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    expect(element.__website).toBe(arcSite)
  })

  it('Debe validar que se pueda guardar el website y validar que sea el website guardado', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    element.__website = 'trome'

    expect(element.__website).toBe('trome')
  })
})

describe('Get y Set de defaultImgSize - StoryData', () => {
  it('Debe validar que retorne el valor del defaultImgSize que ingresa como parametro', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    expect(element.__defaultImgSize).toBe(defaultImgSize)
  })

  it('Debe validar que se pueda guardar el defaultImgSize y validar que sea el website guardado', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = data
    element.__defaultImgSize = 'xl'
    expect(element.__defaultImgSize).toBe('xl')
  })
})

describe('Get id de la  guardada con __data - StoryData', () => {
  it('Debe validar que retorne el id guardado en data', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    // element.__data = data

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
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

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
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    element.__data = data
    expect(element.title).toBe('Prueba de widgets 1')
  })
  it('Debe validar que retorne el title vacio si es que no esta definido en el objeto data', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

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
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const datastring = JSON.stringify(data)
    const data2 = JSON.parse(datastring)
    data2.taxonomy = taxonomy

    element.__data = data2
    const tagtest = [
      {
        text: 'avengers',
        description: 'avengers',
        slug: 'avengers',
      },
    ]
    expect(element.tags).toEqual(tagtest)
  })

  it('Debe retornar un arreglo vacio si taxonomy no esta definido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    const data3 = data

    element.__data = data3

    expect(element.tags).toEqual([])
  })
})
describe('Get subtitle - StoryData ', () => {
  it('Debe retornar el valor del subTitle', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const dataString = JSON.stringify(data)
    const dataTest = JSON.parse(dataString)
    dataTest.subheadlines = subheadlines
    element.__data = dataTest

    const subtitle =
      '“Game of Thrones”, “Avengers: Endgame” y el documental “RBG” lideran con cuatro nominaciones cada uno las candidaturas de los premios MTV Movie & TV Awards'
    expect(element.subTitle).toEqual(subtitle)
  })

  it('Debe retornar el valor vacio si el subheadlines no esta definido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const dataString = JSON.stringify(data)
    const dataTest = JSON.parse(dataString)
    // dataTest.subheadlines = subheadlines;
    element.__data = dataTest

    expect(element.subTitle).toEqual('')
  })
})
describe('Get author - StoryData ', () => {
  it('Debe el nombre del autor ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataAuthor: () => ({ nameAuthor: 'Tracy Aliaga' }),
    }))

    const datastring = JSON.stringify(data)
    const dataTest = JSON.parse(datastring)
    dataTest.credits = credits
    element.__data = dataTest
    expect(element.author).toEqual('Tracy Aliaga')
  })
})

describe('Get authorLink - StoryData ', () => {
  it('Debe el nombre del autor ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataAuthor: () => ({ urlAuthor: '/autor/tracy' }),
    }))

    const datastring = JSON.stringify(data)
    const dataTest = JSON.parse(datastring)
    dataTest.credits = credits
    element.__data = dataTest
    expect(element.authorLink).toEqual('/autor/tracy')
  })
})

describe('Get authorSlug - StoryData ', () => {
  it('Debe el slug del autor ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataAuthor: () => ({ slugAuthor: '' }),
    }))

    const datastring = JSON.stringify(data)
    const dataTest = JSON.parse(datastring)
    dataTest.credits = credits
    element.__data = dataTest
    expect(element.authorSlug).toEqual('')
  })
})

describe('Get authorImage - StoryData ', () => {
  it('Debe devolver la url de la imagen del autor ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataAuthor: () => ({
        imageAuthor:
          'https://s3.amazonaws.com/arc-authors/elcomercio/cd54c1e8-cbf4-4282-ad03-6e2a063883ee.png',
      }),
    }))

    const datastring = JSON.stringify(data)
    const dataTest = JSON.parse(datastring)
    dataTest.credits = credits
    element.__data = dataTest
    expect(element.authorImage).toEqual(
      'https://s3.amazonaws.com/arc-authors/elcomercio/cd54c1e8-cbf4-4282-ad03-6e2a063883ee.png'
    )
  })

  it('Debe la la funcion defaultImage en caso no este definido el objeto de los creditos', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataAuthor: () => ({
        imageAuthor: undefined,
      }),
    }))

    jest.mock('@utilities/helpers', () => () => ({
      defaultImage: () => '',
    }))
    const datastring = JSON.stringify(data)
    const dataTest = JSON.parse(datastring)
    dataTest.credits = credits

    expect(element.authorImage).toEqual(
      '/pf/resources/assets/author-grid/author.png'
    )
  })
})

describe('Get multimedia - StoryData', () => {
  it('Debe devolver el url del elemento multimedia', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    jest.mock('@utilities/story-data', () => () => ({
      getThumbnail: () => '',
      getTypeMultimedia: () => '',
    }))
    jest.mock('@utilities/helpers', () => () => ({
      defaultImage: () => '',
    }))

    const datastring = JSON.stringify(data)
    element.__data = JSON.parse(datastring)

    const dataEsperada =
      'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/6VZPF2SZNNBU3FJ6VPLUDMNKDU.jpeg'
    expect(element.multimedia).toBe(dataEsperada)
  })

  it('Debe devolver el url de la imagen por defecto que se genera con los otros parametros de StoryData ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    jest.mock('@utilities/story-data', () => () => ({
      getThumbnail: () => '',
      getTypeMultimedia: () => '',
    }))
    jest.mock('@utilities/helpers', () => () => ({
      defaultImage: () => '',
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    datatest.promo_items = undefined
    element.__data = datatest

    const dataEsperada = ''
    expect(element.multimedia).toBe(dataEsperada)
  })
})

describe('Get multimediaType - StoryData', () => {
  it('debe devolver el tipo de contenido multimedia', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getThumbnail: () => '',
      getTypeMultimedia: () => '',
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    element.__data = datatest
    expect(element.multimediaType).toBe('basic')
  })
})

describe('Get section - StoryData', () => {
  it('Debe retornar la seccion', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataSection: () => '',
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    datatest.websites = websites
    element.__data = datatest
    expect(element.section).toBe('Internacional')
  })
})

describe('Get sectionLink - StoryData', () => {
  it('debe retornar el link una cadena vacia si website es indefinido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getDataSection: () => '',
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    datatest.websites = undefined

    element.__data = datatest

    expect(element.sectionLink).toBe('')
  })
})

describe('Get primarySection - StoryData', () => {
  it('Debe retornar la seccion principal de la noticia', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getPrimarySection: () => ({}),
    }))
    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    datatest.taxonomy = taxonomy

    element.__data = datatest
    expect(element.primarySection).toBe('Internacional')
  })

  it('Debe retornar una cadena vacia si no esta definido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    jest.mock('@utilities/story-data', () => () => ({
      getPrimarySection: () => ({}),
    }))
    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    // datatest.taxonomy = taxonomy
    element.__data = datatest
    expect(element.primarySection).toBe('')
  })
})

describe('Get primarySectionLink - StoryData', () => {
  it('Debe retornar la url de la seccion principal', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    jest.mock('@utilities/story-data', () => () => ({
      getPrimarySection: () => ({}),
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    datatest.taxonomy = taxonomy

    element.__data = datatest
    expect(element.primarySectionLink).toBe('/politica/internacional')
  })

  it('Debe retornar la cadena vacia del url de la seccion principal', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    jest.mock('@utilities/story-data', () => () => ({
      getPrimarySection: () => ({}),
    }))

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    // datatest.taxonomy = taxonomy

    element.__data = datatest
    expect(element.primarySectionLink).toBe('')
  })
})

describe('Get link - StoryData', () => {
  it('Debe retornar link ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)

    element.__data = datatest
    expect(element.link).toBe('/qa/prueba-de-widgets-noticia')
  })

  it('Debe retornar una cadena vacia si el url no esta definido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)

    datatest.website_url = undefined

    element.__data = datatest
    expect(element.link).toBe('')
  })
  it('Debe retornar una cadena vacia si es que data no esta definido', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    element.__data = undefined
    expect(element.link).toBe('')
  })
})

describe('Get relatedContent - StoryData', () => {
  it('Debe retornar el valor de ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)

    datatest.related_content = related_content

    element.__data = datatest
    const resultBasic = [
      {
        _id: 'RWXERJIMOFBMZNNDPLMC4YZ6O4',
        referent: {
          id: 'RWXERJIMOFBMZNNDPLMC4YZ6O4',
          provider: '',
          type: 'story',
        },
        type: 'reference',
      },
      {
        _id: 'BDWNOEVFAFDDXPRQU2EAR6J5JU',
        referent: {
          id: 'BDWNOEVFAFDDXPRQU2EAR6J5JU',
          provider: '',
          type: 'story',
        },
        type: 'reference',
      },
      {
        _id: 'TSAIVBRONNESVBRUIPCW66I7T4',
        referent: {
          id: 'TSAIVBRONNESVBRUIPCW66I7T4',
          provider: '',
          type: 'story',
        },
        type: 'reference',
      },
    ]
    expect(element.relatedContent).toEqual(resultBasic)
  })

  it('Debe retornar un arreglo vacio si related_content no esta definido ', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)

    element.__data = datatest
    // const resultBasic =[{"_id": "RWXERJIMOFBMZNNDPLMC4YZ6O4", "referent": {"id": "RWXERJIMOFBMZNNDPLMC4YZ6O4", "provider": "", "type": "story"}, "type": "reference"}, {"_id": "BDWNOEVFAFDDXPRQU2EAR6J5JU", "referent": {"id": "BDWNOEVFAFDDXPRQU2EAR6J5JU", "provider": "", "type": "story"}, "type": "reference"}, {"_id": "TSAIVBRONNESVBRUIPCW66I7T4", "referent": {"id": "TSAIVBRONNESVBRUIPCW66I7T4", "provider": "", "type": "story"}, "type": "reference"}]
    expect(element.relatedContent).toEqual([])
  })
})

describe('Get videoSeo - StoryData', () => {
  it('', () => {
    const element = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })

    const datastring = JSON.stringify(data)
    const datatest = JSON.parse(datastring)
    element.__data = datatest
  })
})
