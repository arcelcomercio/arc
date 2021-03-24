/* eslint-disable camelcase */
import React from 'react'

export default function StoryContentsChildParallaxElements({ config, id }) {
  const { block, data } = config || {}
  return (
    <>
      {block === 'image' ? (
        <div style={{ padding: '64px 0' }}>
          <div id={id} className="parallax-image">
            <h3>{data?.title}</h3>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `[id="${id}"]{background-image:url("${data?.url_mobile}")}@media screen and (min-width:640px){[id="${id}"]{background-image:url("${data?.url}")}}`,
            }}></style>
        </div>
      ) : null}
    </>
  )
}
