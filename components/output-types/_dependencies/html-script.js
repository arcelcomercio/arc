/*
  const htmlObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
            const node = document.createElement('script')
  node.type = 'text/javascript'
  node.src = 'https://graphics.afpforum.com/vendors/pym/pym.v1.min.js'
  document.head.append(node)

      observer.unobserve(target)
    }
  })
}

requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const iframes = Array.from(document.body.querySelectorAll('.story-content__embed'))
    const observer = new IntersectionObserver(htmlObserver, options)
    iframes.forEach(iframe => {
        observer.observe(iframe)
    })
  }
})
*/

const iframeScript = `  const htmlObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const node = document.createElement('script')
      node.type = 'text/javascript'
      node.src = 'https://graphics.afpforum.com/vendors/pym/pym.v1.min.js'
      document.head.append(node)
      observer.unobserve(target)
    }
  })
}

requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const iframes = Array.from(document.body.querySelectorAll('.story-content__embed'))
    const observer = new IntersectionObserver(htmlObserver, options)
    iframes.forEach(iframe => {
        observer.observe(iframe)
    })
  }
})`

export default iframeScript
