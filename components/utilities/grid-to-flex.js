;(() => {
  setTimeout(() => {
    const ua = window.navigator.userAgent
    const msie = ua.indexOf('MSIE ')
    const trident = ua.indexOf('Trident/')
    if (msie > 0 || trident > 0) {
      ;[].slice.call(document.getElementsByClassName('grid')).forEach(grid => {
        // eslint-disable-next-line no-param-reassign
        grid.className = grid.className.replace('grid', 'ie-flex')
      })
    }
  }, 0)
})()
