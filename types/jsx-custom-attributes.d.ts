declare namespace JSX {
  interface AmpImg {
    alt?: string
    src?: string
    width?: string | number
    height?: string | number
    layout?: string
    class?: string
  }
  interface AmpAd {
    json?: string
    type?: string
    width?: string | number
    height?: string | number
    layout?: string
    class?: string
  }
  interface AmpStickyAd {
    layout?: string
    class?: string
    dangerouslySetInnerHTML: any
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-ad': AmpAd
    'amp-sticky-ad': AmpStickyAd
  }
}
