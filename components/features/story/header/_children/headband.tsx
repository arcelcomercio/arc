import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'story-header-headband',
  tag: 'story-header-headband__tag',
  text: 'story-header-headband__text',
}
const StoryHeaderChildHeadband: FC = ({ tag = '', text = '' }) => (
  <div className={classes.container}>
    <div className={classes.tag}>{tag}</div>
    <div className={classes.text}>{text}</div>
  </div>
)

export default StoryHeaderChildHeadband
