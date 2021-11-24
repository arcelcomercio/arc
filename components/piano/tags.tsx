import * as React from 'react'

interface PianoTagsProps {
  tags: string[]
  section: string
  debug?: boolean
}

/**
 *
 * @param param0
 * @returns
 *
 * @see [Content tracking docs](https://docs.piano.io/content-tracking/)
 * @see [DMP document parsing docs](https://docs.piano.io/dmp-document-parsing/)
 */
const PianoTags: React.FC<PianoTagsProps> = ({ debug = false }) => {
  const sandbox = debug
    ? 'tp.push(["setSandbox", true]);tp.push(["setDebug", true]);'
    : ''
  const tags = `tp.push(["setTags", ["sports", "breaking-news", "premium"]]);`
  // const usePianoId = `tp.push(["setUsePianoIdUserProvider", true ]);`

  const pianoTagsScript = `
  tp = window.tp || [];
  ${sandbox}
  ${tags}
  `

  // link
  // zone  tp.push(["setZone", "Web"]);
  // custom variables tp.push(["setCustomVariable", "userState", "Subscriber"]);
  // publish date tp.push(["setContentCreated", "2017-04-03T04:00:00-04:00"]);
  // author tp.push(["setContentAuthor", "Ernest Hemingway"]);
  // section tp.push(["setContentSection", "Literature"]);
  // third party content tp.push(["setContentIsNative", false]);
  // custom params 1 tp.push(["setCustomParam", "name", "value", "scope"]);
  // custom params 2 tp.push(["setCustomParam", "name", "value", "scope"]);
  //

  return <script dangerouslySetInnerHTML={{ __html: pianoTagsScript }} />
}

export default PianoTags
