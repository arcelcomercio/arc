import * as React from 'react'
import { useContent } from 'fusion:content'

import { formatHtmlToText } from '../../../../utilities/parse/strings'
import { msToTime } from '../../../../utilities/date-time/time'
import { getAssetsPathVideo } from '../../../../utilities/assets'

const VideoSeoItem = ({
  url,
  caption,
  description,
  urlImage,
  date,
  duration,
  arcSite,
}) => {
  const {
    amp_image_1x1: ampVideo1x1 = urlImage,
    amp_image_4x3: ampVideo4x3 = urlImage,
    amp_image_16x9: ampVideo16x9 = urlImage,
  } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: urlImage || url,
        presets:
          'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
      },
    }) || {}

  const image = `["${ampVideo1x1}", "${ampVideo4x3}", "${ampVideo16x9}"]`

  return `{ 
    "@type":"VideoObject",  
    "name":"${formatHtmlToText(caption.trim() || arcSite)}", 
    "thumbnailUrl": ${image},  
    "description":"${formatHtmlToText(
      description.trim() || caption.trim() || arcSite
    )}", 
    "contentUrl": "${getAssetsPathVideo(arcSite, url)}",  
    "uploadDate": "${date}", 
    "duration": "${msToTime(duration, false)}" } `
}

export default React.memo(VideoSeoItem)
