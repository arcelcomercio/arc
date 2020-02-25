import AdsContent from './_dependencies/ads/ads-content'

const text = ({ globalContent = {} }) => {
  const content = AdsContent(globalContent)
  return content
}

text.contentType = 'text/plain'

export default text
