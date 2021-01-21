import React from 'react';

const classes = {
    container: 'headband__fixedvideo__container',
    boxVideo: 'headband__fixedvideo__box-video',
    titleStory: 'headband__fixedvideo__title-story',
    image: 'headband__fixedvideo__image',
    boxTimerLive: 'headband__fixedvideo__box-timer-live',
    timer: 'headband__fixedvideo__timer',
    live: 'headband__fixedvideo__live',
  
  }

const FixedVideo = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.boxVideo}>
                <img className={classes.image} src="" alt="" />
                <div className={classes.boxTimerLive}>
                    <div className={classes.live}>EN VIVO</div>
                </div>
            </div>
            <div className={classes.titleStory}>
                Ministro Incháustegui: Esta semana se aprobaría cambio regulatorio
            </div>
        </div>
    );
}

export default FixedVideo;