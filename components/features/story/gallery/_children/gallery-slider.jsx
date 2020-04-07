import React from 'react'
import {
  SITE_ELCOMERCIOMAG,
  SITE_DEPOR,
} from '../../../../utilities/constants/sitenames'
import AdsFotogaleria from '../../../../global-components/ads'
import StoryHeaderChildPicture from './picture'

const classes = {
  elementsSlider: 'story-gallery-slider p-20 bg-primary flex',
  element: 'story-gallery-slider__item',
  body: 'position-relative overflow-hidden w-full',
  content: 'story-gallery-slider__content flex',
  figure: 'story-gallery-slider__figure position-relative',
  image: 'story-gallery-slider__img w-full object-cover',
  caption: 'story-gallery-slider__caption pt-20 pb-20 ',
  captionImage: `story-gallery-slider__caption-image pt-5 text-sm text-white secondary-font line-h-sm`,
  quantity: `story-gallery-slider__quantity title-xs mr-10 flex items-center justify-center i-survey-share`,
  leftArrow: `story-gallery-slider__arrows story-gallery-slider__arrows--left icon-left text-white title-lg flex items-center justify-center h-full position-absolute top-0`,
  rightArrow: `story-gallery-slider__arrows story-gallery-slider__arrows--right icon-right text-white title-lg flex items-center justify-center h-full position-absolute top-0`,
}

