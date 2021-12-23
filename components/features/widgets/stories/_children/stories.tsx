import * as React from 'react'

const classes = {
  story: 'story',
  content: 'story-content',
  contentImg: 'story-content-img',
  contentTitle: 'story-content-title',
}

interface WidgetProps {
  /** Title of the story */
  title: string
  /** Alternate text of the story img */
  anchorTitle: string
  /** Link to the story */
  url: string
  /** Thumbnail of the story */
  lastFrameImg: string
  /** Target attribute for anchor link */
  target: string
  /** Index used as a css variable */
  index: number
}

const StoriesChildWidget: React.FC<WidgetProps> = (props) => {
  const { title, anchorTitle, url, lastFrameImg, target, index } = props

  return (
    <a className={classes.story} href={url} target={target}>
      <div className={classes.content}>
        <div
          className={classes.contentImg}
          style={{ ['--index' as string]: index }}>
          <img
            src={lastFrameImg}
            alt={anchorTitle}
            style={{ ['--index' as string]: index }}
          />
        </div>
        <div className={classes.contentTitle}>{title}</div>
      </div>
    </a>
  )
}

export default StoriesChildWidget
