import DataStory from '../../../../../resources/components/utils/data-story'

export const setDataTest = totalElements => {
  const item = {
    title:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore vel repellat quae amet, maxime inventore eos dolores labore velit veniam nesciunt consequuntur, excepturi magnam unde deleniti ea itaque cumque assumenda?',
    imageUrl: 'https://picsum.photos/100/50',
    websiteUrl: '#',
  }
  const auxTest = []
  for (let i = 0; i < totalElements; i++) {
    auxTest[i] = item
  }
  return auxTest
}

export const castingData = (data, props) => {
  const aux = []
  const element = new DataStory({}, props.arcSite)

  data.forEach(el => {
    element.__data = el
    aux.push({
      websiteUrl: element.link,
      imageUrl: element.multimedia,
      typeNote: element.multimediaType,
      title: element.title,
      id: el._id,
    })
  })
  return aux
}
