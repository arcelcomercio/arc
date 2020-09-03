/* eslint-disable no-eval */
import {
  reduceWord,
  defaultImage,
  formatSlugToText,
  getCookie,
  createMarkup,
  socialMediaUrlShareList,
  popUpWindow,
  getMetaPagesPagination,
  metaPaginationUrl,
  appendScript,
  formatDate,
  formatDayMonthYear,
  getFullDateIso8601,
  getActualDate,
  isEmpty,
  getIcon,
  ResizeImageUrl,
  createScript,
} from '@utilities/helpers'

describe('Funcion reduceWord helper', () => {
  it('menor a la longitud deseada', () => {
    const word = 'prueba longitud mayor a la longitud'
    const len = 100
    const finalText = '...adios'
    expect(reduceWord(word, len, finalText)).toBe(
      'prueba longitud mayor a la longitud'
    )
  })

  it('reduceWord, mayor a la longitud deseada', () => {
    const word =
      'prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, '

    expect(reduceWord(word)).toBe(
      'prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitu...'
    )
  })

  it('concatenacion pasando parametros a la funcion', () => {
    const word = 'prueba longitud mayor a la longitud'
    const len = 10
    const finalText = '...adios'
    expect(reduceWord(word, len, finalText)).toBe('prueba lon...adios')
  })
})

describe('Funcion appendScript', () => {
  it('Validacion de definicion', () => {
    expect(appendScript).toBeDefined()
  })

  it('Debe llamar body.append', () => {
    global.document.body.append = jest.fn()
    appendScript('test')
    expect(global.document.body.append).toHaveBeenCalled()
  })

  it('Debe llamar head.append', () => {
    global.document.head.append = jest.fn()
    appendScript('test', 'head')
    expect(global.document.head.append).toHaveBeenCalled()
  })
})
describe('Funcion formatDayMonthYear', () => {
  it('validación de la definicion', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDayMonthYear(datedemo)).toBeDefined()
  })
  it('debe validar el texto del formato de la fecha', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDayMonthYear(datedemo)).toBe(
      'Miércoles 28 de mayo del 2019, 14:54'
    )
  })
})
describe('Funcion getFullDateIso8601', () => {
  it('validacion de deficinion', () => {
    expect(getFullDateIso8601).toBeDefined()
  })
  it('Valida si ingresando los parametros retorna falso', () => {
    const fullDate = ''

    expect(getFullDateIso8601(fullDate)).not.toBeTruthy()
  })
  it('El parametro fullDate debe tener valor y debe retornar un objeto json con valores de la fecha', () => {
    const fullDate = '2019-04-29 22:34:13'
    const dataCompare = {
      day: '29',
      fullYear: '2019',
      hours: '22',
      minutes: '34',
      month: '04',
      seconds: '13',
    }

    expect(getFullDateIso8601(fullDate)).toEqual(dataCompare)
  })
  it('El parametro fullDate debe tener valor y debe retornar un objeto json con valores de la fecha, tenieendo en cuenta lo valores de los delimitadores', () => {
    const fullDate = '2019@04@29*22/34/13'
    const delimiterFullDate = '*'
    const separatorDate = '@'
    const separatorTime = '/'

    const dataCompare = {
      day: '29',
      fullYear: '2019',
      hours: '22',
      minutes: '34',
      month: '04',
      seconds: '13',
    }

    expect(
      getFullDateIso8601(
        fullDate,
        delimiterFullDate,
        separatorDate,
        separatorTime
      )
    ).toEqual(dataCompare)
  })
})

describe('Funcion getActualDate', () => {
  it(' validacion de la definicion', () => {
    expect(getActualDate()).toBeDefined()
  })
  it('debe validar que la cadena de texto del la fecha actual contenga el dia actual - getActualDate', () => {
    const today = new Date()
    let dia = today.getDate()
    let mes = today.getMonth() + 1

    if (dia < 10) dia = `0${dia}`
    if (mes < 10) mes = `0${mes}`

    const expression = eval(`/${dia}/`) // converte un string a una expresion

    expect(getActualDate()).toMatch(expression)
  })

  it('debe validar que la cadena de texto del la fecha actual contenga el mes actual - getActualDate', () => {
    const today = new Date()
    let mes = today.getMonth() + 1
    if (mes < 10) mes = `0${mes}`

    const expression = eval(`/${mes}/`)

    expect(getActualDate()).toMatch(expression)
  })

  it('debe validar que la cadena de texto del la fecha actual contenga el año actual - getActualDate', () => {
    const today = new Date()
    const año = today.getFullYear()
    const expression = eval(`/${año}/`)

    expect(getActualDate()).toMatch(expression)
  })
})

