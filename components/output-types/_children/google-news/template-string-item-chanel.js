import StoryData from '../../../utilities/story-data'

const StringItem = ({
  title = '',
  link = '',
  description = '',
  pubDate = '',
  creator = '',
}) => {
  return `
    <item>
        <title>${title}</title>
        <link>${link}</link>
        <description>${description}</description>
        <pubDate>${pubDate}</pubDate>
        <dc:creator>${creator}</dc:creator>
    </item>`
}

const StringTemplateArrayItem = ({
  deployment,
  contextPath,
  arcSite,
  stories,
}) => {
  const items = stories.map(story => {
    const storydata = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })
    storydata.__data = story

    const itemProps = {
      title: storydata.title,
      link: storydata.title,
      description: storydata.title,
      pubDate: storydata.title,
      creator: storydata.title,
    }
    const item = StringItem(itemProps)
    return item
  })

  return items
}

export default StringTemplateArrayItem
