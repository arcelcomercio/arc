import React from 'react'

export default () => {
  return (
    <div className="tv-separator__item m-10 w-full">
      <button
        type="button"
        className="tv-separator__img-button p-0 overflow-hidden rounded-sm mb-10">
        <picture className="block w-full">
          <img
            className="w-full"
            src="https://peru21.pe/files/listing_p21_p21tv_episodios_programa/uploads/2019/08/09/5d4df9a18f76d.jpeg"
            alt=""
          />
        </picture>
      </button>
      <h2 className="mb-15">
        <button
          type="button"
          className="p-0"
          onClick={() => console.log('TODO: HACER EL POPUP')}>
          <span className="tv-separator__text-button text-white font-bold text-xl text-left line-h-xs overflow-hidden">
            {
              'César Villanueva: "Martín Vizcarra no tiene absolutamente nada que ver"'
            }
          </span>
        </button>
      </h2>
      <time className="block text-white text-md" dateTime="9/8/2019">
        9/8/2019
      </time>
    </div>
  )
}
