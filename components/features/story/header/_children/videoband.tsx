import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  container: 'story-header-videoband',
  play: 'story-header-videoband__play',
}
const StoryHeaderChildVideoband: FC = () => (
  <div className={classes.container}>
    <span className={classes.play}>&#x23F5;</span> Incluye contenido en video
  </div>
)

export default StoryHeaderChildVideoband
