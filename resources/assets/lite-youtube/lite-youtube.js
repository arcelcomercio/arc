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

// Se ejecuta cuando el reproductor se ha renderizado
function onPlayerReady(event) {
  // TODO: hacer isMobile una variable global
  // Cuando isMobile, se debe mutear el video para poder reproducir automaticamente
  if(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent))
    event.target.mute();
  event.target.playVideo();
}

const addIframe = (lytVideo) => {
  window.requestIdle(() => {
    const videoContainerId = lytVideo.getAttribute('id')
    // Se encodea y elimina `lyt-` del ID del contenedor
    const videoId = encodeURIComponent(videoContainerId.substring(4)) 
    // Se agrega esta clase para ocultar el boton custom de play
    lytVideo.parentNode.classList.add('lyt-activated')
    // Se crea el reproductor de Youtube
    new YT.Player(videoContainerId, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: { 'autoplay': 1, 'playsinline': 1 },
      events: {
        'onReady': onPlayerReady
      }
    });
  })
}

const initListeners = (element) => {
  element.addEventListener('pointerover', warmConnections, {
    once: true,
  });
  element.addEventListener('click', () => addIframe(element), {
    once: true,
  });  
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
  lytVideos.forEach(lyt => {
    lyt.className.includes('lyt-lazy') 
      ? initIntersectionObserver(lyt) 
      : initListeners(lyt)   
  })
}

// Este evento se dispara tan pronto la iframe API carga
function onYouTubeIframeAPIReady() {
  window.requestIdle(() => initLiteYoutube())
}

const loadYoutubeIframeAPI = () => {
  // Referencia iframe API https://developers.google.com/youtube/iframe_api_reference
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let lytVideos = []
window.requestIdle(() => {
  lytVideos = Array.from(document.body.querySelectorAll('.lyt-player')) 
  lytVideos.length > 0 && loadYoutubeIframeAPI()
})

