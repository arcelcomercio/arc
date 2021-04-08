import * as React from 'react'

import { PropertiesSite } from '../../_dependencies/Properties'

const Benefits = ({ arcSite }) => {
  const { benefits = [] } = PropertiesSite[arcSite]

  return (
    <section className="beneficios" id="beneficios">
      <div className="wrapper">
        <div className="beneficios__content">
          <h1 className="beneficios__content-title">
            Beneficios
            <div className="beneficios__content-logo"></div>
          </h1>
          <div className="beneficios__content-wrap">
            <div className="tabs">
              {benefits.map((item, i) => {
                return (
                  <div key={`benfist-${i + 1}`}>
                    <input
                      type="radio"
                      name="tabs"
                      defaultChecked={i + 1 === 1}
                      className="tab"
                      id={`tab--${i + 1}`}
                      onChange={() => {}}
                    />
                    <label
                      className="button"
                      htmlFor={`tab--${i + 1}`}
                      id={`button--${i + 1}`}>
                      {item.title}
                    </label>
                    <div className="display" id={`display--${i + 1}`}>
                      <picture className="picture-mobile">
                        <source
                          type="image/webp"
                          srcSet={`${item.image}.webp`}
                        />
                        <img
                          type="image/png"
                          src={`${item.image}.png`}
                          alt={item.title}
                          loading="lazy"
                          importance="low"
                          decoding="async"
                        />
                      </picture>
                      <h2 className="title-mobile">{item.title}</h2>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="beneficios__content-slides">
            {benefits.map((item, i) => {
              return (
                <picture key={`image-${i + 1}`}>
                  <source type="image/webp" srcSet={`${item.image}.webp`} />
                  <img
                    id={`picture--tab--${i + 1}`}
                    className="picture"
                    type="image/png"
                    src={`${item.image}.png`}
                    alt={item.title}
                    loading="lazy"
                    importance="low"
                    decoding="async"
                  />
                </picture>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
