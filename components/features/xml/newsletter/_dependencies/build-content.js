/* eslint-disable no-control-regex */
import ConfigParams from '../../../../utilities/config-params'
import StoryData from '../../../../utilities/story-data'
import { nbspToSpace } from '../../../../utilities/helpers'

const utf8ForXml = inputStr => {
  return inputStr.replace(
    /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
    ''
  )
}

const clearBrTag = paragraph => {
  return nbspToSpace(paragraph.trim().replace(/<\/?br[^<>]+>/, ''))
}

const clearHtml = paragraph => {
  return nbspToSpace(
    clearBrTag(
      paragraph
        .trim()
        .replace(/(<([^(<!a|!b|!i)>]+)>)/gi, '')
        .replace('   ', ' ')
        .replace('  ', ' ')
    )
  )
}

const buildHeaderParagraph = paragraph => {
  return `<h2>${clearBrTag(paragraph)}</h2>`
}

const buildParagraphText = elementText => {
  const cleanParagraph = clearHtml(elementText)
  return cleanParagraph !== '' ? `<p>${clearHtml(cleanParagraph)}</p>` : ''
}

const buildParagraphList = listParagraph => {
  let result = ''
  const newListParagraph = StoryData.paragraphsNews(listParagraph)
  newListParagraph.forEach(({ type = '', payload = '' }) => {
    const paragraphParams = {
      type,
      payload,
    }

    // eslint-disable-next-line no-use-before-define
    const processedParagraph = analyzeParagraph(paragraphParams)
    result += `<li>${processedParagraph}</li>`
  })
  result = `<ul>${result}</ul>`
  return result
}

const buildParagraphImage = image => {
  const { payload = '', caption = '' } = image
  return `<img src="${payload}" alt="${caption}">`
}

const analyzeParagraph = paragraph => {
  let result = ''
  switch (paragraph.type) {
    case ConfigParams.ELEMENT_IMAGE:
      result += buildParagraphImage(paragraph)
      break
    case ConfigParams.ELEMENT_TEXT:
      result += buildParagraphText(paragraph.payload)
      break
    case ConfigParams.ELEMENT_LIST:
      result += buildParagraphList(paragraph.payload)
      break
    case ConfigParams.ELEMENT_HEADER:
      result += buildHeaderParagraph(paragraph.payload)
      break
    case ConfigParams.ELEMENT_RAW_HTML:
      result += utf8ForXml(paragraph.payload)
      break
    default:
      result += ''
  }
  // console.log('!!!!!!!!!!!!!!!!!!! result analyze', paragraph.type, result)
  return result
}

const BuildContent = ({ paragraphsNews = [] }) => {
  let result = ''

  paragraphsNews.forEach(element => {
    result += analyzeParagraph(element)
  })

  return result
}

export default BuildContent
