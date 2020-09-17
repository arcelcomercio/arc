import StoryData from '../../../../utilities/story-data'
import { removeLastSlash } from '../../../../utilities/parse/strings'

const formatStories = ({ data, deployment, contextPath, arcSite }) => {
  const aux = []

  const element = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  data.forEach(el => {
    element.__data = el
    aux.push({
      websiteUrl: element.link,
      imageUrl: element.multimedia,
      storyType: element.multimediaType,
      title: element.title,
      id: el._id,
    })
  })
  return aux
}

export const getQuery = ({
  globalContentConfig,
  globalContent,
  storiesQty,
}) => {
  const { query: { section = '' } = {} } = globalContentConfig || {}
  const { taxonomy: { primary_section: { _id, path } = {} } = {} } =
    globalContent || {}

  let sec = _id || path || section

  if (sec === 'todas' || sec === null || sec === 'undefined') sec = ''
  else if (sec !== '') {
    sec = sec.charAt(0) === '/' ? sec : `/${sec}`
  }

  return {
    section: removeLastSlash(sec),
    size: storiesQty,
  }
}

export const getStories = ({ data, deployment, contextPath, arcSite }) => {
  let stories = []
  if (data.length > 0) {
    stories = formatStories({
      data,
      deployment,
      contextPath,
      arcSite,
    })
  }
  return stories
}
