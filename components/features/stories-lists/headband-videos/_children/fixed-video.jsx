import React, {useState} from 'react';

const classes = {
    container: 'headband__fixedvideo__container',
    boxVideo: 'headband__fixedvideo__box-video',
    titleStory: 'headband__fixedvideo__title-story',
    image: 'headband__fixedvideo__image',
    boxTimerLive: 'headband__fixedvideo__box-timer-live',
    timer: 'headband__fixedvideo__timer',
    live: 'headband__fixedvideo__live',
    close: 'headband__fixedvideo__close',
    resize: 'headband__fixedvideo__resize',
  }

const FixedVideo = (props) => {
    const {active, setActive} = props

    console.log("========ACT=========")
    console.log(active)
    console.log("====================")

    const [scrolled, setScrolled] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const _handleScroll = () => {
        const { body = {}, documentElement = {} } = document
        const { scrollTop: scrollBody = 0 } = body
        const { scrollTop: scrollElement = 0 } = documentElement
        const scroll = scrollBody || scrollElement
    
        const header = Array.from(document.getElementsByTagName('header'))
        const headerTop = (header[0] && header[0].offsetTop) || 0
    
    
        if (!scrolled && scroll > headerTop) {
          setScrolled(true)
        } else if (scrolled && scroll <= headerTop) {
          setScrolled(false)
        }
    }

    const resizeVideo = () => {
        setExpanded(!expanded)
    }

    if(typeof(window) !== 'undefined'){
        window.addEventListener('scroll', _handleScroll)
    }

    return (
        <div className={`${classes.container} ${expanded ? 'expanded' : ''} ${active ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`}>
            <div className={classes.boxVideo}>
                <img className={classes.image} src="" alt="" />
                <div className={classes.boxTimerLive}>
                    <div className={classes.live}>EN VIVO</div>
                </div>
            </div>
            <div className={classes.titleStory}>
                Ministro Incháustegui: Esta semana se aprobaría cambio regulatorio
            </div>
            <div className={classes.close}><a href="#" onClick={setActive(false)}>Close</a></div>
            <div className={classes.resize}><a href="#" onClick={resizeVideo}>Resize</a></div>
        </div>
    );
}

export default FixedVideo;