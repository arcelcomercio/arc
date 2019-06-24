import StoryData from '../../../../utilities/story-data'

export const setDataTest = storiesQty => {
  const item = {
    title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore vel repellat quae amet, maxime inventore eos dolores labore velit veniam nesciunt consequuntur, excepturi magnam unde deleniti ea itaque cumque assumenda?',
    imageUrl: 'https://picsum.photos/100/50',
    websiteUrl: '#',
  }
  const auxTest = []
  for (let i = 0; i < storiesQty; i++) {
    auxTest[i] = item
  }
  return auxTest
}

export const dataCasting = ({
  data,
  deployment,
  contextPath,
  arcSite
}) => {
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