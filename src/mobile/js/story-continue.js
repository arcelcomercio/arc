export default () => {
  const progressBar = document.querySelector('.sty-continue__progress')

  document.addEventListener('scroll', () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      // window.location.href = '/'
    }
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <=
      360
    ) {
      progressBar.style.transform = `rotate(${360 -
        (document.documentElement.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop))}deg)`
    }
  })
}
