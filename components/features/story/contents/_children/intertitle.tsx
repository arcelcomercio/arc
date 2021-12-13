import * as React from 'react'

const classes = {
  intertitle: 'intertitle',
  title: 'intertitle__title'
}

const StoryContentChildIntertitle: React.FC<{
  data: any
}> = (props) => {
  const {
    data: { embed: { config: { data: { title = '' } = {}, } = {}, } = {}, } = {},
  } = props

  return (
    <div className={classes.intertitle}>
      <h2 className={classes.title}>{title}</h2>
    </div>
  )
}

export default StoryContentChildIntertitle
