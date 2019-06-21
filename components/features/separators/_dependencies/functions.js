const QTY_STORY_DESKTOP = 5
const QTY_STORY_TABLET = 3
const QTY_STORY_MOBILE = 1

const MAX_SIZE_SCREEN_TABLET = 1024
const MAX_SIZE_SCREEN_MOBILE = 640

export const getStoriesQty = (isMobile, isTablet) => {
  let storiesQty = QTY_STORY_DESKTOP
  if (isMobile) storiesQty = QTY_STORY_MOBILE
  else if (isTablet) storiesQty = QTY_STORY_TABLET
  return storiesQty
}

export const sizeDevice = width => ({
  isMobile: width < MAX_SIZE_SCREEN_MOBILE,
  isTablet: width >= MAX_SIZE_SCREEN_MOBILE && width < MAX_SIZE_SCREEN_TABLET,
  isDesktop: width >= MAX_SIZE_SCREEN_TABLET,
})
