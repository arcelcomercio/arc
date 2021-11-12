import { PIANO_URL } from 'fusion:environment'
import * as React from 'react'

type PianoCoreProps = {
  aid: string
}

/**
 * @param props
 * @param props.aid Application ID de Piano
 */
const PianoCore = ({ aid }: PianoCoreProps): JSX.Element => {
  const pianoScript = `
  (function(src) {
    var a = document.createElement("script");
    a.async = true;
    a.src = src;
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
  })("${PIANO_URL}?aid=${aid}");`

  // window.tp.experience.execute();

  return <script dangerouslySetInnerHTML={{ __html: pianoScript }} />
}

export default PianoCore
