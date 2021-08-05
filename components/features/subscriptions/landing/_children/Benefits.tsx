import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { SubsArcSite } from 'types/subscriptions'

import { PropertiesSite } from '../../_dependencies/Properties'

type BenefitsLandingProps = {
  arcSite: ArcSite
}

const BenefitsLanding: React.FC<BenefitsLandingProps> = ({ arcSite }) => {
  const { benefits = [] } = PropertiesSite[arcSite as SubsArcSite]

  return (
    <section className="beneficios" id="beneficios">
      <div className="wrapper">
        <div className="beneficios__content">
          <h1 className="beneficios__content-title">
            Beneficios
            <div className="beneficios__content-logo" />
          </h1>
          <div className="beneficios__content-wrap">
            <div className="tabs">
              {benefits.map((item, i) => (
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
                    <div className="picture-mobile">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${item.image}.webp`}
                        />
                        <img
                          src={`${item.image}.png`}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </div>
                    <h2 className="title-mobile">{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="beneficios__content-slides">
            {benefits.map((item, i) => (
              <picture key={`image-${i + 1}`}>
                <source type="image/webp" srcSet={`${item.image}.webp`} />
                <img
                  id={`picture--tab--${i + 1}`}
                  className={`picture ${i + 1 === 1 ? 'move' : ''}`}
                  src={`${item.image}.png`}
                  alt={item.title}
                  decoding="async"
                />
              </picture>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsLanding
