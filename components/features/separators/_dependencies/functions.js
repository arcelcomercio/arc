const STORIES_QTY_DESKTOP = 5
const STORIES_QTY_TABLET = 3
const STORIES_QTY_MOBILE = 1

const SCREEN_MAX_SIZE_TABLET = 1023
const SCREEN_MAX_SIZE_MOBILE = 639

export const getStoriesQty = (isMobile, isTablet) => {
  let storiesQty = STORIES_QTY_DESKTOP
  if (isMobile) storiesQty = STORIES_QTY_MOBILE
  else if (isTablet) storiesQty = STORIES_QTY_TABLET
  return storiesQty
}

export const sizeDevice = width => ({
  isMobile: width < SCREEN_MAX_SIZE_MOBILE,
  isTablet: width >= SCREEN_MAX_SIZE_MOBILE && width < SCREEN_MAX_SIZE_TABLET,
  isDesktop: width >= SCREEN_MAX_SIZE_TABLET,
})