/* 
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
    const LIVE = '<p class="stories-video__item-live flex items-center uppercase">EN VIVO</p>'
    const YOUTUBE_LIVE = '<p class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>'

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
        script: powaBoot ? '' : '<script src="https://d1tqo5nrys2b20.cloudfront.net/'+promoItemVideoEnv+'/powaBoot.js?org=elcomercio"/>'
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
export const tvListScripts = `"use strict";var removeSticky=function(){var e=document.querySelector(".stories-video__item-dest");e.className=e.className.replace("sticky",""),e.className=e.className.replace("sticky-top","")},addSticky=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=document.querySelector(".stories-video__item-dest");t.className=t.className.concat(" sticky"),e&&(t.className=t.className.concat(" sticky-top"))},handleScrollVideoList=function(){var e=document.querySelector(".stories-video__wrapper"),t=4*document.querySelector(".stories-video__item").offsetHeight,i=document.querySelector(".stories-video__content").offsetHeight,o=document.querySelector(".stories-video__programs-wrapper").offsetHeight,s=document.querySelector(".stories-video__header").offsetHeight,r=window.scrollY,a=r>=e.offsetTop+e.offsetHeight-(t+i+o),d=r+window.innerHeight-s<e.offsetTop,l=!1;(a||d)&&0===r?addSticky(l=!0):a||d?(l=!1,removeSticky(),addSticky(l)):removeSticky()},handleCloseStickyClick=function(e){null!==e&&(removeSticky(),window.removeEventListener("scroll",handleScrollVideoList),e.pause())},handleSticky=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];window.addEventListener("powaRender",function(t){var i=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(window.navigator.userAgent),o=t.detail.powa;o.on(window.PoWa.EVENTS.PLAY,function(){window.addEventListener("scroll",handleScrollVideoList)}),o.on(window.PoWa.EVENTS.END,function(){removeSticky(),window.removeEventListener("scroll",handleScrollVideoList)}),!i&&e&&o&&o.play&&!o.isPlay&&(o.play(),o.isPlay=!0),document.querySelector(".stories-video__close").addEventListener("click",function(){return handleCloseStickyClick(o)})})},executeVideoList=function(){function e(){var t=this,i=document.querySelector(".stories-video__list-wrapper"),o=i?[].slice.call(i.children):[];o.unshift(o.splice(o.findIndex(function(e){return e===t}),1)[0]);var s,r,a,d,l="stories-video__item w-full p-10 flex justify-between position-relative cursor-pointer",n='<p class="stories-video__item-live flex items-center uppercase">EN VIVO</p>',c=o[0];if("youtube_id"===c.dataset.type){var u=c.querySelector("img"),v=u.className.indexOf("stories-video__item-default")>0,m=u.alt,f=u.src,p=u.dataset.video,_=!!u.querySelector(".stories-video__item-live");c.className="stories-video__item-dest w-full",c.innerHTML=(s={title:m,image:f,imageDefault:v,video:p.indexOf(!1)?p:p.concat("?autoload=1"),live:_?'<p class="stories-video__youtube-live flex items-center justify-center position-absolute">EN VIVO</p>':""},r=s.title,a=s.image,d=s.imageDefault,'<div class="stories-video__youtube position-relative"><iframe src="'+s.video+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" title="Video" data-img="'+a+'" data-img-default="'+d+'"></iframe>'+s.live+'</div><div class="pt-20 pl-20 pr-20 pb-10 w-full"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+r+"</h2></div></div>")}else{if("basic_video"!==c.dataset.type)throw Error("Este elemento no tiene un tipo de video definido");var y=c.querySelector("img"),w=y.alt,h=y.src,g=y.dataset,S=g.env,b=g.stream,x=g.uuid,E=!!c.querySelector(".stories-video__item-live"),k=c.querySelector(".stories-video__item-time").textContent;c.className="stories-video__item-dest w-full",c.innerHTML=function(e){var t=e.title,i=e.image,o=e.video,s=e.live,r=e.time,a=e.script;return'<div data-img="'+i+'" data-time="'+r+'" data-live="'+s+'"><div class="powa" id="powa-'+o.uuid+'" data-org="elcomercio" data-env="'+o.env+'" data-stream="'+o.stream+'" data-uuid="'+o.uuid+'" data-aspect-ratio="0.562" data-api="'+o.env+'"></div></div><div class="stories-video__content pt-10 lg:pt-20 pl-10 lg:pl-20 pr-10 lg:pr-20 pb-10 w-full position-relative"><div class="stories-video__item-border border-b-1 border-solid pb-10"><h2 class="stories-video__item-dest-title text-white">'+t+'</h2></div><span role="button"tabIndex="0"class="stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold">X</span></div>'+a}({title:w,image:h,video:{env:S,stream:b,uuid:x},live:E,time:k,script:powaBoot?"":'<script src="https://d1tqo5nrys2b20.cloudfront.net/'+S+'/powaBoot.js?org=elcomercio"/>'}),powaBoot&&setTimeout(function(){return powaBoot()},200)}var q=o[1];if("youtube_id"===q.dataset.type){var N=q.querySelector("iframe"),L=q.querySelector(".stories-video__item-dest-title").textContent,V=N.dataset.img,T=N.dataset.imgDefault,H=N.src,j=!!q.querySelector(".stories-video__youtube-live");q.className=l,q.innerHTML=function(e){var t=e.title;return'<img src="'+e.image+'" alt="'+t+'" class="stories-video__item-'+e.imageDefault+' w-full h-full object-cover object-center mr-15" data-video="'+e.video+'"><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+t+"</h2>"+e.live+"</div>"}({title:L,image:V,imageDefault:T?"default":"img",video:H,live:j?n:""})}else{if("basic_video"!==q.dataset.type)throw Error("Este elemento no tiene un tipo de video definido");var C=q.querySelector("div[data-img]"),P=q.querySelector(".stories-video__item-dest-title").textContent,D=C.dataset,O=D.img,B=D.time,I=D.live,M=C.firstElementChild.dataset,W=M.env,A=M.stream,Y=M.uuid;q.className=l,q.innerHTML=function(e){var t=e.title,i=e.image,o=e.video,s=e.live,r=e.time;return'<img src="'+i+'" alt="'+t+'" class="stories-video__item-img w-full h-full object-cover object-center mr-15" data-env="'+o.env+'" data-stream="'+o.stream+'" data-uuid="'+o.uuid+'"><span class="stories-video__item-time position-absolute icon-video text-white flex justify-center items-center">'+r+'</span><div class="stories-video__item-text text-white"><h2 class="stories-video__item-title text-white mb-10">'+t+"</h2>"+s+"</div>"}({title:P,image:O,video:{env:W,stream:A,uuid:Y},live:"true"===I?n:"",time:B})}var R=i.cloneNode();o.forEach(function(e){return R.appendChild(e.cloneNode(!0))}),[].slice.call(R.children,1).forEach(function(t){t.addEventListener("click",e)}),i.replaceWith(R)}var t=document.querySelector(".stories-video__list-wrapper"),i=t?[].slice.call(t.children,1):[];setTimeout(function(){i.forEach(function(t){t.addEventListener("click",e)})},0)};setTimeout(function(){handleSticky()},0),window.addEventListener("load",function(){setTimeout(function(){executeVideoList()},0)});`
