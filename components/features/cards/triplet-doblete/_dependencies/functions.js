
import StoryData from '../../../../utilities/story-data'

export const getParams = (data, arcSite, contextPath, deployment, invertedColor) => {
  const {
    websiteLink,
    title,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    multimediaType,
    multimediaCaption,
    multimedia,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  return {
    websiteLink,
    title,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    multimediaType,
    multimediaCaption,
    multimedia,
    invertedColor
  }
}