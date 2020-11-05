window.addEventListener('load', () => {
  function postHeightToParentDocument() {
    let storyHeight = document.documentElement.offsetHeight + "px"

    window.top.postMessage({
      id: 'story_iframe',
      storyHeight
    }, location.origin)
  }
  
  if('requestIdle' in window) {
    requestIdle(() => {
      postHeightToParentDocument()
    })
  } else {
    postHeightToParentDocument()
  }
})