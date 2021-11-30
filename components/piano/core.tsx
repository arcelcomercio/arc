import { PIANO_URL } from 'fusion:environment'
import * as React from 'react'

type PianoCoreProps = {
  aid: string
  disable?: boolean
}

/**
 * @param props
 * @param props.aid Application ID de Piano
 * @param props.disable
 *
 */
const PianoCore: React.FC<PianoCoreProps> = ({ aid, disable = false }) => {
  if (disable) return null

  const pianoScript = `
  tp.push(["init", function() {
    tp.experience.init();
  }]);
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
