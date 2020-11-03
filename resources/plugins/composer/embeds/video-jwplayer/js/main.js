import {getVideos, getConversionsVideo, getVideo} from './api.js';

const renderVideos = (search = '', brand) => {
    const template = document.getElementById('template_video').innerHTML;
    const boxVideos = document.getElementById('box_videos');
    boxVideos.innerHTML = '';
    const boxHide = document.getElementById('dont_videos_search');
    getVideos(search, brand).then(response=>{
      boxHide.classList.remove('d-block');
      boxHide.classList.add('d-none');
      if(response.videos.length > 0){
        response.videos.forEach(data => {
          const {key, title, description, link, duration, custom: {thumbnail_url = ''} = {}} = data
          const image = thumbnail_url ? thumbnail_url: `https://cdn.jwplayer.com/v2/media/${key}/poster.jpg` // ?width=320`
          const htmlVideo = template.replace(/%key%/gi, key)
          .replace(/%brand%/gi, brand)
          .replace(/%title%/gi, title)
          .replace(/%data%/gi, encodeURI(JSON.stringify(data)))
          .replace(/%description%/gi, description)
          .replace(/%duration%/gi, duration)
          .replace(/%thumbnail_url%/gi, image);
          const element = document.createElement('div')
          boxVideos.appendChild(element);
          element.outerHTML = htmlVideo;
        });
      }else{
        boxHide.classList.remove('d-none');
        boxHide.classList.add('d-block');
      }
    });
}

const renderForEditAndView = (dataParams) => {
    console.log('dataParams', dataParams);
    // Setup Element Preview
    const {id, config:{key, title, description, thumbnail_url, has_ads=0}} = dataParams
    const template = document.getElementById('content_template').innerHTML
    const hasAds = has_ads ? 'Si': 'No'
    const html = template
      .replace(/%item_id%/gi, 'row-' + id)
      .replace(/%thumbnail_url%/gi, thumbnail_url)
      .replace(/%title%/gi, title)
      .replace(/%description%/gi, description)
      .replace(/%has_ads%/gi, hasAds)
      .replace(/%video_key%/gi, key)
      //.replace(/%data%/gi, JSON.stringify(dataParams, null, 2))

    const element = document.createElement('div')
    document.getElementById('content_holder').innerHTML = ''
    document.getElementById('content_holder').appendChild(element)
    element.outerHTML = html

    // Update form state
    //document.getElementById('video_key').value = (key || "")
}

//todo: implementar edición de valores
const applyChanges = () => {
    data.config.url = document.getElementById('video_key').value
    data.config.url_img = document.getElementById('url_img').value
    // Update Composer and re-render form
    sendMessage('data', data)
    renderForEditAndView(data)
  }


window.handleSearch = () => {
    const search = document.getElementById('search_video').value || "";
    const brand = document.getElementById('brand').value || "";
    renderVideos(search, brand)
}

window.selectVideo = (videoKey) => {
    const brand =event.currentTarget.getAttribute('data-brand');
    const dataVideo = JSON.parse(decodeURI(event.currentTarget.getAttribute('data-data')));
    // console.log('dataVideo', dataVideo);
    const hasAds = document.querySelector('input[type=checkbox][name=has_ads]:checked');
    dataVideo.has_ads = (hasAds && hasAds.value) || 0;
    buildMessage(generateId(), buildDataAns(dataVideo, brand));
}

window.selectVideoId = (videoKey, brand) => {
  (videoKey && brand) && getVideo(videoKey, brand).then(response => {
    // console.log('dataVideo', response.video);
    if(response.video){
      const hasAds = document.querySelector('input[type=checkbox][name=has_ads]:checked');      
      response.video.has_ads = (hasAds && hasAds.value) || 0;
      buildMessage(generateId(), buildDataAns(response.video, brand));
    }else{
      alert('El ID del video no se encuentra')
    }
  })
}

const generateId = () =>  Date.now() + '-' + Math.floor(Math.random() * 1000000);

const buildDataAns = (data, brand) => {
    const {key, title, description, size, duration, status, updated, date, custom:{ thumbnail_url = '' } = {}, has_ads = 0} = data || {};
    // const source_file_mp4 = `https://content.jwplatform.com/videos/${key}-${template_id}.mp4`;
    const image = thumbnail_url ? thumbnail_url: `https://cdn.jwplayer.com/v2/media/${key}/poster.jpg` // ?width=720`
    const conversions = getPathsVideos(key, brand);
    return {
        key,
        title, 
        description,
        size, 
        duration, 
        status, 
        thumbnail_url: image,
        conversions,
        date,
        updated,
        has_ads,
        account: brand
    }
}

async function getPathsVideos(videoKey, brand) {
    const response = await getConversionsVideo(videoKey, brand);
    return response.conversions;
}


const buildMessage = (id, data) => {
    data.conversions.then(conversions=> {
        data.conversions = conversions;
        const ansCustomEmbed = {
            id,
            url: '/pf/api/v3/content/fetch/photo-by-id',
            config: data
        }
        console.log('ansCustomEmbed', ansCustomEmbed);
        //console.log('string', JSON.stringify(ansCustomEmbed, null, 2));
        sendMessage('data', ansCustomEmbed)
    });
}

//////// don't touch
const sendMessage = function(action, data) {
    window.parent.postMessage(
      JSON.stringify({
        source: 'custom_embed',
        action,
        data,
        key: parseQueryString()['k']
      }),
      '*'
    )
}

const parseQueryString = function() {
    const params = location.search.split('?')[1] || ''
    const kv = params.split('&')
    return kv.reduce((result, item) => {
      const [key, value] = item.split('=')
      return Object.assign(result, {
        [key]: value
      })
    }, {})
}

const dismissEditor = () => {
    sendMessage('cancel')
}

window.onload = function() {
    const parameters = Object.assign(
      {
        wait: 0
      },
      parseQueryString()
    )
    // Emulate wait time
    setTimeout(function() {
      sendMessage('ready', {
        height: document.documentElement.scrollHeight
      })
    }, Number.parseInt(parameters.wait))

    
    // data = JSON.parse(decodeURIComponent(parameters.p))
    if(parameters.p !== undefined){
        const data = JSON.parse(decodeURIComponent(parameters.p));
        renderForEditAndView(data)
        // document.getElementById('btn_apply').onclick = applyChanges
        if(document.getElementById('btn_cancel') != null) {
            document.getElementById('btn_cancel').onclick = dismissEditor;
        }
    }
}
////////////////////////