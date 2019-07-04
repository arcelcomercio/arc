const scriptsAsync = []
let isLoading = false
let index = 0

const loadScriptAsync = () => {
  if (isLoading) {
    return
  }
  isLoading = true
  // eslint-disable-next-line no-plusplus
  const { url, resolve, reject, type } = scriptsAsync[index++]
  const script = document.createElement('script')
  script.async = true
  script.src = url
  if (type) {
    script.type = type
  }
  script.onerror = () => {
    isLoading = false
    reject()
    if (scriptsAsync.length > index) {
      loadScriptAsync()
    }
  }
  script.onload = () => {
    isLoading = false
    resolve(true)
    if (scriptsAsync.length > index) {
      loadScriptAsync()
    }
  }
  document.body.appendChild(script)
}

const addScriptAsync = props => {
  const isScriptRepeat = scriptsAsync.some(elm => elm.name === props.name)
  if (!isScriptRepeat) {
    return new Promise((resolve, reject) => {
      scriptsAsync.push({ ...props, resolve, reject })
      loadScriptAsync()
    })
  }
  return new Promise(resolve => resolve(false))
}

export default addScriptAsync
