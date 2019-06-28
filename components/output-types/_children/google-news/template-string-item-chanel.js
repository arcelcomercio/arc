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
        <title>
          <![CDATA[ ${title} ]]>
        </title>
        <link>
          <![CDATA[ ${link} ]]>
        </link>
        <description>
          <![CDATA[ ${description} ]]>
        </description>
        <pubDate>
          <![CDATA[ ${pubDate} ]]>
        </pubDate>
        <content>
          <![CDATA[ ${creator} ]]>
        </content>
    </item>`
}

{
  /* <dc:creator>
          <![CDATA[ ${creator} ]]>
        </dc:creator> */
}

const StringTemplateArrayItem = ({
  deployment,
  contextPath,
  arcSite,
  siteUrl,
  stories,
}) => {
  const items = stories
    .map(story => {
      const storydata = new StoryData({
        deployment,
        contextPath,
        arcSite,
        defaultImgSize: 'sm',
      })
      storydata.__data = story

      const itemProps = {
        title: storydata.title,
        link: `${siteUrl}${storydata.link}` ,
        description: storydata.subTitle,
        pubDate: storydata.date,
        creator: storydata.author,
      }
      const item = StringItem(itemProps)
      // const item = JSON.stringify(itemProps)
      return item
    })
    .join('')

  return items
}

export default StringTemplateArrayItem
