import ConfigParams from '../../../../utilities/config-params'
import StoryData from '../../../../utilities/story-data'
import { clearHtml, clearBrTag } from '../../../../utilities/helpers'

const buildHeaderParagraph = paragraph => {
  return `<h2>${clearBrTag(paragraph)}</h2>`
}

const buildParagraphText = elementText => {
  let result = ''
  const cleanParagraph = clearHtml(elementText)
  result = cleanParagraph !== '' ? `<p>${clearHtml(cleanParagraph)}</p>` : ''
  return result
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

const analyzeParagraph = paragraph => {
  let result = ''
  switch (paragraph.type) {
    case ConfigParams.ELEMENT_TEXT:
      result += buildParagraphText(paragraph.payload)
      break
    case ConfigParams.ELEMENT_LIST:
      result += buildParagraphList(paragraph.payload)
      break
    case ConfigParams.ELEMENT_HEADER:
      result += buildHeaderParagraph(paragraph.payload)
      break
    default:
      result += ''
  }
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
