import { reduceWord, defaultImage, formatSlugToText } from '@utilities/helpers'
import {
  appendScript,
  formatDate,
  formatDayMonthYear,
  getFullDateIso8601,
  getActualDate,
  isEmpty,
  getIcon,
  ResizeImageUrl,
} from '@utilities/helpers'

//mock

import {addResizedUrlItem} from '../utilities/thumbs'

jest.mock('../utilities/thumbs', () => ({
  addResizedUrlItem: jest.fn(),
}))

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
})

describe('Funcion appendScript', () => {
  it('Validacion de definicion', () => {
    expect(appendScript).toBeDefined()
  })
  it('concatenacion pasando parametros a la funcion', () => {
    const word = 'prueba longitud mayor a la longitud'
    const len = 10
    const finalText = '...adios'
    expect(reduceWord(word, len, finalText)).toBe('prueba lon...adios')
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
  it('validacion resultado fecha actual {yyyy-mm-dd}', () => {
    const dataesperada = '2019-06-03'
    expect(getActualDate()).toBe(dataesperada)
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
  it('debe retornar falso si el parametro es un objeto', () => {
    expect(isEmpty(Object)).not.toBeTruthy()
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
})

describe('Funcion ResizeImageUrl', () => {
  it('debe  validar que la funcion este definida', () => {
    expect(ResizeImageUrl).toBeDefined()
  })

  it('debe  validar que la funcion  retorne el valor del resize', () => {
    const arcSite = 'elcomercio'
    const imgUrl = 'https://media.merchantcircle.com/9404942/top_full.jpeg'
    const ratio = '16:9'
    const resolution = '400x400'



    addResizedUrlItem.mockImplementationOnce(() => (
      {resized_urls:{'16:9':'SDASD'}}))
    expect(ResizeImageUrl(arcSite, imgUrl, ratio, resolution)).toBe("SDASD")
  })
})

// Rolly
describe('Función defaultImage - Helpers', () => {
  const params = {
    deployment: jest.fn(),
    contextPath: 'pf',
    arcSite: 'elcomercio',
    size: 'lg',
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
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-${
        params.size
      }.png`
    )
    expect(defaultImage(params)).toBe(
      'pf/resources/dist/elcomercio/images/default-lg.png'
    )
  })

  test('El path contiene "elcomercio"', () => {
    params.deployment.mockReturnValueOnce(
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-${
        params.size
      }.png`
    )
    expect(defaultImage(params)).toContain('elcomercio')
  })

  test('El path contiene el tamaño "lg"', () => {
    params.deployment.mockReturnValueOnce(
      `${params.contextPath}/resources/dist/${params.arcSite}/images/default-${
        params.size
      }.png`
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

describe('Función getCookie - Helpers', () => {})
