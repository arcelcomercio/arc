import { XMLHttpRequest } from 'xmlhttprequest'

const Ads = () => {
  const xhr = new XMLHttpRequest()
  const url =
    'https://d34fzxxwb5p53o.cloudfront.net/output/assets/rugles/ads/ads.txt'
  let result = 'nada'
  xhr.open('GET', url, false)
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        result = xhr.responseText
      } else {
        result = 'Error'
      }
    }
  }
  xhr.onerror = () => {
    result = 'Error'
  }
  xhr.send(null)
  return result
}

Ads.contentType = 'text/plain'

export default Ads
