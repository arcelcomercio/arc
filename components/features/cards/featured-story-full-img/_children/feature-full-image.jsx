import React from 'react'

const getModel = model => {
  const type = {
    basic: 'row-1',
    twoCol: ' col-2 ',
    full: ' col-2 row-2 ',
  }
  return type[model] || type.basic
}

export default ({ crossY, crossX, model }) => {
  return (
    <div
      className={`feature-fullimage ${crossY} ${crossX} ${getModel(model)} `}>
      <div className="feature-fullimage__box-image">
        <img
          src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          className="feature-fullimage__image"
        />
      </div>
      <div className="feature-fullimage__box-detail">
        <h3>
          <a className="feature-fullimage__section text-white text-md" href="/">
            Seccion 2
          </a>
        </h3>
        <h2>
          <a
            className="feature-fullimage__title text-white block mt-10 mb-10 title-xs line-h-sm "
            href="/">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </a>
        </h2>
        <p>
          <a
            className="feature-fullimage__author font-thin text-xs uppercase text-white"
            href="/">
            Author
          </a>
        </p>
      </div>
    </div>
  )
}
