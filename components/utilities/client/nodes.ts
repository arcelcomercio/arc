type ScriptProps = {
  src?: string
  async?: boolean
  defer?: boolean
  textContent?: string
}

export const createScript = ({
  src,
  async,
  defer,
  textContent = '',
}: ScriptProps): HTMLScriptElement => {
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
  return node
}

export const createLink = (url: string): HTMLLinkElement => {
  const node = document.createElement('link')
  node.rel = 'stylesheet'
  node.href = url
  return node
}

export const appendToBody = (node: HTMLElement): void => {
  document.body.append(node)
}

export const appendToId = (id: string, node: HTMLElement): void => {
  const element = document.getElementById(id)
  if (element && node) element.append(node)
}
