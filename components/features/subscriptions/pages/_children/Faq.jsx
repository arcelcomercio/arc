/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import * as React from 'react'
import Markdown from 'react-markdown/with-html'

import { PropertiesSite } from '../../_dependencies/Properties'

const PageFaq = ({ arcSite }) => {
  const { faqs = [] } = PropertiesSite[arcSite]

  return (
    <section className="faq">
      <div className="wrapper">
        <div className="faq__content">
          <h1 className="faq__content-title">Preguntas Frecuentes</h1>

          {faqs.map((faqGroup, i) => (
            <div key={faqGroup.group} className="accordion">
              <input
                id={`toggle${i + 1}`}
                type="checkbox"
                className="accordion-toggle"
                name="toggle"
              />
              <label htmlFor={`toggle${i + 1}`}>
                <Markdown
                  source={faqGroup.group}
                  unwrapDisallowed
                  disallowedTypes={['paragraph']}
                />
              </label>
              <section>
                {(faqGroup.faqs || []).map((faq) => {
                  const question = Array.isArray(faq.q)
                    ? faq.q.join(' \n')
                    : faq.q
                  const answer = Array.isArray(faq.a)
                    ? faq.a.join(' \n')
                    : faq.a
                  return (
                    <div key={question} className="bloque">
                      <h3>
                        <Markdown
                          source={question}
                          unwrapDisallowed
                          disallowedTypes={['paragraph']}
                        />
                      </h3>
                      <Markdown source={answer} />
                    </div>
                  )
                })}
              </section>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PageFaq
