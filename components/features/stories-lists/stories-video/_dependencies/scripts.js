/* 
const powaBoot = false;
const removeSticky = () => {
  const $itemDest = document.querySelector('.stories-video__item-dest')
  $itemDest.className = $itemDest.className.replace('sticky', '')
  $itemDest.className = $itemDest.className.replace('sticky-top', '')
}

const addSticky = (stickyTop = false) => {
  const $itemDest = document.querySelector('.stories-video__item-dest')
  $itemDest.className = $itemDest.className.concat(' sticky')
  if (stickyTop) $itemDest.className = $itemDest.className.concat(' sticky-top')
}

const handleScrollVideoList = () => {
  const $playOf = document.querySelector('.stories-video__wrapper')
  const itemHeight =
    document.querySelector('.stories-video__item').offsetHeight * 4
  const promoContentHeight = document.querySelector('.stories-video__content')
    .offsetHeight
  const programsWrapperHeight = document.querySelector(
    '.stories-video__programs-wrapper'
  ).offsetHeight
  const storiesHeaderHeigth = document.querySelector('.stories-video__header')
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

    document
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
    const $videosListAux = document.querySelector(
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

    // Este item debe volverse destacado
    const $promotedItem = videoItemsListAux[0]

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
    } else {
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
    } else {
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

  const $videosList = document.querySelector('.stories-video__list-wrapper')
  const videoItemsList = $videosList
    ? [].slice.call($videosList.children, 1) // Se excluye el primer elemento
    : []

  setTimeout(() => {
    videoItemsList.forEach(videoItem => {
      videoItem.addEventListener('click', handleVideoClick)
    })
  }, 0)
}

setTimeout(() => {
  handleSticky()
}, 0)
window.addEventListener('load', () => {
  setTimeout(() => {
    executeVideoList()
  }, 0)
})
*/

