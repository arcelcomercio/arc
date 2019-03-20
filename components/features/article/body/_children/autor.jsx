import React, { Fragment } from 'react'
import Moment from 'react-moment'

const styles = {
  newsAuthor: 'news-author-date',
}
const Autor = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { by, date } = props
  return (
    <Fragment>
      {props && (
        <div className={styles.newsAuthor}>
          {by && by[0] && <a href={by && `/${by[0].slug}`}>{by[0].name} </a>}
          <Moment format="DD.MM.YYYY / LT " date={date && date} />
        </div>
      )}
    </Fragment>
  )
}

export default Autor
