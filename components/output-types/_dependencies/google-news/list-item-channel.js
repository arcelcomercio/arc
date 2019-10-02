import StoryData from '../../../utilities/story-data'

const Item = ({
  title = '',
  link = '',
  description = '',
  pubDate = '',
  creator = '',
}) => {
  return `
    <item>
        <title>
          <![CDATA[ ${title} ]]>
        </title>
        <link>
          <![CDATA[ ${link}?outputType=amp ]]>
        </link>
        <description>
          <![CDATA[ ${description} ]]>
        </description>
        <pubDate>
          <![CDATA[ ${pubDate} ]]>
        </pubDate>
        <dc:creator>
          <![CDATA[ ${creator} ]]>
        </dc:creator>
    </item>`
}

const ListItemChannel = ({
  deployment,
  contextPath,
  arcSite,
  siteUrl,
  stories,
}) => {
  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  
  const items = stories
    .map(story => {
      storydata.__data = story

      const itemProps = {
        title: storydata.title,
        link: `${siteUrl}${storydata.link}`,
        description: storydata.subTitle,
        pubDate: storydata.date,
        creator: storydata.author,
      }
      const item = Item(itemProps)
      return item
    })
    .join('')

  return items
}

export default ListItemChannel
