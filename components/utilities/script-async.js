const scriptsAsync = []
const PENDING = 'pending'
const LOADED = 'loaded'
const LOADING = 'loading'
let isLoading = false
let index = 0

const loadScriptAsync = () => {
  if (isLoading) {
    return
  }
  isLoading = true
  const current = index++;
  // eslint-disable-next-line no-plusplus
  const { url, resolve, reject, type } = scriptsAsync[current]
  scriptsAsync[current].status = LOADING;
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
    scriptsAsync[current].status = LOADED
    resolve(true)
    if (scriptsAsync.length > index) {
      loadScriptAsync()
    }
  }
  document.body.appendChild(script)
}

const addScriptAsync = props => {
  const isScriptRepeat = scriptsAsync.some(({name, status}) => name === props.name && status === LOADED )
  if (!isScriptRepeat) {
    return new Promise((resolve, reject) => {
      scriptsAsync.push({ ...props, resolve, reject, status: PENDING })
      loadScriptAsync()
    })
  }
  return new Promise(resolve => resolve(false))
}

export default addScriptAsync
