import * as React from 'react'

const TriviasMainResult = ({ triviaImage, title }) => {
  return (
    <amp-story-page id="page-results">
      <amp-story-grid-layer template="fill">
        <amp-img layout="fixed" width="1600" height="1200" src={triviaImage} />
      </amp-story-grid-layer>
      <amp-story-grid-layer template="horizontal">
        <div animate-in="scale-fade-up">
          <amp-story-interactive-results
            style={{ 'font-size': '17px' }}
            id="results-1"
            theme="dark"
            prompt-text={title}
            option-1-results-category="Fan"
            option-1-text="Bien"
            option-1-results-threshold="0"
            option-2-results-category="Expert"
            option-2-text="ssss!"
            option-2-results-threshold="80"></amp-story-interactive-results>
        </div>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="horizontal">
        <div>sdsad</div>
      </amp-story-grid-layer>
    </amp-story-page>
  )
}

export default TriviasMainResult
