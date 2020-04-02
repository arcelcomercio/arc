import React from 'react'

const classes = {
  icon: 'm-icon pos-abs',
}

const MultimediaIcon = ({ type }) => {
  switch (type) {
    case 'basic_gallery':
      return (
        <svg
          className={classes.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="46"
          viewBox="0 0 46 46">
          <path d="M7.1 30.8V11.1H4C1.8 11.1 0 12.9 0 15.1v26.7c0 2.2 1.8 4.1 4 4.1h26.7c2.2 0 4.1-1.8 4.1-4.1v-2.9H15.2C10.7 38.9 7.1 35.3 7.1 30.8z" />
          <path d="M41.9 0.1H15.2c-2.2 0-4.1 1.8-4.1 4.1v26.7c0 2.2 1.8 4.1 4.1 4.1h26.7c2.2 0 4.1-1.8 4.1-4.1V4.1C46 1.9 44.2 0.1 41.9 0.1zM41.4 28.6c-0.2 0.4-0.7 0.7-1.1 0.7H17.3c-0.4 0-0.8-0.2-1-0.5 -0.2-0.3-0.3-0.7-0.2-1.1l3.3-10.8c0.2-0.7 0.8-1.2 1.6-1.4 0.7-0.1 1.5 0.2 1.9 0.8l4.6 6.4c0.6 0.9 1.8 1.1 2.7 0.5l4.2-2.9c0.4-0.3 1-0.4 1.5-0.3 0.5 0.1 1 0.4 1.3 0.8l4.2 6.5C41.6 27.7 41.6 28.2 41.4 28.6z" />
        </svg>
      )

    case 'basic_video':
      return (
        <svg
          className={classes.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="46"
          viewBox="0 0 46 46">
          <path d="M23 0C10.3 0 0 10.3 0 23 0 35.7 10.3 46 23 46 35.7 46 46 35.7 46 23 46 10.3 35.7 0 23 0ZM31.1 24L19.9 31.6C19.5 31.9 19 31.9 18.6 31.7 18.2 31.5 18 31.1 18 30.6L18 15.4C18 14.9 18.2 14.5 18.6 14.3 19 14.1 19.5 14.1 19.9 14.4L31.1 22C31.4 22.2 31.6 22.6 31.6 23 31.6 23.4 31.4 23.8 31.1 24ZM31.1 24" />
        </svg>
      )

    default:
      return ''
  }
}

export default MultimediaIcon
