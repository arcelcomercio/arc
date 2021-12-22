import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FeatureComponent } from 'types/features'
import { Stories } from 'types/story'

import MultimediaIcon from '../../../global-components/lite/multimedia-icon'
import Spinner from '../../../global-components/spinner'
import { getAssetsPath } from '../../../utilities/assets'
import { separatorStoriesFields } from '../../../utilities/included-fields'
import { getPromoItemRezisedUrl } from '../../../utilities/story/elements'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { seeMoreButtonScript } from './_dependencies/scripts'

// Este feature se creo en version lite para la seccion de videos del rediseño de El Comercio.
const SeparatorStories: FeatureComponent<any> = (props) => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      isSeeMoreVisible = false,
      titleSeparator = '',
      titleLink = '',
      isSeeMoreScriptActivate = false,
    } = {},
  } = props

  const {
    arcSite,
    // isAdmin,
    contextPath,
    // deployment,
    // requestUri,
    metaValue
  } = useAppContext()

  const presets = 'mobile:231x132'
  const includedFields = separatorStoriesFields

  const stories: Stories =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets,
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const defaultImage = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/default-sm.png`

  return (
    <div className="sep-st">
      <h3 className="sep-st__title">
        <a href={titleLink || stories?.section_id}>
          {titleSeparator || '+ Videos'}
        </a>
      </h3>
      <div className="sep-st__item-c">
        {stories?.content_elements?.map((story) => (
          <div className='pos-rel'>
          <a
            id={story?.websites?.[arcSite]?.website_url}
            href={story?.websites?.[arcSite]?.website_url}
            className="sep-st__item">
            <img
              src={defaultImage}
              alt={story?.headlines?.basic}
              className="sep-st__i-img lazy"
              data-src={
                getPromoItemRezisedUrl(story)?.mobile || defaultImage || ''
              }
            />
            {metaValue('section_style') === 'story-v2-video' && <MultimediaIcon type='basic_video' styles='separador' metaValue={metaValue('section_style')} />}
            <h4 className="sep-st__i-title">{story?.headlines?.basic}</h4>
          </a>
          </div>
        ))}
      </div>
      {isSeeMoreVisible && (
        <button
          className="sep-st__btn"
          type="button"
          id={stories?.section_id}
          data-stories_qty={contentConfigValues?.stories_qty}
          data-next={stories?.next}>
          <span>VER MÁS</span>
          <Spinner />
        </button>
      )}
      {isSeeMoreScriptActivate && (
        <script
          dangerouslySetInnerHTML={{
            __html: seeMoreButtonScript(arcSite, defaultImage),
          }}
        />
      )}
    </div>
  )
}

SeparatorStories.label = 'Separador - noticias'
SeparatorStories.static = true

SeparatorStories.propTypes = {
  customFields,
}

export default SeparatorStories
