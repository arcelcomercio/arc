import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'story-header-title',
}
const StoryHeaderChildTitle: FC = ({ text = '' }) => (
  <div className={classes.container}>{text}</div>
)

export default StoryHeaderChildTitle
