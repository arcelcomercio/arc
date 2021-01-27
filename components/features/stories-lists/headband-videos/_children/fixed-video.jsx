import React, {useState} from 'react';
import YoutubeVideo from './youtube-video';
import JwPlayerVideo from './jwplayer-video';

const classes = {
    container: 'headband__fixedvideo__container',
    firstBox: 'headband__fixedvideo__firstBox',
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
    const {active, 
           setActive, 
           dataVideo: {
               videoID, 
               videoTime, 
               title, 
               liveStory, 
               isAdmin, 
               account, 
               videoType = '', 
               image
           } = {}
        } = props

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

    const playerProps = {isAdmin, title, liveStory, videoID, account, videoTime, 'hasAds': false, image, 'imageDefault': image, 'autoPlayVideo': true}

    return (
        <div className={`${classes.container} ${active ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`}>
            { active && (
            <>
            <div className={`${classes.firstBox} ${expanded ? 'expanded' : ''}`}>
                <div className={classes.boxVideo}>
                    {active && (videoType === 'youtube_id') && (
                    <YoutubeVideo {...playerProps}></YoutubeVideo>
                    )}

                    {active && (videoType === 'basic_jwplayer') && (
                    <JwPlayerVideo {...playerProps}></JwPlayerVideo>
                    )}
                </div>
                <div className={classes.titleStory}>
                    {title}
                </div>
                <div className={classes.close}><button type="button" onClick={() => setActive(false)}>x</button></div>
            </div>
            <div className={classes.resize}><button type="button" onClick={resizeVideo}>Resize</button></div>
            </>
            )}
        </div>
    );
}

export default FixedVideo;