describe('Funcion formatDate', () => {
  it('valdacion de la definicion', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDate(datedemo)).toBeDefined()
  })
  it('valida que la generacion del texto es el correcto', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDate(datedemo)).toBe('2019-05-28')
  })
})
describe('Funcion isEmpty', () => {
  it('validacion de la definicion', () => {
    expect(isEmpty()).toBeDefined()
  })
  it('debe retornar falso si el parametro es una funcion', () => {
    expect(isEmpty(() => {})).not.toBeTruthy()
  })
  it('debe retornar falso si el parametro es una numerico', () => {
    expect(isEmpty(2)).not.toBeTruthy()
  })
  it('debe retornar falso si el parametro es una bolean', () => {
    expect(isEmpty(false)).not.toBeTruthy()
  })
  it('debe retornar falso si el parametro es un objeto con atributs', () => {
    expect(
      isEmpty({
        test: 'prueba',
      })
    ).toBeFalsy()
  })

  it('debe retornar true si el parametro es un objeto vacío', () => {
    expect(isEmpty({})).toBeTruthy()
  })

  it('debe retornar true si el parametro es null', () => {
    expect(isEmpty(null)).toBeTruthy()
  })

  it('debe retornar true si el parametro es []', () => {
    expect(isEmpty([])).toBeTruthy()
  })

  it('debe retornar falso si el parametro no coincide con ninguna condicional', () => {
    expect(isEmpty(String)).toBeFalsy()
  })
})

describe('funcion getIcon', () => {
  it('debe  validar que la funcion este definida', () => {
    expect(getIcon()).toBeDefined()
  })

  it('debe  retornar el nombre de tipo de icono segun el tipo', () => {
    const type = 'basic_gallery'
    expect(getIcon(type)).toBe('img')
  })

  it('debe  retornar "video"', () => {
    const type = 'basic_video'
    expect(getIcon(type)).toBe('video')
  })
})

describe('Funcion ResizeImageUrl', () => {
  it('debe  validar que la funcion este definida', () => {
    expect(ResizeImageUrl).toBeDefined()
  })

  it('debe  validar que la funcion  retorne el valor del resize', () => {
    const arcSite = 'elcomercio'
    let imgUrl = 'https://media.merchantcircle.com/9404942/top_full.jpeg'
    const ratio = '16:9'
    const resolution = '400x400'

    expect(ResizeImageUrl(arcSite, imgUrl, ratio, resolution)).toBe('SDASD')
    imgUrl = ''
    expect(ResizeImageUrl(arcSite, imgUrl, ratio, resolution)).toBe(imgUrl)
    expect.assertions(2)
  })
})

