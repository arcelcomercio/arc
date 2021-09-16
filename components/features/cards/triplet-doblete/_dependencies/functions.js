import StoryData from '../../../../utilities/story-data'

export const getParams = (data, arcSite, contextPath, deployment) => {
  const {
    id,
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

  const authorOrSection = author
  const authorOrSectionLink = authorLink

  return {
    id,
    websiteLink,
    title,
    authorOrSection,
    authorOrSectionLink,
    primarySection,
    primarySectionLink,
    multimediaType,
    multimediaCaption,
    multimedia,
  }
}
