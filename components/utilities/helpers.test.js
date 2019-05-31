import { reduceWord, defaultImage, formatSlugToText } from '@utilities/helpers'

describe('Test reduceWord', () => {
  it('funcion appendScript', () => {
    const word = 'prueba longitud menor a 145'
    const len = 10
    const finalText = '...adios'
  })

  reduceWord(word, len, finalText)
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
