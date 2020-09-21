window.ytPreconnected = false

const warmConnections = () => {
  if (window.ytPreconnected)
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
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
    src="https://www.youtube.com/embed/${videoId}?autoplay=1"
  ></iframe>
  `
  lytVideo.insertAdjacentHTML('beforeend', iframeHTML)
  lytVideo.classList.add('lyt-activated');
}

const lytVideos = Array.from(document.querySelectorAll('.lyt-container'))
console.log('------>', lytVideos)
lytVideos.forEach(lyt => {
  lyt.addEventListener('pointerover', warmConnections, {
    once: true,
  });
  lyt.addEventListener('click', () => addIframe());        
})

