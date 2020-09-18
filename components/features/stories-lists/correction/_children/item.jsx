import React from 'react'
import { formatDateLocalTimeZone } from '../../../../utilities/date-time/dates'

const classes = {
  box: 'stories-list-correction__box mb-20 bt-20 p-20',
  title: 'stories-list-correction__title pb-15',
  content: 'stories-list-correction__content',
  time: 'stories-list-correction__time block pb-15',
}

const CORRECTION_TYPE_CORRECTION = 'correction'

const StoriesListsCardChildItem = ({
  websiteLink,
  title,
  contentElementsCorrectionList = [],
  // displayDate,
}) => {
  return (
    <>
      {contentElementsCorrectionList.map(
        ({
          embed: {
            config: {
              content = '',
              date = '',
              type_event: typeEvent = CORRECTION_TYPE_CORRECTION,
            } = {},
          } = {},
          _id,
        }) => {
          const datetime = formatDateLocalTimeZone(date, '-', true, false)
          const [fullYear = '', month = '', day = ''] =
            datetime.split('-') || []
          const time = `${day}-${month}-${fullYear}`
          const msgCorrection =
            typeEvent === CORRECTION_TYPE_CORRECTION
              ? 'Corrección del '
              : 'Aclaración del '
          return (
            <div key={_id} className={classes.box}>
              <a itemProp="url" href={websiteLink}>
                <h3 itemProp="name" className={classes.title}>
                  {title}
                </h3>
              </a>
              <div className={classes.content}>
                <span className={classes.time}>
                  {msgCorrection}
                  {time}
                </span>
                {content}
              </div>
            </div>
          )
        }
      )}
    </>
  )
}

export default StoriesListsCardChildItem
