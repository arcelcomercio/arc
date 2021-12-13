import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'story-header-description',
  description: 'story-header-description__description',
  link: 'story-header-description__link',
}
const StoryHeaderChildDescription: FC = ({
  text = '',
  linktext = '',
  link = '',
}) => (
  <div className={classes.container}>
    <div className={classes.description}>{text}</div>
    {linktext && (
      <a className={classes.link} href={link}>
        {linktext}
      </a>
    )}
  </div>
)

export default StoryHeaderChildDescription
