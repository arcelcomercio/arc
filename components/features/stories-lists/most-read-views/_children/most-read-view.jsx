import React from 'react'

const classes = {
  mrFree: 'mr-view bg-white row-1 h-full flex flex-col',
  mrWrapper: 'mr-view__wrapper h-full flex flex-col justify-between',
  mrHeader: 'mr-view__header p-10',
  mrTitle:
    'mr-view__title block uppercase font-bold text-center secondary-font',
  mrBody: 'mr-view__body pb-5',
  mrItem: 'mr-view__item flex pb-5 pt-5',
  mrItemLeft: 'mr-view__left ml-10 flex flex-col justify-center items-center',
  mrNum: 'mr-view__num title-md ',
  mrView: 'mr-view__view secondary-font text-md',
  mrItemRight: 'mr-view__right pr-10 pl-10',
  mrLink: 'mr-view__link text-sm',
  footer: 'mr-view__footer p-10 flex justify-center',
  btn:
    'mr-view__btn secondary-font flex justify-center text-sm items-center rounded-sm uppercase text-center',
  mrHTML: 'mr-view__html flex justify-center p-5',
}

export default React.memo(({
  data,
  title,
  urlTitle,
  showMore,
  urlShowMore,
  showViews,
  freeHTML,
  arcSite,
}) => {
  const { content_elements: dataList = [] } = data
  return (
    <div className={classes.mrFree}>
      <div className={`${classes.mrWrapper} ${freeHTML && 'h-full hashtml'}`}>
        <div className={classes.top}>
          <div className={classes.mrHeader}>
            {urlTitle ? (
              <a className={classes.mrTitle} href={urlTitle}>
                {title || 'Lo mas leido'}
              </a>
            ) : (
                <p className={classes.mrTitle}>{title || 'Lo mas leido'}</p>
              )}
          </div>
          <div className={classes.mrBody}>
            {dataList.map((item, index) => {
              const {
                headlines: { basic: titleNew = '' } = {},
                websites = {},
              } = item
              const brandWeb = websites[arcSite] || {}
              const linkNew = brandWeb.website_url || ''
              return (
                <div className={classes.mrItem}>
                  {showViews && (
                    <div className={classes.mrItemLeft}>
                      {/* <p className={classes.mrNum}>64k</p>
                <p className={classes.mrView}>Vistas</p> */}
                      <p className={classes.mrNum}>{index + 1}</p>
                    </div>
                  )}
                  <div className={classes.mrItemRight}>
                    <a href={linkNew} className={classes.mrLink}>
                      {titleNew}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {showMore && (
          <div className={classes.footer}>
            <a href={urlShowMore} className={classes.btn}>
              Ver todo
            </a>
          </div>
        )}
      </div>
      {freeHTML && (
        <div
          className={classes.mrHTML}
          dangerouslySetInnerHTML={{ __html: freeHTML }}
        />
      )}
    </div>
  )
})