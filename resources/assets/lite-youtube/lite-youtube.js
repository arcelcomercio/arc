window.ytPreconnected = false

const warmConnections = () => {
  if (window.ytPreconnected || !window.addPrefetch)
  return;

  // La mayoria de los recursos vienen de youtube.com
  window.addPrefetch('preconnect', 'https://www.youtube.com');
  // El botguard script viene desde google.com
  window.addPrefetch('preconnect', 'https://www.google.com');
  // TODO: No estoy seguro de que estos dominios esten en el critical path
  window.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
  window.addPrefetch('preconnect', 'https://static.doubleclick.net');
  
  window.ytPreconnected = true;
}

const addIframe = (lytVideo) => {
  // Se encodea y elimina `lyt-` del ID
  const videoId = encodeURIComponent(lytVideo.getAttribute('id').substring(4)) 
  const iframeHTML = `
  <iframe frameborder="0"
    style="position:absolute;width:100%;height:100%;"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
    src="https://www.youtube.com/embed/${videoId}?autoplay=1"
  ></iframe>
  `
  lytVideo.insertAdjacentHTML('beforeend', iframeHTML)
  lytVideo.classList.add('lyt-activated');
}

const initListeners = (element) => {
  element.addEventListener('pointerover', warmConnections, {
    once: true,
  });
  element.addEventListener('click', () => addIframe(element));  
}

const initIntersectionObserver = (element) => {
  if ('IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window) {
      const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0,
      };
      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                if(entry.target.className.includes('auto')) {
                  warmConnections();
                  addIframe(entry.target);
                } else {
                  initListeners(entry.target)
                }
                observer.unobserve(entry.target);
              }
          });
      }, options);
      observer.observe(element);
  }
}

const initLiteYoutube = () => {
  const lytVideos = Array.from(document.querySelectorAll('.lyt-container'))
  lytVideos.forEach(lyt => {
    lyt.className.includes('lyt-lazy') 
      ? initIntersectionObserver(lyt) 
      : initListeners(lyt)   
  })
}

window.requestIdle 
  ? window.requestIdle(() => initLiteYoutube())
  : setTimeout(() => initLiteYoutube(), 1)

