export function parseQueryString(): any {
  const params = location.search.split('?')[1] || ''
  const kv = params.split('&')
  return kv.reduce((result, item) => {
    const [key, value] = item.split('=')
    return Object.assign(result, {
      [key]: value,
    })
  }, {})
}

export function sendMessage(action: string, data: any) {
  window.parent.postMessage(
    JSON.stringify({
      source: 'custom_embed',
      action,
      data,
      key: parseQueryString()['k'],
    }),
    '*'
  )
}

export function initPowerUp() {
  const parameters = Object.assign(
    {
      wait: 0,
    },
    parseQueryString()
  )
  // Emulate wait time
  setTimeout(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    })
  }, Number.parseInt(parameters.wait))

  if (parameters.p) {
    const jsonData = JSON.parse(
      decodeURIComponent(parameters.p).replace(/\+/g, ' ')
    )
    console.log('||||||||||||', jsonData)

    return jsonData
  }

  return null
}
