/*
@-webkit-keyframes pulse {
  0%,
  90% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  91%,
  93% {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0.9;
  }
  95% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
@keyframes pulse {
  0%,
  90% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  91%,
  93% {
    -webkit-transform: scale(1.04);
    transform: scale(1.04);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0.9;
  }
  95% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
#SPC_Anchor_Content h1.stories-title {
  font-weight: 400;
  color: #000;
  text-align: left;
  font-size: 14px;
  margin: 10px 0 5px 5px;
  padding: 0 0 2px 5px;
  font-family: Roboto, Arial, sans-serif;
  text-transform: uppercase;
}
#SPC_Anchor_Content .stories {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0 5px;
  position: relative;
  height: 100px;
  overflow: auto hidden;
}
#SPC_Anchor_Content .stories::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
}
#SPC_Anchor_Content .stories:after {
  content: '';
  flex: 0 0 5px;
}
#SPC_Anchor_Content a.story,
#SPC_Anchor_Content a.story:hover,
#SPC_Anchor_Content a.story:link,
#SPC_Anchor_Content a.story:visited {
  display: flex;
  flex: 0 0 0;
  text-decoration: none;
  width: 100px;
  min-width: 70px !important;
  max-width: 70px !important;
  margin: 6px auto;
  color: #fff;
}
#SPC_Anchor_Content .story-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
}
#SPC_Anchor_Content .story-content-img {
  width: 50px;
  height: 50px;
  padding: 2px;
  border-radius: 50%;
  background-size: 400% 400% !important;
  background: #763db8;
  background: -moz-linear-gradient(
    45deg,
    #763db8 0,
    #e13f7a 40%,
    #ffd46e 80%,
    #f79e52 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #763db8 0,
    #e13f7a 40%,
    #ffd46e 80%,
    #f79e52 100%
  );
  background: linear-gradient(
    45deg,
    #763db8 0,
    #e13f7a 40%,
    #ffd46e 80%,
    #f79e52 100%
  );
}
#SPC_Anchor_Content .story-content-img img {
  display: inline-block;
  vertical-align: top;
  width: 46px;
  height: 46px;
  object-fit: cover;
  border-radius: 100%;
  border: 2px solid #fff;
  box-sizing: border-box;
}
#SPC_Anchor_Content .story-content-img,
#SPC_Anchor_Content .story-content-img img {
  animation: pulse 6s ease-in-out infinite both;
  animation-delay: calc(0.04s + (0.1s * var(--index)));
  transition-property: transform;
  transition-property: opacity, width, height;
  transition-delay: calc(0.04s + (0.1s * var(--index)));
}
#SPC_Anchor_Content .story-content-title {
  font-size: 12px;
  text-align: center;
  color: #262626;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Roboto, Arial, sans-serif;
}
*/

export const stylesStoryWidget = `@-webkit-keyframes pulse{0%,90%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1}91%,93%{-webkit-transform:scale(1.03);transform:scale(1.03);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:.9}95%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1}}@keyframes pulse{0%,90%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1}91%,93%{-webkit-transform:scale(1.04);transform:scale(1.04);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:.9}95%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:center center;transform-origin:center center;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;opacity:1}}#SPC_Anchor_Content h1.stories-title{font-weight:400;color:#000;text-align:left;font-size:14px;margin:10px 0 5px 5px;padding:0 0 2px 5px;font-family:Roboto,Arial,sans-serif;text-transform:uppercase}#SPC_Anchor_Content .stories{display:flex;flex-direction:row;justify-content:left;padding:0 5px;position:relative;height:100px;overflow:auto hidden}#SPC_Anchor_Content .stories::-webkit-scrollbar{display:none;-ms-overflow-style:none}#SPC_Anchor_Content .stories:after{content:"";flex:0 0 5px}#SPC_Anchor_Content a.story,#SPC_Anchor_Content a.story:hover,#SPC_Anchor_Content a.story:link,#SPC_Anchor_Content a.story:visited{display:flex;flex:0 0 0;text-decoration:none;width:100px;min-width:70px!important;max-width:70px!important;margin:6px auto;color:#fff}#SPC_Anchor_Content .story-content{display:flex;flex-wrap:wrap;justify-content:center;max-width:100%}#SPC_Anchor_Content .story-content-img{width:50px;height:50px;padding:2px;border-radius:50%;background-size:400% 400%!important;background:#763db8;background:-moz-linear-gradient(45deg,#763db8 0,#e13f7a 40%,#ffd46e 80%,#f79e52 100%);background:-webkit-linear-gradient(45deg,#763db8 0,#e13f7a 40%,#ffd46e 80%,#f79e52 100%);background:linear-gradient(45deg,#763db8 0,#e13f7a 40%,#ffd46e 80%,#f79e52 100%)}#SPC_Anchor_Content .story-content-img img{display:inline-block;vertical-align:top;width:46px;height:46px;object-fit:cover;border-radius:100%;border:2px solid #fff;box-sizing:border-box}#SPC_Anchor_Content .story-content-img,#SPC_Anchor_Content .story-content-img img{animation:pulse 6s ease-in-out infinite both;animation-delay:calc(.04s + (.1s * var(--index)));transition-property:transform;transition-property:opacity,width,height;transition-delay:calc(.04s + (.1s * var(--index)))}#SPC_Anchor_Content .story-content-title{font-size:12px;text-align:center;color:#262626;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:Roboto,Arial,sans-serif}`
