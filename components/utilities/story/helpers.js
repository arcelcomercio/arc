import { getAssetsPathVideo } from '../assets'

export const getVideoIdRedSocial = (content = '', type = '') => {
  let customPhotoUrl = []
  let videoId = ''
  if (content) {
    customPhotoUrl = content.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\\-]{10,12})/
    )
    const [, youtubeId = ''] = customPhotoUrl || []
    if (youtubeId) {
      videoId = { youtube: youtubeId }
    }

    if (!customPhotoUrl && type) {
      customPhotoUrl = content.match(
        /twitter.com((\/[\w\d])\w+)\/status\/([\d]{10,25})/
      )
      const [, userId = '', , twitterId = ''] = customPhotoUrl || []
      videoId = { twitter: twitterId, user: userId }

      if (userId && twitterId) {
        videoId = { twitter: twitterId, user: userId }
      }
    }

    if (!customPhotoUrl) {
      const facebookContent = content.replace(/%2F/gm, '/')
      customPhotoUrl = facebookContent.match(
        /facebook.com\/plugins\/video.php[?]href=(.+)\/(.*)\/(.*)videos\/([\d]{15,15})/
      )
      const [, , userId = '', , facebookId = ''] = customPhotoUrl || []
      if (userId && facebookId) {
        videoId = { facebook: facebookId, user: `/${userId}` }
      }
    }
    if (!customPhotoUrl) {
      customPhotoUrl = content.match(
        /facebook.com((\/[\w\d])\w+)\/videos\/([\d]{10,25})/
      )
      const [, userId = '', , facebookId = ''] = customPhotoUrl || []
      if (userId && facebookId) {
        videoId = { facebook: facebookId, user: userId }
      }
    }
  }
  return videoId
}

export const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return getAssetsPathVideo(arcSite, resultVideo[cantidadVideo - 1])
}
export const stripTags = (inputs, allowed = '') => {
  const allowedNew = (
    allowed.toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('')
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
  return inputs.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
    const input = `<${$1.toLowerCase()}>`
    return allowedNew.indexOf(input) > -1 ? $0 : ''
  })
}

export const processedAds = (content, type = '', arcSite = '', secc = '') => {
  const publicidadHtml = espacio => {
    return `<div id=${`gpt_${espacio}`} className="f just-center" data-ads-name=${`/28253241/${arcSite}/web/post/${secc}/${espacio}`}
                  data-ads-dimensions="[[300,250]]" data-ads-dimensions-m="[[300,250],[320,50],[320,100]]"></div>`
  }

  const spaceDefault = numero => {
    return `<div id="gpt_caja${numero}" class="flex justify-center"></div>`
  }

  const contentHtml = content
    .replace('</script>:', '</script>')
    .replace(':<script', '<script')
    .replace(/:icon:/g, '<div  class="more-compartir"></div>')
    .replace(/(<div id="gpt_caja([0-9])" .+?><\/div>)/g, '')
    .replace(
      /:fijado:/g,
      '<div class="fijado"><div class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" class="icon-compartir" width="20" height="20" viewBox="0 0 475 475"><path d="M380 247c-15-19-32-28-51-28V73c10 0 19-4 26-11 7-7 11-16 11-26 0-10-4-18-11-26C347 4 339 0 329 0H146c-10 0-18 4-26 11-7 7-11 16-11 26 0 10 4 19 11 26 7 7 16 11 26 11v146c-19 0-36 9-51 28-15 19-22 40-22 63 0 5 2 9 5 13 4 4 8 5 13 5h115l22 139c1 5 4 8 9 8h0c2 0 4-1 6-2 2-2 3-4 3-6l15-138h123c5 0 9-2 13-5 4-4 5-8 5-13C402 287 395 266 380 247zM210 210c0 3-1 5-3 7-2 2-4 3-7 3-3 0-5-1-7-3-2-2-3-4-3-7V82c0-3 1-5 3-7 2-2 4-3 7-3 3 0 5 1 7 3 2 2 3 4 3 7V210z" data-original="#000000"/></svg></div></div>'
    )
  const res = contentHtml.split('<div class="live-event2-comment">')
  let entryHtml = ''
  res.forEach((entry, i) => {
    let publicidad = ''
    const divContent = i === 0 ? '' : '<div class="live-event2-comment">'

    if (i === 3) {
      publicidad = type !== 'lite' ? spaceDefault(2) : publicidadHtml('caja2')
    }
    if (i === 7) {
      publicidad = type !== 'lite' ? spaceDefault(3) : publicidadHtml('caja3')
    }
    if (i === 11) {
      publicidad = type !== 'lite' ? spaceDefault(4) : publicidadHtml('caja4')
    }
    entryHtml = `${entryHtml} ${divContent} ${entry} ${publicidad} `
  })

  return entryHtml
}

export const getResultJwplayer = streams => {
  const resultVideo = streams
    .map(({ mediatype = '', link: { address = '', path = '' } = {} }) => {
      return mediatype === 'video' ? `https://${address}${path}` : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
}
