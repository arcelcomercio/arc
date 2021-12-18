import { useFusionContext } from 'fusion:context'
import React, { useEffect, useState } from 'react'

import { SITE_TROME } from '../../../../utilities/constants/sitenames'
import CardMostRead from '../../../cards/most-read/default'
import StoriesListPaginatedList from '../../../stories-lists/paginated-list/default'
import SearchFilterChildSearchFilter from '../../../widgets/search-filter/_children/search-filter'
import ErrorView from './error-view'

const SpinnerComponent = () => (
  <>
    <div
      className="custom-search__spinner"
      style={{ fontSize: '3px', marginTop: '30px', marginBottom: '30px' }}
    />
    <style
      dangerouslySetInnerHTML={{
        __html: `.custom-search__spinner{width:10em;height:10em;border-top:1em solid #555;border-right:1em solid transparent;border-radius:50%;margin:auto;animation:score-spinner .6s linear infinite}@keyframes score-spinner{100%{transform:rotate(360deg)}}`,
      }}
    />
  </>
)

const SearchView = ({ customFields }) => {
  const { arcSite, requestUri, isAdmin, deployment } = useFusionContext()

  const [isSearchPath, setIsSearchPath] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchResponse, setSearchResponse] = useState({})
  const [isSearchListLoading, setIsSearchListLoading] = useState(true)

  const fullPath = requestUri.split('?')[0]
  const pathArr = fullPath.split('/').filter((el) => el !== '')

  const [, query, section, sort, from] = pathArr

  const fetchQuery = {
    size: '30',
    query,
    section,
    sort,
  }
  if (pathArr[4]) {
    fetchQuery.from = from
  }

  const renderResults = () => (
    <>
      {isSearchListLoading ? (
        <SpinnerComponent />
      ) : (
        <div
          role="main"
          className={
            arcSite !== SITE_TROME ? 'content-sidebar__left' : 'mt-20 mb-20'
          }>
          <StoriesListPaginatedList
            isComponent
            customGlobalContentConfig={{
              query: fetchQuery,
            }}
            customGlobalContent={searchResponse}
          />
        </div>
      )}
      {arcSite !== SITE_TROME && (
        <aside className="content-sidebar__right">
          <div className="flex items-center flex-col justify-center w-full no-mobile no-row-2-mobile">
            <div id="gpt_caja1" className="flex justify-center" />
          </div>
          <CardMostRead />
          <div className="flex items-center flex-col justify-center w-full no-desktop no-row-2-mobile">
            <div id="gpt_caja4" className="flex justify-center" />
          </div>
          <div className="flex items-center flex-col no-desktop pb-20">
            <div id="gpt_caja2" className="flex justify-center" />
          </div>
          <div className="flex items-center flex-col justify-center w-full no-row-2-mobile">
            <div id="gpt_vslider" className="flex justify-center" />
          </div>
        </aside>
      )}
    </>
  )

  useEffect(() => {
    if (/^\/buscar\//.test(requestUri)) {
      setIsSearchPath(true)
      const source = 'story-feed-by-search-with-resolve'
      fetch(
        `/pf/api/v3/content/fetch/${source}?query=${encodeURI(
          JSON.stringify(fetchQuery)
        )}&d=${deployment}&_website=${arcSite}`
      )
        .then((res) => res.json())
        .then((res) => {
          setIsSearchListLoading(false)
          setSearchResponse(res)
          if (window.lazyLoadInstance) {
            window.lazyLoadInstance.update()
          }
        })
        .catch((e) => {
          console.log(e)
          setIsSearchListLoading(false)
        })
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <SpinnerComponent />
  }

  const titleAlign =
    arcSite !== SITE_TROME
      ? 'text-left'
      : 'text-center custom-title__page-search'

  return isSearchPath ? (
    <div>
      <SearchFilterChildSearchFilter
        arcSite={arcSite}
        requestUri={requestUri}
        isAdmin={isAdmin}
        globalContentConfig={{
          query: fetchQuery,
        }}
      />
      {isSearchListLoading ? null : (
        <h1
          itemProp="name"
          className={`w-full pt-10 mt-20 custom-title ${titleAlign} medium pb-10`}>
          SE ENCONTRARON {searchResponse?.count || 0} RESULTADOS PARA:{' '}
          {decodeURIComponent(query || '')
            .replace(/\+/g, ' ')
            .toUpperCase()}
        </h1>
      )}
      {arcSite !== SITE_TROME ? (
        <div className="content-sidebar flex mt-20 mb-20">
          {renderResults()}
        </div>
      ) : (
        renderResults()
      )}
    </div>
  ) : (
    <ErrorView customFields={customFields} />
  )
}

export default SearchView