// eslint-disable-next-line import/prefer-default-export
export const tvListScripts = `"use strict";var powaBoot=!1;var removeSticky=function removeSticky(){var $itemDest=document.querySelector('.stories-video__item-dest');$itemDest.className=$itemDest.className.replace('sticky','');$itemDest.className=$itemDest.className.replace('sticky-top','')};var addSticky=function addSticky(){var stickyTop=arguments.length>0&&arguments[0]!==undefined?arguments[0]:!1;var $itemDest=document.querySelector('.stories-video__item-dest');$itemDest.className=$itemDest.className.concat(' sticky');if(stickyTop)$itemDest.className=$itemDest.className.concat(' sticky-top')};var handleScrollVideoList=function handleScrollVideoList(){var $playOf=document.querySelector('.stories-video__wrapper');var itemHeight=document.querySelector('.stories-video__item').offsetHeight*4;var promoContentHeight=document.querySelector('.stories-video__content').offsetHeight;var programsWrapperHeight=document.querySelector('.stories-video__programs-wrapper').offsetHeight;var storiesHeaderHeigth=document.querySelector('.stories-video__header').offsetHeight;var scrollHeight=window.scrollY;var offsetButton=scrollHeight>=$playOf.offsetTop+$playOf.offsetHeight-(itemHeight+promoContentHeight+programsWrapperHeight);var offSetTop=scrollHeight+window.innerHeight-storiesHeaderHeigth<$playOf.offsetTop;var stickyTop=!1;if((offsetButton||offSetTop)&&scrollHeight===0){stickyTop=!0;addSticky(stickyTop)}else if(offsetButton||offSetTop){stickyTop=!1;removeSticky();addSticky(stickyTop)}else{removeSticky()}};var handleCloseStickyClick=function handleCloseStickyClick(powaPlayer){if(powaPlayer!==null){removeSticky();window.removeEventListener('scroll',handleScrollVideoList);powaPlayer.pause()}};var powaScript=function powaScript(_ref){var src=_ref.src,async=_ref.async,defer=_ref.defer,_ref$textContent=_ref.textContent,textContent=_ref$textContent===void 0?'':_ref$textContent,jquery=_ref.jquery;var node=document.createElement('script');if(src){node.type='text/javascript';node.src=src}if(async){node.async=!0}if(defer){node.defer=!0}if(jquery){node.setAttribute('integrity','sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=');node.setAttribute('crossorigin','anonymous')}node.textContent=textContent;return document.body.append(node)};var handleSticky=function handleSticky(){var autoPlayVideo=arguments.length>0&&arguments[0]!==undefined?arguments[0]:!1;window.addEventListener('powaRender',function(event){var isMobile=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent);var powa=event.detail.powa;powa.on(window.PoWa.EVENTS.PLAY,function(){window.addEventListener('scroll',handleScrollVideoList)});powa.on(window.PoWa.EVENTS.END,function(){removeSticky();window.removeEventListener('scroll',handleScrollVideoList)});if(!isMobile&&autoPlayVideo&&powa&&powa.play&&!powa.isPlay){powa.play();powa.isPlay=!0}document.querySelector('.stories-video__close').addEventListener('click',function(){return handleCloseStickyClick(powa)})})};var executeVideoList=function executeVideoList(){function handleVideoClick(){var _this=this;var $videosListAux=document.querySelector('.stories-video__list-wrapper');var videoItemsListAux=$videosListAux?[].slice.call($videosListAux.children):[];videoItemsListAux.unshift(videoItemsListAux.splice(videoItemsListAux.findIndex(function(video){return video===_this}),1)[0]);var VIDEO='basic_video';var ELEMENT_YOUTUBE_ID='youtube_id';var PROMOTED_ITEM_CLASSNAME='stories-video__item-dest w-full';var UNPROMOTED_ITEM_CLASSNAME='stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer';var LIVE='<p itemprop="description" class="stories-video__item-live flex items-center uppercase">EN VIVO</p>';var YOUTUBE_LIVE='<p itemprop="description" class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>';var youtubePromotedTemplate=function youtubePromotedTemplate(_ref2){var title=_ref2.title,image=_ref2.image,imageDefault=_ref2.imageDefault,video=_ref2.video,live=_ref2.live;return'<div class="stories-video__youtube position-relative"><iframe src="'+video+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Video" data-img="'+image+'" data-img-default="'+imageDefault+'"></iframe>'+live+'</div><div class="pt-20 pl-20 pr-20 pb-10 w-full"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+title+'</h2></div></div>'};var youtubeUnpromotedTemplate=function youtubeUnpromotedTemplate(_ref3){var title=_ref3.title,image=_ref3.image,imageDefault=_ref3.imageDefault,video=_ref3.video,live=_ref3.live;return'<img src="'+image+'" alt="'+title+'" class="stories-video__item-'+imageDefault+' w-full h-full object-cover object-center mr-15" data-video="'+video+'"><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+title+'</h2>'+live+'</div>'};var powaPromotedTemplate=function powaPromotedTemplate(_ref4){var title=_ref4.title,image=_ref4.image,video=_ref4.video,live=_ref4.live,time=_ref4.time,script=_ref4.script;return'<div data-img="'+image+'" data-time="'+time+'" data-live="'+live+'"><div class="powa" id="powa-'+video.uuid+'" data-org="elcomercio" data-env="'+video.env+'" data-stream="'+video.stream+'" data-uuid="'+video.uuid+'" data-aspect-ratio="0.562" data-api="'+video.env+'"></div></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+title+'</h2></div><span role="button"tabIndex="0"class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>'+script};var powaUnpromotedTemplate=function powaUnpromotedTemplate(_ref5){var title=_ref5.title,image=_ref5.image,video=_ref5.video,live=_ref5.live,time=_ref5.time;return'<img src="'+image+'" alt="'+title+'" class="stories-video__item-img w-full h-full object-cover object-center mr-15" data-env="'+video.env+'" data-stream="'+video.stream+'" data-uuid="'+video.uuid+'"><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">'+time+'</span><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+title+'</h2>'+live+'</div>'};var $promotedItem=videoItemsListAux[0];if($promotedItem.dataset.type===ELEMENT_YOUTUBE_ID){var $promoItemImageTag=$promotedItem.querySelector('img');var promoItemImageDefault=$promoItemImageTag.className.indexOf('stories-video__item-default')>0;var promoItemTitle=$promoItemImageTag.alt;var promoItemImage=$promoItemImageTag.src;var promoItemVideo=$promoItemImageTag.dataset.video;var promoItemLive=!!$promoItemImageTag.querySelector('.stories-video__item-live');$promotedItem.className=PROMOTED_ITEM_CLASSNAME;$promotedItem.innerHTML=youtubePromotedTemplate({title:promoItemTitle,image:promoItemImage,imageDefault:promoItemImageDefault,video:promoItemVideo.indexOf('?autoplay=1'>0)?promoItemVideo:promoItemVideo.concat('?autoload=1'),live:promoItemLive?YOUTUBE_LIVE:''})}else if($promotedItem.dataset.type===VIDEO){var _$promoItemImageTag=$promotedItem.querySelector('img');var _promoItemTitle=_$promoItemImageTag.alt;var _promoItemImage=_$promoItemImageTag.src;var _$promoItemImageTag$d=_$promoItemImageTag.dataset,promoItemVideoEnv=_$promoItemImageTag$d.env,promoItemVideoStream=_$promoItemImageTag$d.stream,promoItemVideoUUID=_$promoItemImageTag$d.uuid;var _promoItemLive=!!$promotedItem.querySelector('.stories-video__item-live');var promoItemTime=$promotedItem.querySelector('.stories-video__item-time').textContent;$promotedItem.className=PROMOTED_ITEM_CLASSNAME;$promotedItem.innerHTML=powaPromotedTemplate({title:_promoItemTitle,image:_promoItemImage,video:{env:promoItemVideoEnv,stream:promoItemVideoStream,uuid:promoItemVideoUUID},live:_promoItemLive,time:promoItemTime,script:powaBoot?'':powaScript({src:'https://d1tqo5nrys2b20.cloudfront.net/'+promoItemVideoEnv+'/powaBoot.js?org=elcomercio',async:!0})});if(powaBoot){setTimeout(function(){return powaBoot()},200)}}else{throw Error('Este elemento no tiene un tipo de video definido')}var $unpromotedItem=videoItemsListAux[1];if($unpromotedItem.dataset.type===ELEMENT_YOUTUBE_ID){var $commonItemIframe=$unpromotedItem.querySelector('iframe');var commonItemTitle=$unpromotedItem.querySelector('.stories-video__item-dest-title').textContent;var commonItemImage=$commonItemIframe.dataset.img;var commonItemImageDefault=$commonItemIframe.dataset.imgDefault;var commonItemVideo=$commonItemIframe.src;var commonItemLive=!!$unpromotedItem.querySelector('.stories-video__youtube-live');$unpromotedItem.className=UNPROMOTED_ITEM_CLASSNAME;$unpromotedItem.innerHTML=youtubeUnpromotedTemplate({title:commonItemTitle,image:commonItemImage,imageDefault:commonItemImageDefault?'default':'img',video:commonItemVideo,live:commonItemLive?LIVE:''})}else if($unpromotedItem.dataset.type===VIDEO){var $commonItemTag=$unpromotedItem.querySelector('div[data-img]');var _commonItemTitle=$unpromotedItem.querySelector('.stories-video__item-dest-title').textContent;var _$commonItemTag$datas=$commonItemTag.dataset,_commonItemImage=_$commonItemTag$datas.img,commonItemTime=_$commonItemTag$datas.time,_commonItemLive=_$commonItemTag$datas.live;var $commonItemVideoTag=$commonItemTag.firstElementChild;var _$commonItemVideoTag$=$commonItemVideoTag.dataset,commonItemVideoEnv=_$commonItemVideoTag$.env,commonItemVideoStream=_$commonItemVideoTag$.stream,commonItemVideoUUID=_$commonItemVideoTag$.uuid;$unpromotedItem.className=UNPROMOTED_ITEM_CLASSNAME;$unpromotedItem.innerHTML=powaUnpromotedTemplate({title:_commonItemTitle,image:_commonItemImage,video:{env:commonItemVideoEnv,stream:commonItemVideoStream,uuid:commonItemVideoUUID},live:_commonItemLive==='true'?LIVE:'',time:commonItemTime})}else{throw Error('Este elemento no tiene un tipo de video definido')}
var $newVideosList=$videosListAux.cloneNode();videoItemsListAux.forEach(function(videoItemAux){return $newVideosList.appendChild(videoItemAux.cloneNode(!0))});[].slice.call($newVideosList.children,1).forEach(function(videoItem){videoItem.addEventListener('click',handleVideoClick)});$videosListAux.replaceWith($newVideosList)}
var $videosList=document.querySelector('.stories-video__list-wrapper');var videoItemsList=$videosList?[].slice.call($videosList.children,1):[];setTimeout(function(){videoItemsList.forEach(function(videoItem){videoItem.addEventListener('click',handleVideoClick)})},0)};setTimeout(function(){handleSticky()},0);window.addEventListener('load',function(){setTimeout(function(){executeVideoList()},0)})`
