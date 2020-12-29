/*
const powaBoot = false;
const removeSticky = () => {
  const $itemDest = document.body.querySelector('.stories-video__item-dest')
  $itemDest.className = $itemDest.className.replace('sticky', '')
  $itemDest.className = $itemDest.className.replace('sticky-top', '')
}

const addSticky = (stickyTop = false) => {
  const $itemDest = document.body.querySelector('.stories-video__item-dest')
  $itemDest.className = $itemDest.className.concat(' sticky')
  if (stickyTop) $itemDest.className = $itemDest.className.concat(' sticky-top')
}

const handleScrollVideoList = () => {
  const $playOf = document.body.querySelector('.stories-video__wrapper')
  const itemHeight =
    $playOf.querySelector('.stories-video__item').offsetHeight * 4
  const promoContentHeight = $playOf.querySelector('.stories-video__content')
    .offsetHeight
  const programsWrapperHeight = $playOf.querySelector(
    '.stories-video__programs-wrapper'
  ).offsetHeight
  const storiesHeaderHeigth = $playOf.querySelector('.stories-video__header')
    .offsetHeight

  const scrollHeight = window.scrollY
  // si el scroll es mayor o igual a la suma de la distancia del componente a la parte supe.offsetHeight * 4rior y  el alto del componente
  const offsetButton =
    scrollHeight >=
    $playOf.offsetTop +
      $playOf.offsetHeight -
      (itemHeight + promoContentHeight + programsWrapperHeight)

  // si el scroll  mas el tamaño de la pantalla es menor a la distancia del componente a la parte superior de la pantalla
  const offSetTop =
    scrollHeight + window.innerHeight - storiesHeaderHeigth < $playOf.offsetTop
  let stickyTop = false

  if ((offsetButton || offSetTop) && scrollHeight === 0) {
    // si esta fuera de foco por arriba en la parte superior (top 0)
    stickyTop = true

    addSticky(stickyTop)
  } else if (offsetButton || offSetTop) {
    // si esta fuera de foco por (abajo y arriba)
    stickyTop = false
    removeSticky()
    addSticky(stickyTop)
  } else {
    removeSticky()
  }
}

const handleCloseStickyClick = powaPlayer => {
  if (powaPlayer !== null) {
    removeSticky()
    window.removeEventListener('scroll', handleScrollVideoList)
    powaPlayer.pause()
  }
}

const powaScript  = ({ src, async, defer, textContent = '' }) => {
      const node = document.createElement('script')
      if (src) {
        node.type = 'text/javascript'
        node.src = src
      }
      if (async) {
        node.async = true
      }
      if (defer) {
        node.defer = true
      }
      node.textContent = textContent
      return document.body.append(node)
}

const handleSticky = (autoPlayVideo = false) => {
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    const {
      detail: { powa },
    } = event

    powa.on(window.PoWa.EVENTS.PLAY, () => {
      window.addEventListener('scroll', handleScrollVideoList)
    })

    powa.on(window.PoWa.EVENTS.END, () => {
      removeSticky()
      window.removeEventListener('scroll', handleScrollVideoList)
    })

    if (
      !isMobile &&
      // !isAdmin &&
      autoPlayVideo &&
      powa &&
      powa.play &&
      !powa.isPlay
    ) {
      powa.play()
      powa.isPlay = true
    }

    document.body
      .querySelector('.stories-video__close')
      .addEventListener('click', () => handleCloseStickyClick(powa))
  })
}

const executeVideoList = () => {
  // Es importante que esto se mantenga como function() {}
  // por el uso de "this", si se usara () => {} el "this"
  // no funcionaria aqui.

  function handleVideoClick() {
    // Se recolecta el listado de videos como nodos y array
    const $videosListAux = document.body.querySelector(
      '.stories-video__list-wrapper'
    )
    const videoItemsListAux = $videosListAux
      ? [].slice.call($videosListAux.children)
      : []

    // Se reordena el array poniendo el clickeado primero
    videoItemsListAux.unshift(
      videoItemsListAux.splice(
        videoItemsListAux.findIndex(video => video === this),
        1
      )[0]
    )

    const VIDEO = 'basic_video'
    const ELEMENT_YOUTUBE_ID = 'youtube_id'
    const VIDEO_JWPLAYER = 'basic_jwplayer'
    const PROMOTED_ITEM_CLASSNAME = 'stories-video__item-dest w-full'
    const UNPROMOTED_ITEM_CLASSNAME =
      'stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer'
    const LIVE = '<p itemprop="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>'
    const YOUTUBE_LIVE = '<p itemprop="description" class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>'

    const youtubePromotedTemplate = ({
      title,
      image,
      imageDefault,
      video,
      live,
    }) => '<div class="stories-video__youtube position-relative"><iframe src="'+video+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Video" data-img="'+image+'" data-img-default="'+imageDefault+'"></iframe>'+live+'</div><div class="pt-20 pl-20 pr-20 pb-10 w-full"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+title+'</h2></div></div>'

    const youtubeUnpromotedTemplate = ({
      title,
      image,
      imageDefault,
      video,
      live,
    }) => '<img src="'+image+'" alt="'+title+'" class="stories-video__item-'+imageDefault+' w-full h-full object-cover object-center mr-15" data-video="'+video+'"><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+title+'</h2>'+live+'</div>'

    const powaPromotedTemplate = ({ title, image, video, live, time, script }) => '<div data-img="'+image+'" data-time="'+time+'" data-live="'+live+'"><div class="powa" id="powa-'+video.uuid+'" data-org="elcomercio" data-env="'+video.env+'" data-stream="'+video.stream+'" data-uuid="'+video.uuid+'" data-aspect-ratio="0.562" data-api="'+video.env+'"></div></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+title+'</h2></div><span role="button"tabIndex="0"class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>'+script



    const powaUnpromotedTemplate = ({ title, image, video, live, time }) => '<img src="'+image+'" alt="'+title+'" class="stories-video__item-img w-full h-full object-cover object-center mr-15" data-env="'+video.env+'" data-stream="'+video.stream+'" data-uuid="'+video.uuid+'"><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">'+time+'</span><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+title+'</h2>'+live+'</div>'


    const jwplayerPromotedTemplate = ({ title = '', image = '', video = '', live = '', time = '' }) => '<div data-img="'+image+'" data-time="'+time+'" data-live="'+live+'"><script src="https://cdn.jwplayer.com/players/'+video.uuid+'-'+video.stream+'.js"></script><div data-time="'+duration+'" class="jwplayer-lazy" id="botr_'+video.uuid+'_'+video.stream+'_div"></div><figcaption class="story-content__caption">'+title+'</figcaption></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 itemProp="name" class="stories-video__item-dest-title text-white">'+title+'</h2></div><span role="button" tabIndex="0" class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>';

    const jwplayerUnpromotedTemplate = ({ title = '', image = '', video = '', live = '', time = '' }) => '<img src="'+image+'" alt="'+title+'" class="lazy" data-stream="'+video.stream+'" data-uuid="'+video.uuid+'" account="'+account+'"/><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">'+time+'</span><div class="stories-video__item-text text-white"><h2 itemProp="name" class="stories-video__item-title text-white mb-10">'+title+'</h2>'+live+'</div>';

    const jwplayerLive = '<p itemProp="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>';

    // Este item debe volverse destacado
    const $promotedItem = videoItemsListAux[0]

    console.log('$promotedItem', $promotedItem)

    if ($promotedItem.dataset.type === ELEMENT_YOUTUBE_ID) {

      // Recolecta todos los valores necesarios
      const $promoItemImageTag = $promotedItem.querySelector('img')
      const promoItemImageDefault =
        $promoItemImageTag.className.indexOf('stories-video__item-default') > 0
      const promoItemTitle = $promoItemImageTag.alt
      const promoItemImage = $promoItemImageTag.src
      const promoItemVideo = $promoItemImageTag.dataset.video
      const promoItemLive = !!$promoItemImageTag.querySelector(
        '.stories-video__item-live'
      )

      // Convierte el elemento en destacado
      $promotedItem.className = PROMOTED_ITEM_CLASSNAME
      $promotedItem.innerHTML = youtubePromotedTemplate({
        title: promoItemTitle,
        image: promoItemImage,
        imageDefault: promoItemImageDefault,
        video: promoItemVideo.indexOf('?autoplay=1' > 0) ? promoItemVideo : promoItemVideo.concat('?autoload=1'),
        live: promoItemLive ? YOUTUBE_LIVE : '',
      })
    } else if ($promotedItem.dataset.type === VIDEO) {
      // Recolecta todos los valores necesarios
      const $promoItemImageTag = $promotedItem.querySelector('img')
      const promoItemTitle = $promoItemImageTag.alt
      const promoItemImage = $promoItemImageTag.src
      const {
        env: promoItemVideoEnv,
        stream: promoItemVideoStream,
        uuid: promoItemVideoUUID,
      } = $promoItemImageTag.dataset
      const promoItemLive = !!$promotedItem.querySelector(
        '.stories-video__item-live'
      )
      const promoItemTime = $promotedItem.querySelector(
        '.stories-video__item-time'
      ).textContent
      //
      // Convierte el elemento en destacado
      $promotedItem.className = PROMOTED_ITEM_CLASSNAME
      $promotedItem.innerHTML = powaPromotedTemplate({
        title: promoItemTitle,
        image: promoItemImage,
        video: {
          env: promoItemVideoEnv,
          stream: promoItemVideoStream,
          uuid: promoItemVideoUUID,
        },
        live: promoItemLive,
        time: promoItemTime,
        script: powaBoot ? '' : powaScript({
          src:
            'https://d1tqo5nrys2b20.cloudfront.net/'+promoItemVideoEnv+'/powaBoot.js?org=elcomercio',
          async: true,
        })
      })

      if (powaBoot) {
        setTimeout(() => powaBoot(), 200)
      }
    } else if ($promotedItem.dataset.type === VIDEO_JWPLAYER){
 // Recolecta todos los valores necesarios
      const $promoItemImageTag = $promotedItem.querySelector('img')
      const promoItemTitle = $promoItemImageTag.alt
      const promoItemImage = $promoItemImageTag.src
      const {
        env: promoItemVideoEnv,
        stream: promoItemVideoStream,
        uuid: promoItemVideoUUID,
      } = $promoItemImageTag.dataset
      const promoItemLive = !!$promotedItem.querySelector(
        '.stories-video__item-live'
      )
      
      //
      // Convierte el elemento en destacado
      $promotedItem.className = PROMOTED_ITEM_CLASSNAME
      $promotedItem.innerHTML = jwplayerPromotedTemplate({        
        title: promoItemTitle,
        image: promoItemImage,
        video: {
          env: promoItemVideoEnv,
          stream: promoItemVideoStream,
          uuid: promoItemVideoUUID,
        },
        live: promoItemLive,
        time: ''
      })
    }else {
      throw Error('Este elemento no tiene un tipo de video definido')
    }

    // Este item debe volverse no destacado
    const $unpromotedItem = videoItemsListAux[1]
    if ($unpromotedItem.dataset.type === ELEMENT_YOUTUBE_ID) {
      // Recolecta todos los valores necesarios
      const $commonItemIframe = $unpromotedItem.querySelector('iframe')
      const commonItemTitle = $unpromotedItem.querySelector(
        '.stories-video__item-dest-title'
      ).textContent
      const commonItemImage = $commonItemIframe.dataset.img
      const commonItemImageDefault = $commonItemIframe.dataset.imgDefault
      const commonItemVideo = $commonItemIframe.src
      const commonItemLive = !!$unpromotedItem.querySelector(
        '.stories-video__youtube-live'
      )

      // Convierte el elemento en destacado
      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME
      $unpromotedItem.innerHTML = youtubeUnpromotedTemplate({
        title: commonItemTitle,
        image: commonItemImage,
        imageDefault: commonItemImageDefault ? 'default' : 'img',
        video: commonItemVideo,
        live: commonItemLive ? LIVE : '',
      })
    } else if ($unpromotedItem.dataset.type === VIDEO) {
      // Recolecta todos los valores necesarios
      const $commonItemTag = $unpromotedItem.querySelector('div[data-img]')
      const commonItemTitle = $unpromotedItem.querySelector(
        '.stories-video__item-dest-title'
      ).textContent
      const {
        img: commonItemImage,
        time: commonItemTime,
        live: commonItemLive,
      } = $commonItemTag.dataset
      const $commonItemVideoTag = $commonItemTag.firstElementChild
      const {
        env: commonItemVideoEnv,
        stream: commonItemVideoStream,
        uuid: commonItemVideoUUID,
      } = $commonItemVideoTag.dataset

      // Convierte el elemento en destacado
      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME
      $unpromotedItem.innerHTML = powaUnpromotedTemplate({
        title: commonItemTitle,
        image: commonItemImage,
        video: {
          env: commonItemVideoEnv,
          stream: commonItemVideoStream,
          uuid: commonItemVideoUUID,
        },
        live: commonItemLive === 'true' ? LIVE : '',
        time: commonItemTime,
      })
    } else if ($promotedItem.dataset.type === VIDEO_JWPLAYER){
       // Recolecta todos los valores necesarios
      const $commonItemTag = $unpromotedItem.querySelector('div[data-img]')
      const commonItemTitle = $unpromotedItem.querySelector(
        '.stories-video__item-dest-title'
      ).textContent
      const {
        img: commonItemImage,
        time: commonItemTime,
        live: commonItemLive,
      } = $commonItemTag.dataset
      const $commonItemVideoTag = $commonItemTag.firstElementChild
      const {
        env: commonItemVideoEnv,
        stream: commonItemVideoStream,
        uuid: commonItemVideoUUID,
      } = $commonItemVideoTag.dataset

      // Convierte el elemento en destacado
      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME
      $unpromotedItem.innerHTML = jwplayerUnpromotedTemplate({
        title: commonItemTitle,
        image: commonItemImage,
        video: {
          env: commonItemVideoEnv,
          stream: commonItemVideoStream,
          uuid: commonItemVideoUUID,
        },
        live: commonItemLive ? jwplayerLive : '',
        time: '0'
      })
    }else {
      throw Error('Este elemento no tiene un tipo de video definido')
    }

    // Se crea una copia del nodo padre de la lista
    const $newVideosList = $videosListAux.cloneNode()

    // A la copia del nodo padre se le inyecta el listado de
    // videos reordenado

    videoItemsListAux.forEach(videoItemAux =>
      $newVideosList.appendChild(videoItemAux.cloneNode(true))
    )

    // Se agrega el eventListener a los nodos de la nueva
    // lista de videos clonada. Se excluye el primer elemento
    ;[].slice.call($newVideosList.children, 1).forEach(videoItem => {
      videoItem.addEventListener('click', handleVideoClick)
    })

    // Se reemplaza el listado viejo con el listado clonado
    $videosListAux.replaceWith($newVideosList)
  }

  // Primere recorrido al listado para agregar el
  // evento de click inicial, ya luego del primer
  // click el evento se asinga de forma recursiva
  // en la misma funcion handleVideoClick()

  const $videosList = document.body.querySelector('.stories-video__list-wrapper')
  const videoItemsList = $videosList
    ? [].slice.call($videosList.children, 1) // Se excluye el primer elemento
    : []

  requestIdle(() => {
    videoItemsList.forEach(videoItem => {
      videoItem.addEventListener('click', handleVideoClick)
    })
  })
}

requestIdle(() => {
  handleSticky()
})
window.addEventListener('load', () => {
  requestIdle(() => {
    executeVideoList()
  })
})
*/

