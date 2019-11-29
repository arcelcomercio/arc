export default () => {
  const progressBar = document.querySelector('.sty-continue__progress')
  const URLS_STORAGE = '_recents_articles_'

  const { MobileContent: { recentStories = [] } = {} } = window || {}
  const currentStorageUrls = window.sessionStorage.getItem(URLS_STORAGE) || []

  if (!currentStorageUrls.length === 0) {
    window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(recentStories))
  }

  /* const loadNextUrlStorage = () => {
    
  } */

  document.addEventListener('scroll', () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
      360
    ) {
      progressBar.style.transform = `rotate(${360 -
        (document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop))}deg)`

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        // window.location.href = '/'
      }
    }
  })
}
