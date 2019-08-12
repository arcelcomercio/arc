import React from 'react'

import TvSeparatorItem from './_children/separator-item'

const TvSeparator = () => {
  return (
    <div className="tv-separator ml-10 mr-10 lg:ml-30 lg:mr-30 mb-25">
      <div className="flex justify-between items-center mb-20">
        <h2>
          <a href="/asd" className="title-lg text-white font-bold uppercase">
            21Noticias
          </a>
        </h2>
        <a href="/asdasdasds" className="tv-separator__program font-bold">
          Ver programa
        </a>
      </div>

      <div className="flex justify-center">
        <TvSeparatorItem />
        <TvSeparatorItem />
        <TvSeparatorItem />
        <TvSeparatorItem />
        <TvSeparatorItem />
        <TvSeparatorItem />
      </div>
    </div>
  )
}

export default TvSeparator