const StoryHeaderChildGallerySlider = props => {
  const {
    contentElementGallery: { content_elements: contentElements = [] },
    defaultImageGallery,
  } = props || {}

  const totalSlides = contentElements.length
  const sliders = contentElements
  const sliderWidth = totalSlides * 100
  const slideWidth = 100 / totalSlides

  const sliderStyle = {
    width: `${sliderWidth}%`,
  }
  const slideStyle = {
    width: `${slideWidth}%`,
  }

  const handleGallery = `(
      function(){window.addEventListener('DOMContentLoaded', function(){
        setTimeout(function(){
          var currentSlide = 1;
          var slideWidth = 100 / ${totalSlides};
          var dragFlag = false;
          var initPointDrag = 0;
          var initPositionList = 0;
          var distDrag = 0;
          var limitDrag = 40;
          var listPositionPx = 0;
  
          var $slider = document.querySelector('.story-gallery-slider__content')
  
          function _getNewPosition() { return (currentSlide - 1) * -slideWidth; }
  
          function _getUrlGalleryImage(slide) {
            var origin = window.location.origin
            var pathname = window.location.pathname
            var search = window.location.search
            var querys = ''
            if (search !== '') {
              querys = search.includes('foto=')
                ? search.replace(/foto=[0-9]+/, 'foto='+slide+'')
                : ''+search+'&foto='+slide+''
            } else querys = '?foto='+slide+''
            return ''+origin+pathname+querys+''
          }
  
          function _handleNextSlider(){
            var nextSlide = currentSlide + 1
            if (nextSlide <= ${totalSlides}) {
              currentSlide = nextSlide
              window.history.pushState(null, '', _getUrlGalleryImage(nextSlide))
              _setListPosition(_getNewPosition(), '%')
            } else {
              var urlGalery = Fusion.arcSite === '${SITE_DEPOR}' ? '/muchafoto/' : '/'
              urlGalery = Fusion.arcSite === '${SITE_ELCOMERCIOMAG}' ? '/fotos/' : '/'
              window.location.href = urlGalery
            }
          }
  
          function _handlePrevSlider(){
            var prevSlide = currentSlide - 1
            if (prevSlide >= 1) {
              currentSlide = prevSlide
              window.history.pushState(null, '', _getUrlGalleryImage(prevSlide))
              _setListPosition(_getNewPosition(), '%')
            }
          }
  
          function _initDrag(e){
            dragFlag = true
            initPointDrag = e.offsetX || e.changedTouches[0].clientX
            var listWidth = $slider.getBoundingClientRect().width
            var matchP = $slider.style.transform.match(/\\((-?)(\\d+)%\\)/)
            var percentPosition = matchP[1] !== '' ? -matchP[2] : matchP[2]
            listPositionPx = (listWidth * percentPosition) / 100
            $slider.style.transform = 'translateX('+listPositionPx+'px)'
          }
  
          function _endDrag(){
            dragFlag = false
            if (
              distDrag < limitDrag ||
              currentSlide === 0 ||
              currentSlide === ${totalSlides}
            ) 
            _setListPosition(_getNewPosition(), '%')
            distDrag = 0
          }
  
          function _moveDrag(e){
            if (dragFlag) {
              var change = e.changedTouches
              var dir = ''
              if (e.movementX) dir = e.movementX > 0 ? 'left' : 'right'
              if (change && change[0])
                dir =
                  change[0].clientX - initPointDrag > 0 ? 'left' : 'right'
  
              var posX = e.offsetX || change[0].clientX
              _drag(dir, posX)
            }
          }
  
          function _drag(direction, posX) {
            if(direction === 'right') distDrag = posX - initPointDrag
            else distDrag = -(initPointDrag - posX)
  
            if (
              (direction === 'right' && currentSlide < ${totalSlides} - 1) ||
              (direction === 'left' && currentSlide > 0)
            ) _setListPosition(listPositionPx + distDrag, 'px')
  
            if (Math.abs(distDrag) > limitDrag) {
              if (direction === 'right') _handleNextSlider()
              else _handlePrevSlider()
              _endDrag()
            }
          }
  
          function _setListPosition(pos, unit) {
            $slider.style.transform = 'translateX('+pos+unit+')'
          }
  
          document.addEventListener('keydown', function(e) {
            if (e.keyCode === 39) _handleNextSlider()
            else if (e.keyCode === 37) _handlePrevSlider()
          })
          document.getElementById('icon-left').addEventListener('click', function(){
            _handlePrevSlider()
          })
          document.getElementById('icon-right').addEventListener('click', function(){
            _handleNextSlider()
          })
  
          if ($slider && $slider !== null) {
            $slider.addEventListener('mousedown', _initDrag)
            $slider.addEventListener('mouseup', _endDrag)
            $slider.addEventListener('mousemove', _moveDrag)
      
            $slider.addEventListener('touchstart', _initDrag, { passive: true })
            $slider.addEventListener('touchend', _endDrag, { passive: true })
            $slider.addEventListener('touchmove', _moveDrag, { passive: true })
          }
        }, 0)
      })}
    )()`

  return (
    <>
      {sliders.length > 0 && (
        <section className={classes.elementsSlider} id="story-galery">
          <div
            role="slider"
            aria-valuenow={sliders.length}
            aria-valuemin="1"
            aria-valuemax="10"
            className={classes.body}>
            <ul id="galery-ul" style={sliderStyle} className={classes.content}>
              {sliders.map((slide, i) => (
                <li
                  key={slide._id}
                  style={slideStyle}
                  className={classes.slide}>
                  <div className={classes.figure}>
                    <StoryHeaderChildPicture
                      {...slide}
                      defaultImageGallery={defaultImageGallery}
                      i={i}
                    />
                  </div>
                  <figcaption className={classes.caption}>
                    <span className={classes.quantity}>
                      {i + 1}/{sliders.length}
                    </span>
                    <p className={classes.captionImage}>
                      {' '}
                      {slide.caption || slide.subtitle}
                    </p>
                  </figcaption>
                </li>
              ))}
            </ul>
            <i
              role="button"
              tabIndex="0"
              id="icon-left"
              className={classes.leftArrow}
            />
            <i
              role="button"
              tabIndex="0"
              id="icon-right"
              className={classes.rightArrow}
            />
          </div>
          <AdsFotogaleria adElement="fotogaleria1" isDesktop isMobile={false} />
          <script dangerouslySetInnerHTML={{ __html: handleGallery }}></script>
        </section>
      )}
    </>
  )
}

export default StoryHeaderChildGallerySlider
