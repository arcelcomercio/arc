import React from 'react'
import { useContent } from 'fusion:content'

const classes = {
  block: 'st-foot__block f f-col',
  linkul: 'st-foot__link-ul',
}

const StoryNavigationChild = () => {
  const DEFAULT_HIERARCHY = 'footer-default'
  const CONTENT_SOURCE = 'navigation-by-hierarchy'

  const SCHEMA = `{ 
        children {
          name
          _id
          display_name
          url
          node_type
        }
      }`

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      hierarchy: DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const formatData = res => {
    const { children = [] } = res || {}
    const auxList = children.map(el => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: el.url,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: el._id,
        node_type: el.node_type,
      }
    })
    return auxList
  }

  const formattedSections = sections && formatData(sections)

  return (
    <>
      {formattedSections && (
        <>
          <div className={classes.block}>
            <ul className={classes.linkul}>
              {formattedSections.map(el => (
                <li key={el.url}>
                  <a itemProp="url" href={el.url}>
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default StoryNavigationChild
