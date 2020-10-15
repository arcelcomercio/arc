import {getVideos, getConversionsVideo} from './api.js';

const renderVideos = (search = '') => {
    const template = document.getElementById('template_video').innerHTML;
    const boxVideos = document.getElementById('box_videos');
    boxVideos.innerHTML = '';
    getVideos(search).then(response=>{
        response.videos.forEach(data => {
            const {key, title, description, link, duration, custom: {thumbnail_url}} = data
            const htmlVideo = template.replace(/%key%/gi, key)
            .replace(/%title%/gi, title)
            .replace(/%data%/gi, encodeURI(JSON.stringify(data)))
            .replace(/%description%/gi, description)
            .replace(/%duration%/gi, duration)
            .replace(/%thumbnail_url%/gi, thumbnail_url);
            const element = document.createElement('div')
            boxVideos.appendChild(element);
            element.outerHTML = htmlVideo;
        });
    });
}

const renderForEditAndView = (dataParams) => {
    console.log('dataParams', dataParams);
    // Setup Element Preview
    const {id, config:{key, title, description, thumbnail_url}} = dataParams
    const template = document.getElementById('content_template').innerHTML
    const html = template
      .replace(/%item_id%/gi, 'row-' + id)
      .replace(/%thumbnail_url%/gi, thumbnail_url)
      .replace(/%title%/gi, title)
      .replace(/%description%/gi, description)
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
    renderVideos(search)
}

window.selectVideo = (videoId) => {
    const dataVideo = JSON.parse(decodeURI(event.currentTarget.getAttribute('data-data')));
    console.log('dataVideo', dataVideo);
    buildMessage(generateId(), buildDataAns(dataVideo));
}

const generateId = () =>  Date.now() + '-' + Math.floor(Math.random() * 1000000);

const buildDataAns = (data) => {
    const {key, title, description, size, duration, status, custom:{ thumbnail_url }} = data;
    // const source_file_mp4 = `https://content.jwplatform.com/videos/${key}-${template_id}.mp4`;
    const conversions = getPathsVideos(key);
    return {
        key,
        title, 
        description,
        size, 
        duration, 
        status, 
        thumbnail_url,
        conversions,
        // source_file_mp4
    }
}

async function getPathsVideos(videoKey) {
    const response = await getConversionsVideo(videoKey);
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
            console.log('btn')
            document.getElementById('btn_cancel').onclick = dismissEditor;
        }
    }
}

////////////////////////