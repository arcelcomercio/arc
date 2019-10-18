/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import LazyLoad from 'vanilla-lazyload'

const lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazy',
})

if (lazyLoadInstance) {
  lazyLoadInstance.update()
}

/* (() => {
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      const lazyImages = [].slice.call(document.getElementsByClassName('lazy'))

      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      ) {
        const lazyImageObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const lazyImage = entry.target
                if (lazyImage.src) lazyImage.src = lazyImage.dataset.src
                if (lazyImage.srcset)
                  lazyImage.srcset = lazyImage.dataset.srcset
                lazyImage.classList.remove('lazy')
                lazyImageObserver.unobserve(lazyImage)
              }
            })
          }
        )

        lazyImages.forEach(lazyImage => {
          lazyImageObserver.observe(lazyImage)
        })
      } else {
        lazyImages.forEach(lazyImage => {
          if (lazyImage.src) lazyImage.src = lazyImage.dataset.src
          if (lazyImage.srcset) lazyImage.srcset = lazyImage.dataset.srcset
          lazyImage.classList.remove('lazy')
        })
      }
    })
  }
})() */
