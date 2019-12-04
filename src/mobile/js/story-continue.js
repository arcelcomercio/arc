export default () => {
  const progressBar = document.querySelector('.sty-continue__progress')
  const URLS_STORAGE = '_recents_articles_'

  const { MobileContent: { recentStories = [] } = {} } = window || {}

  const currentStorageUrls =
    JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || []

  const isSameRecentContent = recentStories.includes(currentStorageUrls[0])

  if (currentStorageUrls.length === 0 || !isSameRecentContent) {
    window.sessionStorage.removeItem(URLS_STORAGE)
    window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(recentStories))
  }

  const loadNextUrlStorage = () => {
    const auxStorageUrls =
      JSON.parse(window.sessionStorage.getItem(URLS_STORAGE)) || []

    window.sessionStorage.removeItem(URLS_STORAGE)
    window.sessionStorage.setItem(
      URLS_STORAGE,
      JSON.stringify(auxStorageUrls.slice(1))
    )

    window.location.href = auxStorageUrls[0] || '/'
  }

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
        loadNextUrlStorage()
      }
    }
  })
}