// export const tvListScripts = `"use strict";var powaBoot=!1,removeSticky=function(){var e=document.body.querySelector(".stories-video__item-dest");e.className=e.className.replace("sticky",""),e.className=e.className.replace("sticky-top","")},addSticky=function(e){void 0===e&&(e=!1);var t=document.body.querySelector(".stories-video__item-dest");t.className=t.className.concat(" sticky"),e&&(t.className=t.className.concat(" sticky-top"))},handleScrollVideoList=function(){var e=document.body.querySelector(".stories-video__wrapper"),t=4*e.querySelector(".stories-video__item").offsetHeight,i=e.querySelector(".stories-video__content").offsetHeight,o=e.querySelector(".stories-video__programs-wrapper").offsetHeight,s=e.querySelector(".stories-video__header").offsetHeight,r=window.scrollY,a=r>=e.offsetTop+e.offsetHeight-(t+i+o),d=r+window.innerHeight-s<e.offsetTop,l=!1;(a||d)&&0===r?addSticky(l=!0):a||d?(l=!1,removeSticky(),addSticky(l)):removeSticky()},handleCloseStickyClick=function(e){null!==e&&(removeSticky(),window.removeEventListener("scroll",handleScrollVideoList),e.pause())},powaScript=function(e){var t=e.src,i=e.async,o=e.defer,s=e.textContent,r=void 0===s?"":s,a=document.createElement("script");return t&&(a.type="text/javascript",a.src=t),i&&(a.async=!0),o&&(a.defer=!0),a.textContent=r,document.body.append(a)},handleSticky=function(e){void 0===e&&(e=!1),window.addEventListener("powaRender",function(t){var i=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent),o=t.detail.powa;o.on(window.PoWa.EVENTS.PLAY,function(){window.addEventListener("scroll",handleScrollVideoList)}),o.on(window.PoWa.EVENTS.END,function(){removeSticky(),window.removeEventListener("scroll",handleScrollVideoList)}),!i&&e&&o&&o.play&&!o.isPlay&&(o.play(),o.isPlay=!0),document.body.querySelector(".stories-video__close").addEventListener("click",function(){return handleCloseStickyClick(o)})})},executeVideoList=function(){function e(){var t=this,i=document.body.querySelector(".stories-video__list-wrapper"),o=i?[].slice.call(i.children):[];o.unshift(o.splice(o.findIndex(function(e){return e===t}),1)[0]);var s,r,a,d,l="stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer",n='<p itemprop="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>',c=o[0];if("youtube_id"===c.dataset.type){var v=c.querySelector("img"),u=v.className.indexOf("stories-video__item-default")>0,m=v.alt,p=v.src,f=v.dataset.video,_=!!v.querySelector(".stories-video__item-live");c.className="stories-video__item-dest w-full",c.innerHTML=(s={title:m,image:p,imageDefault:u,video:f.indexOf(!1)?f:f.concat("?autoload=1"),live:_?'<p itemprop="description" class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>':""},r=s.title,a=s.image,d=s.imageDefault,'<div class="stories-video__youtube position-relative"><iframe src="'+s.video+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Video" data-img="'+a+'" data-img-default="'+d+'"></iframe>'+s.live+'</div><div class="pt-20 pl-20 pr-20 pb-10 w-full"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+r+"</h2></div></div>")}else{if("basic_video"!==c.dataset.type)throw Error("Este elemento no tiene un tipo de video definido");var y=c.querySelector("img"),w=y.alt,h=y.src,b=y.dataset,g=b.env,S=b.stream,x=b.uuid,q=!!c.querySelector(".stories-video__item-live"),E=c.querySelector(".stories-video__item-time").textContent;c.className="stories-video__item-dest w-full",c.innerHTML=function(e){var t=e.title,i=e.image,o=e.video,s=e.live,r=e.time,a=e.script;return'<div data-img="'+i+'" data-time="'+r+'" data-live="'+s+'"><div class="powa" id="powa-'+o.uuid+'" data-org="elcomercio" data-env="'+o.env+'" data-stream="'+o.stream+'" data-uuid="'+o.uuid+'" data-aspect-ratio="0.562" data-api="'+o.env+'"></div></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+t+'</h2></div><span role="button"tabIndex="0"class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>'+a}({title:w,image:h,video:{env:g,stream:S,uuid:x},live:q,time:E,script:powaBoot?"":powaScript({src:"https://d1tqo5nrys2b20.cloudfront.net/"+g+"/powaBoot.js?org=elcomercio",async:!0})}),powaBoot&&setTimeout(function(){return powaBoot()},200)}var k=o[1];if("youtube_id"===k.dataset.type){var N=k.querySelector("iframe"),L=k.querySelector(".stories-video__item-dest-title").textContent,V=N.dataset.img,C=N.dataset.imgDefault,j=N.src,H=!!k.querySelector(".stories-video__youtube-live");k.className=l,k.innerHTML=function(e){var t=e.title;return'<img src="'+e.image+'" alt="'+t+'" class="stories-video__item-'+e.imageDefault+' w-full h-full object-cover object-center mr-15" data-video="'+e.video+'"><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+t+"</h2>"+e.live+"</div>"}({title:L,image:V,imageDefault:C?"default":"img",video:j,live:H?n:""})}else{if("basic_video"!==k.dataset.type)throw Error("Este elemento no tiene un tipo de video definido");var P=k.querySelector("div[data-img]"),T=k.querySelector(".stories-video__item-dest-title").textContent,I=P.dataset,D=I.img,B=I.time,O=I.live,M=P.firstElementChild.dataset,W=M.env,A=M.stream,Y=M.uuid;k.className=l,k.innerHTML=function(e){var t=e.title,i=e.image,o=e.video,s=e.live,r=e.time;return'<img src="'+i+'" alt="'+t+'" class="stories-video__item-img w-full h-full object-cover object-center mr-15" data-env="'+o.env+'" data-stream="'+o.stream+'" data-uuid="'+o.uuid+'"><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">'+r+'</span><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+t+"</h2>"+s+"</div>"}({title:T,image:D,video:{env:W,stream:A,uuid:Y},live:"true"===O?n:"",time:B})}var R=i.cloneNode();o.forEach(function(e){return R.appendChild(e.cloneNode(!0))}),[].slice.call(R.children,1).forEach(function(t){t.addEventListener("click",e)}),i.replaceWith(R)}var t=document.body.querySelector(".stories-video__list-wrapper"),i=t?[].slice.call(t.children,1):[];requestIdle(function(){i.forEach(function(t){t.addEventListener("click",e)})})};requestIdle(function(){handleSticky()}),window.addEventListener("load",function(){requestIdle(function(){executeVideoList()})});`
// eslint-disable-next-line import/prefer-default-export
export const tvListScripts = `"use strict";

var powaBoot = false;

debugger;

var removeSticky = function removeSticky() {
  var $itemDest = document.body.querySelector('.stories-video__item-dest');
  $itemDest.className = $itemDest.className.replace('sticky', '');
  $itemDest.className = $itemDest.className.replace('sticky-top', '');
};

var addSticky = function addSticky() {
  var stickyTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var $itemDest = document.body.querySelector('.stories-video__item-dest');
  $itemDest.className = $itemDest.className.concat(' sticky');
  if (stickyTop) $itemDest.className = $itemDest.className.concat(' sticky-top');
};

var handleScrollVideoList = function handleScrollVideoList() {
  var $playOf = document.body.querySelector('.stories-video__wrapper');
  var itemHeight = $playOf.querySelector('.stories-video__item').offsetHeight * 4;
  var promoContentHeight = $playOf.querySelector('.stories-video__content').offsetHeight;
  var programsWrapperHeight = $playOf.querySelector('.stories-video__programs-wrapper').offsetHeight;
  var storiesHeaderHeigth = $playOf.querySelector('.stories-video__header').offsetHeight;
  var scrollHeight = window.scrollY; // si el scroll es mayor o igual a la suma de la distancia del componente a la parte supe.offsetHeight * 4rior y  el alto del componente

  var offsetButton = scrollHeight >= $playOf.offsetTop + $playOf.offsetHeight - (itemHeight + promoContentHeight + programsWrapperHeight); // si el scroll  mas el tamaño de la pantalla es menor a la distancia del componente a la parte superior de la pantalla

  var offSetTop = scrollHeight + window.innerHeight - storiesHeaderHeigth < $playOf.offsetTop;
  var stickyTop = false;

  if ((offsetButton || offSetTop) && scrollHeight === 0) {
    // si esta fuera de foco por arriba en la parte superior (top 0)
    stickyTop = true;
    addSticky(stickyTop);
  } else if (offsetButton || offSetTop) {
    // si esta fuera de foco por (abajo y arriba)
    stickyTop = false;
    removeSticky();
    addSticky(stickyTop);
  } else {
    removeSticky();
  }
};

var handleCloseStickyClick = function handleCloseStickyClick(powaPlayer) {
  if (powaPlayer !== null) {
    removeSticky();
    window.removeEventListener('scroll', handleScrollVideoList);
    powaPlayer.pause();
  }
};

var powaScript = function powaScript(_ref) {
  var src = _ref.src,
      async = _ref.async,
      defer = _ref.defer,
      _ref$textContent = _ref.textContent,
      textContent = _ref$textContent === void 0 ? '' : _ref$textContent;
  var node = document.createElement('script');

  if (src) {
    node.type = 'text/javascript';
    node.src = src;
  }

  if (async) {
    node.async = true;
  }

  if (defer) {
    node.defer = true;
  }

  node.textContent = textContent;
  return document.body.append(node);
};

var handleSticky = function handleSticky() {
  var autoPlayVideo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  window.addEventListener('powaRender', function (event) {
    var isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent);
    var powa = event.detail.powa;
    powa.on(window.PoWa.EVENTS.PLAY, function () {
      window.addEventListener('scroll', handleScrollVideoList);
    });
    powa.on(window.PoWa.EVENTS.END, function () {
      removeSticky();
      window.removeEventListener('scroll', handleScrollVideoList);
    });

    if (!isMobile && // !isAdmin &&
    autoPlayVideo && powa && powa.play && !powa.isPlay) {
      powa.play();
      powa.isPlay = true;
    }

    document.body.querySelector('.stories-video__close').addEventListener('click', function () {
      return handleCloseStickyClick(powa);
    });
  });
};

var executeVideoList = function executeVideoList() {
  // Es importante que esto se mantenga como function() {}
  // por el uso de "this", si se usara () => {} el "this"
  // no funcionaria aqui.
  function handleVideoClick() {
    var _this = this;

    // Se recolecta el listado de videos como nodos y array
    var $videosListAux = document.body.querySelector('.stories-video__list-wrapper');
    var videoItemsListAux = $videosListAux ? [].slice.call($videosListAux.children) : []; // Se reordena el array poniendo el clickeado primero

    videoItemsListAux.unshift(videoItemsListAux.splice(videoItemsListAux.findIndex(function (video) {
      return video === _this;
    }), 1)[0]);
    var VIDEO = 'basic_video';
    var ELEMENT_YOUTUBE_ID = 'youtube_id';
    var VIDEO_JWPLAYER = 'basic_jwplayer';
    var PROMOTED_ITEM_CLASSNAME = 'stories-video__item-dest w-full';
    var UNPROMOTED_ITEM_CLASSNAME = 'stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer';
    var LIVE = '<p itemprop="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>';
    var YOUTUBE_LIVE = '<p itemprop="description" class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>';

    var youtubePromotedTemplate = function youtubePromotedTemplate(_ref2) {
      var title = _ref2.title,
          image = _ref2.image,
          imageDefault = _ref2.imageDefault,
          video = _ref2.video,
          live = _ref2.live;
      return '<div class="stories-video__youtube position-relative"><iframe src="' + video + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Video" data-img="' + image + '" data-img-default="' + imageDefault + '"></iframe>' + live + '</div><div class="pt-20 pl-20 pr-20 pb-10 w-full"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">' + title + '</h2></div></div>';
    };

    var youtubeUnpromotedTemplate = function youtubeUnpromotedTemplate(_ref3) {
      var title = _ref3.title,
          image = _ref3.image,
          imageDefault = _ref3.imageDefault,
          video = _ref3.video,
          live = _ref3.live;
      return '<img src="' + image + '" alt="' + title + '" class="stories-video__item-' + imageDefault + ' w-full h-full object-cover object-center mr-15" data-video="' + video + '"><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">' + title + '</h2>' + live + '</div>';
    };

    var powaPromotedTemplate = function powaPromotedTemplate(_ref4) {
      var title = _ref4.title,
          image = _ref4.image,
          video = _ref4.video,
          live = _ref4.live,
          time = _ref4.time,
          script = _ref4.script;
      return '<div data-img="' + image + '" data-time="' + time + '" data-live="' + live + '"><div class="powa" id="powa-' + video.uuid + '" data-org="elcomercio" data-env="' + video.env + '" data-stream="' + video.stream + '" data-uuid="' + video.uuid + '" data-aspect-ratio="0.562" data-api="' + video.env + '"></div></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">' + title + '</h2></div><span role="button"tabIndex="0"class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>' + script;
    };

    var powaUnpromotedTemplate = function powaUnpromotedTemplate(_ref5) {
      var title = _ref5.title,
          image = _ref5.image,
          video = _ref5.video,
          live = _ref5.live,
          time = _ref5.time;
      return '<img src="' + image + '" alt="' + title + '" class="stories-video__item-img w-full h-full object-cover object-center mr-15" data-env="' + video.env + '" data-stream="' + video.stream + '" data-uuid="' + video.uuid + '"><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">' + time + '</span><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">' + title + '</h2>' + live + '</div>';
    };

    var jwplayerPromotedTemplate = function jwplayerPromotedTemplate(_ref6) {
      var _ref6$title = _ref6.title,
          title = _ref6$title === void 0 ? '' : _ref6$title,
          _ref6$image = _ref6.image,
          image = _ref6$image === void 0 ? '' : _ref6$image,
          _ref6$video = _ref6.video,
          video = _ref6$video === void 0 ? '' : _ref6$video,
          _ref6$live = _ref6.live,
          live = _ref6$live === void 0 ? '' : _ref6$live,
          _ref6$time = _ref6.time,
          time = _ref6$time === void 0 ? '' : _ref6$time;
      return '<div data-img="' + image + '" data-time="' + time + '" data-live="' + live + '"><script src="https://cdn.jwplayer.com/players/' + video.uuid + '-' + video.stream + '.js"></script><div data-time="' + duration + '" class="jwplayer-lazy" id="botr_' + video.uuid + '_' + video.stream + '_div"></div><figcaption class="story-content__caption">' + title + '</figcaption></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 itemProp="name" class="stories-video__item-dest-title text-white">' + title + '</h2></div><span role="button" tabIndex="0" class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>';
    };

    var jwplayerUnpromotedTemplate = function jwplayerUnpromotedTemplate(_ref7) {
      var _ref7$title = _ref7.title,
          title = _ref7$title === void 0 ? '' : _ref7$title,
          _ref7$image = _ref7.image,
          image = _ref7$image === void 0 ? '' : _ref7$image,
          _ref7$video = _ref7.video,
          video = _ref7$video === void 0 ? '' : _ref7$video,
          _ref7$live = _ref7.live,
          live = _ref7$live === void 0 ? '' : _ref7$live,
          _ref7$time = _ref7.time,
          time = _ref7$time === void 0 ? '' : _ref7$time;
      return '<img src="' + image + '" alt="' + title + '" class="lazy" data-stream="' + video.stream + '" data-uuid="' + video.uuid + '" account="' + account + '"/><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">' + time + '</span><div class="stories-video__item-text text-white"><h2 itemProp="name" class="stories-video__item-title text-white mb-10">' + title + '</h2>' + live + '</div>';
    };

    var jwplayerLive = '<p itemProp="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>'; // Este item debe volverse destacado

    var $promotedItem = videoItemsListAux[0];
    console.log('$promotedItem', $promotedItem);

    if ($promotedItem.dataset.type === ELEMENT_YOUTUBE_ID) {
      // Recolecta todos los valores necesarios
      var $promoItemImageTag = $promotedItem.querySelector('img');
      var promoItemImageDefault = $promoItemImageTag.className.indexOf('stories-video__item-default') > 0;
      var promoItemTitle = $promoItemImageTag.alt;
      var promoItemImage = $promoItemImageTag.src;
      var promoItemVideo = $promoItemImageTag.dataset.video;
      var promoItemLive = !!$promoItemImageTag.querySelector('.stories-video__item-live'); // Convierte el elemento en destacado

      $promotedItem.className = PROMOTED_ITEM_CLASSNAME;
      $promotedItem.innerHTML = youtubePromotedTemplate({
        title: promoItemTitle,
        image: promoItemImage,
        imageDefault: promoItemImageDefault,
        video: promoItemVideo.indexOf('?autoplay=1' > 0) ? promoItemVideo : promoItemVideo.concat('?autoload=1'),
        live: promoItemLive ? YOUTUBE_LIVE : ''
      });
    } else if ($promotedItem.dataset.type === VIDEO) {
      // Recolecta todos los valores necesarios
      var _$promoItemImageTag = $promotedItem.querySelector('img');

      var _promoItemTitle = _$promoItemImageTag.alt;
      var _promoItemImage = _$promoItemImageTag.src;
      var _$promoItemImageTag$d = _$promoItemImageTag.dataset,
          promoItemVideoEnv = _$promoItemImageTag$d.env,
          promoItemVideoStream = _$promoItemImageTag$d.stream,
          promoItemVideoUUID = _$promoItemImageTag$d.uuid;

      var _promoItemLive = !!$promotedItem.querySelector('.stories-video__item-live');

      var promoItemTime = $promotedItem.querySelector('.stories-video__item-time').textContent; //
      // Convierte el elemento en destacado

      $promotedItem.className = PROMOTED_ITEM_CLASSNAME;
      $promotedItem.innerHTML = powaPromotedTemplate({
        title: _promoItemTitle,
        image: _promoItemImage,
        video: {
          env: promoItemVideoEnv,
          stream: promoItemVideoStream,
          uuid: promoItemVideoUUID
        },
        live: _promoItemLive,
        time: promoItemTime,
        script: powaBoot ? '' : powaScript({
          src: 'https://d1tqo5nrys2b20.cloudfront.net/' + promoItemVideoEnv + '/powaBoot.js?org=elcomercio',
          async: true
        })
      });

      if (powaBoot) {
        setTimeout(function () {
          return powaBoot();
        }, 200);
      }
    } else if ($promotedItem.dataset.type === VIDEO_JWPLAYER) {
      // Recolecta todos los valores necesarios
      var _$promoItemImageTag2 = $promotedItem.querySelector('img');

      var _promoItemTitle2 = _$promoItemImageTag2.alt;
      var _promoItemImage2 = _$promoItemImageTag2.src;
      var _$promoItemImageTag2$ = _$promoItemImageTag2.dataset,
          _promoItemVideoEnv = _$promoItemImageTag2$.env,
          _promoItemVideoStream = _$promoItemImageTag2$.stream,
          _promoItemVideoUUID = _$promoItemImageTag2$.uuid;

      var _promoItemLive2 = !!$promotedItem.querySelector('.stories-video__item-live'); //
      // Convierte el elemento en destacado


      $promotedItem.className = PROMOTED_ITEM_CLASSNAME;
      $promotedItem.innerHTML = jwplayerPromotedTemplate({
        title: _promoItemTitle2,
        image: _promoItemImage2,
        video: {
          env: _promoItemVideoEnv,
          stream: _promoItemVideoStream,
          uuid: _promoItemVideoUUID
        },
        live: _promoItemLive2,
        time: ''
      });
    } else {
      throw Error('Este elemento no tiene un tipo de video definido');
    } // Este item debe volverse no destacado


    var $unpromotedItem = videoItemsListAux[1];

    if ($unpromotedItem.dataset.type === ELEMENT_YOUTUBE_ID) {
      // Recolecta todos los valores necesarios
      var $commonItemIframe = $unpromotedItem.querySelector('iframe');
      var commonItemTitle = $unpromotedItem.querySelector('.stories-video__item-dest-title').textContent;
      var commonItemImage = $commonItemIframe.dataset.img;
      var commonItemImageDefault = $commonItemIframe.dataset.imgDefault;
      var commonItemVideo = $commonItemIframe.src;
      var commonItemLive = !!$unpromotedItem.querySelector('.stories-video__youtube-live'); // Convierte el elemento en destacado

      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME;
      $unpromotedItem.innerHTML = youtubeUnpromotedTemplate({
        title: commonItemTitle,
        image: commonItemImage,
        imageDefault: commonItemImageDefault ? 'default' : 'img',
        video: commonItemVideo,
        live: commonItemLive ? LIVE : ''
      });
    } else if ($unpromotedItem.dataset.type === VIDEO) {
      // Recolecta todos los valores necesarios
      var $commonItemTag = $unpromotedItem.querySelector('div[data-img]');
      var _commonItemTitle = $unpromotedItem.querySelector('.stories-video__item-dest-title').textContent;
      var _$commonItemTag$datas = $commonItemTag.dataset,
          _commonItemImage = _$commonItemTag$datas.img,
          commonItemTime = _$commonItemTag$datas.time,
          _commonItemLive = _$commonItemTag$datas.live;
      var $commonItemVideoTag = $commonItemTag.firstElementChild;
      var _$commonItemVideoTag$ = $commonItemVideoTag.dataset,
          commonItemVideoEnv = _$commonItemVideoTag$.env,
          commonItemVideoStream = _$commonItemVideoTag$.stream,
          commonItemVideoUUID = _$commonItemVideoTag$.uuid; // Convierte el elemento en destacado

      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME;
      $unpromotedItem.innerHTML = powaUnpromotedTemplate({
        title: _commonItemTitle,
        image: _commonItemImage,
        video: {
          env: commonItemVideoEnv,
          stream: commonItemVideoStream,
          uuid: commonItemVideoUUID
        },
        live: _commonItemLive === 'true' ? LIVE : '',
        time: commonItemTime
      });
    } else if ($promotedItem.dataset.type === VIDEO_JWPLAYER) {
      // Recolecta todos los valores necesarios
      var _$commonItemTag = $unpromotedItem.querySelector('div[data-img]');

      var _commonItemTitle2 = $unpromotedItem.querySelector('.stories-video__item-dest-title').textContent;
      var _$commonItemTag$datas2 = _$commonItemTag.dataset,
          _commonItemImage2 = _$commonItemTag$datas2.img,
          _commonItemTime = _$commonItemTag$datas2.time,
          _commonItemLive2 = _$commonItemTag$datas2.live;
      var _$commonItemVideoTag = _$commonItemTag.firstElementChild;
      var _$commonItemVideoTag$2 = _$commonItemVideoTag.dataset,
          _commonItemVideoEnv = _$commonItemVideoTag$2.env,
          _commonItemVideoStream = _$commonItemVideoTag$2.stream,
          _commonItemVideoUUID = _$commonItemVideoTag$2.uuid; // Convierte el elemento en destacado

      $unpromotedItem.className = UNPROMOTED_ITEM_CLASSNAME;
      $unpromotedItem.innerHTML = jwplayerUnpromotedTemplate({
        title: _commonItemTitle2,
        image: _commonItemImage2,
        video: {
          env: _commonItemVideoEnv,
          stream: _commonItemVideoStream,
          uuid: _commonItemVideoUUID
        },
        live: _commonItemLive2 ? jwplayerLive : '',
        time: '0'
      });
    } else {
      throw Error('Este elemento no tiene un tipo de video definido');
    } // Se crea una copia del nodo padre de la lista


    var $newVideosList = $videosListAux.cloneNode(); // A la copia del nodo padre se le inyecta el listado de
    // videos reordenado

    videoItemsListAux.forEach(function (videoItemAux) {
      return $newVideosList.appendChild(videoItemAux.cloneNode(true));
    }) // Se agrega el eventListener a los nodos de la nueva
    // lista de videos clonada. Se excluye el primer elemento
    ;
    [].slice.call($newVideosList.children, 1).forEach(function (videoItem) {
      videoItem.addEventListener('click', handleVideoClick);
    }); // Se reemplaza el listado viejo con el listado clonado

    $videosListAux.replaceWith($newVideosList);
  } // Primere recorrido al listado para agregar el
  // evento de click inicial, ya luego del primer
  // click el evento se asinga de forma recursiva
  // en la misma funcion handleVideoClick()


  var $videosList = document.body.querySelector('.stories-video__list-wrapper');
  var videoItemsList = $videosList ? [].slice.call($videosList.children, 1) // Se excluye el primer elemento
  : [];
  requestIdle(function () {
    videoItemsList.forEach(function (videoItem) {
      videoItem.addEventListener('click', handleVideoClick);
    });
  });
};

requestIdle(function () {
  handleSticky();
});
window.addEventListener('load', function () {
  requestIdle(function () {
    executeVideoList();
  });
});`
