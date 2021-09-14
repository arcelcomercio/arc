import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import GroupList from './group-list'
import HospitalDetail from './hospital-detail'

/**
 * @param {Array} list
 * @param {string} key
 */
const groupBy = (list, key) =>
  (list || []).reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

/**
 * @typedef {Object} PageInfo
 * @property {('home' | 'group' | 'hospital')} type
 * @property {string} title
 */
/**
 * @param {Array} paths
 * @returns {PageInfo}
 */
const getPageInfo = (paths) => {
  let type = ''
  let title = 'Ubica tu zona y elige tu centro médico'
  if (paths.length === 4) {
    type = 'group'
    // title = 'Elige tu centro médico'
  } else if (paths.length === 5) {
    type = 'hospital'
    title = ''
  } else {
    type = 'home'
    /* title =
      paths[2] === 'nacional'
        ? 'Ubica tu región y elige tu distrito'
        : 'Ubica tu zona y elige tu distrito' */
  }
  return {
    type,
    title,
  }
}

export default function UciBedsHome() {
  const { requestUri } = useAppContext()

  /**
   * @type {string[]}
   * @description Response: ['covid', 'camas-uci', 'lima-norte']
   */
  const paths = requestUri
    .split('?')[0]
    .split('/')
    .filter((item) => item)

  const mainPath = `/${paths[0]}/${paths[1]}`

  const pageInfo = getPageInfo(paths)

  const { data = [] } =
    useContent({
      source: 'get-spreadsheet-covid',
      query: {
        title: 'Camas UCI',
      },
    }) || {}

  const dataGroupByTerritory = groupBy(data, 'territorio_slug') || {}

  const dataGroupByGroup =
    groupBy(dataGroupByTerritory?.[paths[2] || 'lima'], 'grupo_slug') || {}

  return (
    <>
      <div className="uci-home">
        <h1 className="uci-home__title">Camas UCI</h1>
        <h2 className="uci-home__subtitle">{pageInfo.title}</h2>
        {pageInfo.type === 'group' && (
          <a className="uci-home__close-link" href={`${mainPath}/${paths[2]}/`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g clipPath="url(#clip0)">
                <path d="M0.353027 0.353027L13.625 13.625" stroke="#707070" />
                <path d="M13.625 0.353027L0.353027 13.625" stroke="#707070" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="13.979" height="13.979" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        )}
        {pageInfo.type !== 'hospital' && (
          <div className="uci-home__link-d-container">
            {Object.keys(dataGroupByTerritory).map((slug) => (
              <a className="uci-home__link-d" href={`${mainPath}/${slug}/`}>
                {(dataGroupByTerritory[slug] || [])[0]?.territorio}
              </a>
            ))}
          </div>
        )}
        {pageInfo.type === 'home' && (
          <>
            <ul className="uci-home__list">
              {Object.keys(dataGroupByGroup).map((slug) => (
                <li className="uci-home__item">
                  <a
                    href={`${mainPath}/${paths[2] || 'lima'}/${slug}/`}
                    className="uci-home__item-link">
                    <span>{(dataGroupByGroup[slug] || [])[0]?.grupo}</span>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <g clipPath="url(#clip0)">
                        <path d="M4 6L0 0L8 0L4 6Z" fill="#707071" />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="8" height="6" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <a className="uci-home__link-h" href={`/${paths[0]}/`}>
                Inicio
              </a>
            </div>
          </>
        )}
        {pageInfo.type === 'group' && (
          <GroupList list={dataGroupByGroup[paths[3]]} />
        )}
      </div>
      {pageInfo.type === 'hospital' && (
        <HospitalDetail
          backLink={`${mainPath}/${paths[2]}/${paths[3]}/`}
          data={data.find(
            ({ nombre_slug: nombreSlug }) => nombreSlug === paths[4]
          )}
        />
      )}
    </>
  )
}
