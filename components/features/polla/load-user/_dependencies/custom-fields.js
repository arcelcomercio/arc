import PropTypes from 'prop-types'

const customFields = {
  userInfo: PropTypes.richtext.tag({
    name: 'ArcId.USER_INFO',
  }),
  userProfile: PropTypes.richtext.tag({
    name: 'ArcId.USER_PROFILE',
  }),
}

export default customFields