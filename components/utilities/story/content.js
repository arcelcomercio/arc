/* eslint-disable import/prefer-default-export */
import { ELEMENT_TEXT, ELEMENT_LIST } from '../constants/element-types'

/**
 * Inyecta los ads disponibles entre en contenido de la noticia
 * cada cierta cantidad definida de parrafos.
 *
 * @param {Object} config
 * @param {Object[]} config.contentElements - Contenido de la noticia
 * @param {number} [config.adsEvery=2] - Cantidad de parrafos que separan los ads disponibles en contenido
 * @returns {Object[]} - Contenido de noticia con ads cada N parrafos. N = adsEvery.
 */
export const contentWithAds = ({ contentElements, adsEvery = 2 }) => {
  let textElementsCounter = 0
  let adsCounter = 0
  const contentAdsList = ['inline', 'caja4', 'caja5']

  return contentElements
    ? contentElements.map((dataContent, i) => {
        let dataElements = {}
        const { type: typeElement } = dataContent

        dataElements =
          typeElement === ELEMENT_LIST && i === 0 ? [] : dataContent

        if (typeElement === ELEMENT_TEXT) {
          if (textElementsCounter > 0 && textElementsCounter % adsEvery === 0) {
            if (adsCounter < contentAdsList.length) {
              dataElements.publicidad = true
              dataElements.nameAds = contentAdsList[adsCounter]
              adsCounter += 1
            }
          }

          textElementsCounter += 1
        }
        return dataElements
      })
    : []
}

export const processText = (content = '') => {
  const res = content.split('<b>')
  let entryHtml = ''
  res.forEach((entry, i) => {
    entryHtml = `${entryHtml} ${
      res[0] && i === 0 ? entry : entry && `<b>${entry}</b>`
    }`
  })

  return entryHtml
}
