document.addEventListener('DOMContentLoaded', () => {
  /* function _handleLinkClick () {
    const target = this.href
    window.top.postMessage({
      id: 'iframe_open_link',
      redirectUrl: target
    }, location.origin)
  } */

  requestIdle(() => {
    let links = Array.from(document.links);
    links.forEach(link => {
      if(!link.className.includes("share")) {
        link.target = "_blank"
      }
      // link.onclick = _handleLinkClick
    })
  })
})

window.addEventListener('load', () => {
  function sendMessage() {
    window.top.postMessage({
      id: 'story_iframe',
      storyHeight: document.documentElement.offsetHeight + "px"
    }, location.origin)
  }

  function postHeightToParentDocumentFallback(each = 3000, times = 5) {
    let timer = null
    let messagesCounter = 0
    function setTimer() {
      sendMessage()
      messagesCounter = messagesCounter + 1
      if(messagesCounter = times) {
        clearTimeout(timer)
      }
      timer = setTimeout(setTimer, each);
    }
    setTimer()
  }

  function postHeightToParentDocument() {
    if('ResizeObserver' in window && 'IntersectionObserver' in window) {
      const resizerObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          sendMessage()
        });
      });
    
      resizerObserver.observe(document.body);

      let isCurrentStory = false
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && isCurrentStory === false) {
            isCurrentStory = true
          } else if(isCurrentStory === true){
            isCurrentStory = false
            resizerObserver.unobserve(entry.target)
            intersectionObserver.unobserve(entry.target)
          }
        })
      }, {rootMargin: '0px'})
      intersectionObserver.observe(document.body)
      postHeightToParentDocumentFallback(3000, 2)
    } else {
      postHeightToParentDocumentFallback()
    }
  }
  
  if('requestIdle' in window) {
    requestIdle(() => {
      postHeightToParentDocument()
    })
  } else {
    setTimeout(() => {
      postHeightToParentDocument()
    }, 1)
  }
})