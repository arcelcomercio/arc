import React, {Fragment} from 'react'
import renderHTML from 'react-render-html'
import ConfigParams from '../../../../resources/components/utils/config-params';

const EmbedMultimedia = props => {
    const multimedia = {
        youtube : () => {
            const url = 'https://www.youtube.com/embed/7h2ryr_uUEs'
            const width = '100%'
            const height = '100%'
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            const embedHtml = <iframe 
                width={width}
                height={height} 
                src={url}
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen />
            return embedHtml
        },

        goldFish: (embed) => {
            return  <div
                id="powa-26829ba2-370c-4d75-81e2-dcbed324e826"
                data-env="sandbox"
                data-api="sandbox"
                data-org="elcomercio"
                data-uuid="26829ba2-370c-4d75-81e2-dcbed324e826"
                data-aspect-ratio="0.562"
                className="powa">
                <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
            </div>
        },

        image: (url, title) => {
            return <img src={url} alt={title} />
        }
    }
    
    const {multimedia: url, title, type, video} = props
    const image = multimedia.image(url, title)
    const youtube = multimedia.youtube()
    const goldFish = multimedia.goldFish(video)
    const multimediaType = {
        [ConfigParams.VIDEO]: goldFish,
        [ConfigParams.GALLERY]: image,
        [ConfigParams.IMAGE]: image,
    }

    return <Fragment>
        {multimediaType[type]}
    </Fragment>
}
export default EmbedMultimedia