describe('Función defaultImage - Helpers', () => {
  const params = {
    deployment: jest.fn(),
    contextPath: 'pf',
    arcSite: 'elcomercio',
  }
  test('La función "defaultImage" existe y/o devuelve algún valor', () => {
    expect(defaultImage).toBeDefined()
  })

  test('Debe retornar un string ', () => {
    defaultImage(params)
    // only mock's function
    expect(params.deployment).toHaveBeenCalledWith(expect.any(String))
  })

  test('Debe retornar un path definido', () => {
    params.deployment.mockReturnValueOnce(
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-lg.png`
    )
    expect(defaultImage(params)).toBe(
      'pf/resources/dist/elcomercio/images/default-lg.png'
    )
  })

  test('El path contiene "elcomercio"', () => {
    params.deployment.mockReturnValueOnce(
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-lg.png`
    )
    expect(defaultImage(params)).toContain('elcomercio')
  })

  test('El path contiene el tamaño "lg"', () => {
    params.deployment.mockReturnValueOnce(
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-lg.png`
    )
    expect(defaultImage(params)).toMatch('lg')
  })

  test('Debe retornar un path vacío', () => {
    params.size = 'test'
    expect(defaultImage(params)).toBeFalsy()
  })
})

describe('Función formatSlugToText - Helpers', () => {
  test('La función "formatSlugToText" existe y/o devuelve algún valor', () => {
    expect(formatSlugToText).toBeDefined()
  })

  test('Debe devolver null', () => {
    expect(formatSlugToText()).toBeNull()
  })

  test('Debe devolver un String', () => {
    const text = 'esto--es -una-prueba'
    expect(typeof formatSlugToText(text)).toBe('string')
  })

  test('La respuesta no debe contener "-"', () => {
    const text = 'esto--es -una-prueba'
    expect(typeof formatSlugToText(text)).not.toContain('-')
  })
})

describe('Función getCookie - Helpers', () => {
  const cookie =
    '_cb_ls=1; gecdigmpp=3f0ab274c39a47327dc1106bce4b5f1f; _ga=GA1.2.1591223817.1559144713; cX_S=jw9ei8grbl7m1juv; _fbp=fb.1.1559144713754.409323342; trc_cookie_storage=taboola%2520global%253Auser-id%3D5c86ac23-6f17-4691-b56c-2f8d8046154c-tuct3e57ae3; _cb=BFZnLWx2iKWBC3u84; __gads=ID=b3686f1d0e7ee99c:T=1559144716:S=ALNI_MYhmgK_xokeVQt_LVPYStIJGhjWtA; _v__chartbeat3=PAQ8ODM6KmxD5tRtD; _gid=GA1.2.70889930.1559573707; AccessToken=MPP1559573707488-WebPage; isEU=false; cX_P=jw6rc0pnlq48kj64; cX_G=cx%3Amdgcp9gov3n711papy3yd5eo8%3A22u8sp9aml98b; _chartbeat2=.1559144706651.1559580358950.110001.hFl6XZQNVbxVz3KBIlQQSBmfdtR.1; _cb_svref=null; GED_PLAYLIST_ACTIVITY=W3sidSI6IjVHRUkiLCJ0c2wiOjE1NTk1ODAzNjUsIm52IjoxLCJ1cHQiOjE1NTk1ODAzNjMsImx0IjoxNTU5NTgwMzYzfV0.'
  global.document.cookie = cookie

  test('La función existe y/o devuelve un valor', () => {
    expect(getCookie).toBeDefined()
  })

  test('Debe retornar null', () => {
    expect(getCookie('test')).toBeNull()
  })

  test('Debe retornar un valor', () => {
    expect(getCookie('_cb_ls')).toBe('1')
  })
})

describe('Función createMarkup - Helpers', () => {
  test('La función existe y/o devuelve un valor', () => {
    expect(createMarkup).toBeDefined()
  })

  test('Debe tener el atributo __html', () => {
    const expected = ['__html']
    expect(Object.keys(createMarkup('test html'))).toEqual(
      expect.arrayContaining(expected)
    )
  })

  test('El retorno de la función debe ser el mismo que se ingresa', () => {
    const html = 'test html'
    expect(createMarkup(html).__html).toBe(html)
  })
})

describe('Función socialMediaUrlShareList - Helpers', () => {
  const siteUrl = 'http =//elcomercio.pe'
  const postPermaLink = '/post'
  const postTitle = 'título del post'

  test('La función existe y/o devuelve un valor', () => {
    expect(socialMediaUrlShareList).toBeDefined()
  })

  test('Debe tener el atributo "facebook, twitter, linkedin, pinterest, whatsapp"', () => {
    const expected = [
      'facebook',
      'twitter',
      'linkedin',
      'pinterest',
      'whatsapp',
    ]
    expect(
      Object.keys(socialMediaUrlShareList(siteUrl, postPermaLink, postTitle))
    ).toEqual(expect.arrayContaining(expected))
  })

  test('Contiene el sitio web del post en facebook', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).facebook
    ).toContain(siteUrl)
  })

  test('Contiene el link del post en facebook', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).facebook
    ).toContain(postPermaLink)
  })

  test('Contiene el sitio web del post en linkedin', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).linkedin
    ).toContain(siteUrl)
  })

  test('Contiene el link del post en linkedin', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).linkedin
    ).toContain(postPermaLink)
  })

  test('Contiene el sitio web del post en pinterest', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).linkedin
    ).toContain(siteUrl)
  })

  test('Contiene el link del post en pinterest', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).linkedin
    ).toContain(postPermaLink)
  })

  test('Contiene el sitio web del post en whatsapp', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).whatsapp
    ).toContain(siteUrl)
  })

  test('Contiene el link del post en whatsapp', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).whatsapp
    ).toContain(postPermaLink)
  })

  test('Contiene el título del post en twitter', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).twitter
    ).toContain(encodeURIComponent(postTitle))
  })

  test('Contiene el sitio web del post en twitter', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).twitter
    ).toContain(siteUrl)
  })

  test('Contiene el link del post en twitter', () => {
    expect(
      socialMediaUrlShareList(siteUrl, postPermaLink, postTitle).twitter
    ).toContain(postPermaLink)
  })
})

describe('Función popUpWindow - Helpers', () => {
  test('La función existe y/o devuelve un valor', () => {
    expect(popUpWindow).toBeDefined()
  })

  test('Debe llamar a "open"', () => {
    global.open = jest.fn()
    const url = 'http://elcomercio.pe'
    const title = 'título'
    const w = '500'
    const h = '500'
    popUpWindow(url, title, w, h)
    expect(global.open).toHaveBeenCalled()
  })
})

describe('Función getMetaPagesPagination - Helpers', () => {
  test('La función existe y/o devuelve un valor', () => {
    expect(getMetaPagesPagination).toBeDefined()
  })

  test('Debe contener los atributos "current, next, prev"', () => {
    const requestUri = '/post/alan/'
    const isQuery = true
    const globalContent = {
      next: '',
      previous: '',
    }
    const patternPagination = ''
    const expected = ['current', 'next', 'prev']
    expect(
      Object.keys(
        getMetaPagesPagination(
          requestUri,
          isQuery,
          globalContent,
          patternPagination
        )
      )
    ).toEqual(expect.arrayContaining(expected))
    expect(
      Object.keys(getMetaPagesPagination(requestUri, true, '', null))
    ).toEqual(expect.arrayContaining(expected))
    expect(
      Object.keys(
        getMetaPagesPagination(requestUri, false, '', patternPagination)
      )
    ).toEqual(expect.arrayContaining(expected))
    expect.assertions(3)
  })
})

describe('Función metaPaginationUrl - Helpers', () => {
  test('La función existe y/o devuelve un valor', () => {
    expect(metaPaginationUrl).toBeDefined()
  })

  test('El resultado debe contener el sitio', () => {
    const siteUrl = 'http://elcomercio.pe'
    const requestUri = '/post/alan/'
    const isQuery = true
    const patternPagination = ''
    const pageNumber = 1
    expect(
      metaPaginationUrl(
        pageNumber,
        patternPagination,
        requestUri,
        siteUrl,
        isQuery
      )
    ).toContain(siteUrl)
    expect(
      metaPaginationUrl(pageNumber, null, requestUri, siteUrl, isQuery)
    ).toContain(siteUrl)
    expect(
      metaPaginationUrl(pageNumber, null, requestUri, siteUrl, false)
    ).toContain(siteUrl)
    expect(
      metaPaginationUrl(
        pageNumber,
        patternPagination,
        requestUri,
        siteUrl,
        false
      )
    ).toContain(siteUrl)
    expect.assertions(4)
  })
})

describe('Función createScript - Helpers', () => {
  test('La función existe y/o devuelve un valor', () => {
    expect(createScript).toBeDefined()
  })

  test('Debe llamar a "createElement"', () => {
    global.document.createElement = jest.fn()
    global.document.createElement.mockReturnValueOnce({})
    createScript({
      src: true,
      async: true,
      defer: true,
    })
    expect(document.createElement).toHaveBeenCalled()
  })
})
