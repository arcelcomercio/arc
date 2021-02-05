const generateId = () =>  Date.now() + '-' + Math.floor(Math.random() * 1000000);

const buildDataAns = () => {
    return {
    }
}

const renderForEditAndView = (dataParams) => {
  //console.log('dataParams', dataParams);
  // Setup Element Preview
  const { id } = dataParams
  const template = document.getElementById('content_template').innerHTML
  const html = template
    .replace(/%item_id%/gi, 'row-' + id)

  const element = document.createElement('div')
  document.getElementById('content_holder').innerHTML = ''
  document.getElementById('content_holder').appendChild(element)
  element.outerHTML = html

  // Update form state
  //document.getElementById('video_key').value = (key || "")
}

const buildMessage = (id, data) => {
  const ansCustomEmbed = {
      id,
      url: '/pf/api/v3/content/fetch/photo-by-id',
      config: data
  }
  // console.log('ansCustomEmbed');
  // console.dir(ansCustomEmbed);
  // console.log('string', JSON.stringify(ansCustomEmbed, null, 2));
  sendMessage('data', ansCustomEmbed)
}

window.submitData = () => {
  console.log('accept')
  buildMessage(generateId(), buildDataAns());
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

    if(parameters.p !== undefined){
        const data = JSON.parse(decodeURIComponent(parameters.p));
        renderForEditAndView(data)
        if(document.getElementById('btn_cancel') != null) {
            document.getElementById('btn_cancel').onclick = dismissEditor;
        }
    }
}
////////////////////////