window.addEventListener('load', () => {
  function sendMessage() {
    window.top.postMessage({
      id: 'story_iframe',
      storyHeight: document.documentElement.offsetHeight + "px"
    }, location.origin)
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
      const intersectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isCurrentStory = true
          } else {
            isCurrentStory = false
            sendMessage()
            resizerObserver.unobserve(entry.target)
            intersectionObserver.unobserve(entry.target)
          }
        })
      }, {rootMargin: '0px'})
      intersectionObserver.observe(document.body)
    } else {
      let timer = null
      let messagesCounter = 0
      function setTimer() {
        sendMessage()
        messagesCounter = messagesCounter + 1
        if(messagesCounter = 5) {
          clearTimeout(timer)
        }
        timer = setTimeout(setTimer, 3000);
      }
      setTimer()
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