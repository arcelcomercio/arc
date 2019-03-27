import React, { Fragment } from 'react'
import Moment from 'react-moment'

/** TODO: Vale la pena usar moment? */

const styles = {
  newsAuthor: 'news-author-date',
}
export default props => {
  const { by = [], date } = props
  return (
    <Fragment>
      {props && (
        <div className={styles.newsAuthor}>
          {by && by[0] && <a href={by && `/${by[0].slug}`}>{by[0].name} </a>}
          {date && <Moment format="DD.MM.YYYY / LT " date={date} />}
        </div>
      )}
    </Fragment>
  )
}
