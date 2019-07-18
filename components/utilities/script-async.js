const scriptsAsync = []
let isLoading = false
let index = 0

const loadScriptAsync = () => {
  if (isLoading) return
  isLoading = true
  // eslint-disable-next-line
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
  const script = scriptsAsync.find(elm => elm.name === props.name)
  if (!script) {
    const newScript = { ...props }
    const promise = new Promise((resolve, reject) => {
      newScript.resolve = resolve
      newScript.reject = reject
    })
    newScript.promise = promise
    scriptsAsync.push(newScript)
    loadScriptAsync()
    return promise
  }
  return script.promise
}

export default addScriptAsync
