import { useEditableContent } from 'fusion:content'
import * as React from 'react'

import ChainGridGrouperContext from '../../../../contexts/chain-grid-grouper'

interface Props {
  customFields: {
    type:
      | 'simple'
      | 'with-subtitle'
      | 'with-image'
      | 'editorial'
      | 'columnist'
      | undefined
    titleField: string
  }
}

const FeaturedStoryChildrenSimple: React.FC<Props> = (props) => {
  const chainData = React.useContext(ChainGridGrouperContext)

  const { editableField } = useEditableContent()

  const { customFields } = props

  if (
    chainData.type === '1x1-double' ||
    chainData.type === '1x1-triple' ||
    chainData.type === undefined // Para el caso que el feature no se esté usando en un chain
  ) {
    return (
      <div
        className={`fs-s ${chainData.type ? `c-${chainData.type}` : 'row-1'}`}>
        <h3 className="fs-s__section">
          <a href="/">Fraude</a>
        </h3>
        <h2
          className="fs-s__title"
          {...editableField('titleField')}
          suppressContentEditableWarning>
          <a href="/">
            {customFields.titleField ||
              'Largas colas y aglomeración en el Parque de la Exposición en reinicio de vacupnación'}
          </a>
        </h2>
        <address className="fs-s__authors">
          <a href="/">Jean Pierre Andonaire Villegas</a>
        </address>
        <div className="fs-s__subs">
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_103_106)">
              <path
                d="M-0.00408936 2.61755H2.84503L3.92316 0.00134277L5.15411 2.61755H8.14484L5.53888 4.39685L6.60089 7.71814L3.92316 5.56677L1.41681 7.71814L2.52814 4.39685L-0.00408936 2.61755Z"
                fill="#AD9130"
              />
            </g>
            <defs>
              <clipPath id="clip0_103_106">
                <rect width="8.149" height="7.718" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Exclusivo para suscriptores</span>
        </div>
      </div>
    )
  }
  return null
}

export default FeaturedStoryChildrenSimple
