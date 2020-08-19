/* eslint-disable import/prefer-default-export */
export const powaStyles = image => ({
  '.powa-shot': {
    position: 'absolute',
    color: 'rgb(240, 248, 255)',
    zIndex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  '.powa-shot-title': {
    fontSize: 'x-large',
    textShadow: '2px 2px 3px rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: '15px',
    left: '15px',
  },
  '.powa-shot-image': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundImage: `url('${image}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  '.powa-shot-video': {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  '.powa-shot-video-toggle': {
    position: 'absolute',
    bottom: '5px',
    right: '5px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '1em',
    width: '1em',
    borderRadius: '1em',

    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.25)',

    cursor: 'pointer',
    transition: 'all 0.25s',
    zIndex: 1,
  },
  '.powa-shot-video-toggle:hover': {
    color: 'rgb(153, 50, 204)',
  },
  '.powa-shot-video-toggle-icon': {
    opacity: '0.5',
  },
  '.powa-shot-play-btn': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: '4em',
    width: '4em',
    borderRadius: '2em',
    boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.25)',

    backgroundColor: 'rgba(0, 0, 0, 0.25)',

    cursor: 'pointer',
    transition: 'all 0.25s',
    zIndex: 1,
  },
  '.powa-shot-play-btn:hover': {
    color: 'rgb(153, 50, 204)',
  },
  '.powa-shot-play-icon': {
    opacity: '0.85',
  },
  '.powa-shot-loading-icon': {
    opacity: '0.85',
  },
})
