/* eslint-disable jsx-a11y/html-has-lang */

import * as React from 'react'

const AmpOutputType = ({ globalContent }) => {
  const bodyData = globalContent.optimizedHtml
  return (
    <>
      <html
        dangerouslySetInnerHTML={{
          __html: bodyData
            .replace('<!doctype html>', '')
            .replace('<!DOCTYPE html>', ''),
        }}
      />
    </>
  )
}

AmpOutputType.fallback = false

AmpOutputType.propTypes = {}

export default AmpOutputType
