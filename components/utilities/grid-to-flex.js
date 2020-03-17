;(() => {
  setTimeout(() => {
    const ua = window.navigator.userAgent
    const msie = ua.indexOf('MSIE ')
    const trident = ua.indexOf('Trident/')
    if (msie > 0 || trident > 0) {
      document.querySelectorAll('.grid').forEach(grid => {
        grid.classList.replace('grid', 'ie-flex')
      })
    }
  }, 0)
})()
