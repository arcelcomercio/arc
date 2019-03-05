import React, { Fragment } from 'react'
import Moment from 'react-moment'

const styles = {
  newsAuthor: 'news-author-date',
}
const Video = props => {
  const { by } = props.data
  const { date } = props.date
  return (
    <Fragment>
      {props && (
        <div className={styles.newsAuthor}>
          {by && by[0] && <a href={by && '/' + by[0].slug}>{by[0].name} </a>}
          <Moment format="DD.MM.YYYY / LT " date={date && date} />
        </div>
      )}
    </Fragment>
  )
}

export default Video
