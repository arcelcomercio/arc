import { reduceWord, defaultImage, formatSlugToText } from '@utilities/helpers'
import {
  appendScript,
  formatDate,
  formatDayMonthYear,
  getFullDateIso8601,
} from '@utilities/helpers'

// import { mount } from 'enzyme'

describe('funcion reduceWord helper', () => {
  it('debe ser  appendScript, menor a la longitud deseada', () => {
    const word = 'prueba longitud mayor a la longitud'
    const len = 100
    const finalText = '...adios'
    expect(reduceWord(word, len, finalText)).toBe(
      'prueba longitud mayor a la longitud'
    )
  })

  it('funcion appendScript, mayor a la longitud deseada', () => {
    const word =
      'prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, '

    expect(reduceWord(word)).toBe(
      'prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitu...'
    )
  })
  it('funcion appendScript, mayor a la longitud deseada sin parametros', () => {
    const word = 'prueba longitud mayor a la longitud'
    const len = 10
    const finalText = '...adios'
    expect(reduceWord(word, len, finalText)).toBe('prueba lon...adios')
  })
  it('test montaje del element', () => {
    // const code = 'console.log("hola mundo")';
    // const position = "head";

    // const script = mount(appendScript(code, position))
    expect(appendScript).toBeDefined()
  })
  it('funcion formatDate, debe valdiar la definicion', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDate(datedemo)).toBeDefined()
  })

  it('funcion formatDate, debe valdiar que la generacion del texto es el correcto', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDate(datedemo)).toBe('2019-05-28')
  })
  it('funcion formatDayMonthYear, debe valdiar la definicion', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDayMonthYear(datedemo)).toBeDefined()
  })
  it('funcion formatDayMonthYear, debe validar el texto del formato de la fecha', () => {
    const datedemo = '2019-05-28T19:54:26Z'
    expect(formatDayMonthYear(datedemo)).toBe(
      'Miércoles 28 de mayo del 2019, 14:54'
    )
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
