import React from 'react'

export default () => {
  return (
    <div className="video-list__item m-10">
      <picture className="block mb-10">
        <img
          className="w-full"
          src="https://img.elcomercio.pe/files/listing_news_flow/uploads/2019/08/20/5d5c3aacf3ed8.png"
          alt=""
        />
      </picture>
      <div className="flex">
        <span className="text-gray-200 text-md pr-5">01:20</span>
        <span className="text-gray-200 text-md">Global</span>
      </div>
      <a href="/asd" className="block mb-10">
        <h3 className="line-h-xs text-xl font-bold">
          Callao, Chalaco y Chim Pum: ¿Cuál es el origen de éstas palabras y qué
          significan?
        </h3>
      </a>
      {/* <time className="text-lg text-gray-200" dateTime="">
        13:25
      </time> */}
    </div>
  )
}
