document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    if ('IntersectionObserver' in window) {
      const verticalGallerySlides = Array.from(document.getElementsByClassName("gvi"))
      const TOTAL_GALLERY_SLIDES = verticalGallerySlides.length
      
      const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.dataLayer = window.dataLayer || []; 
            window.dataLayer.push({ 'event': 'vertical_gallery', 'foto': [parseInt(entry.target.dataset.slideNumber,10),TOTAL_GALLERY_SLIDES] });
            galleryObserver.unobserve(entry.target)
          }
        })
      }, {
        rootMargin: '0px 0px -400px 0px',
      })

      if(verticalGallerySlides) {
        verticalGallerySlides.forEach(gallerySlide => {
          galleryObserver.observe(gallerySlide)
        })
      }
    }
  })
})