window.PoWaSettings = window.PoWaSettings || {}
window.PoWaSettings.advertising = {
  adBar: false,
  adTag: window.urlPreroll,
}
window.PoWaSettings.promo = {
  style: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    // inline style can be applied to child elements by specifying the class or id of the child
    '.powa-shot': {
      position: "absolute",
      zIndex: 1
    },
    '.powa-shot-image': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    '.powa-shot-play-btn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fill: '#EEE',
      opacity: 0.85,
      borderRadius: "50%",
      boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.25)",
      transition: "all 0.25s"
    }
  },
  template: function powaShotTemplate () {
    const template = `
        <div class="powa-shot-image powa-shot-click powa-shot-click-play">
          <div class="powa-shot-play-btn powa-shot-hover powa-shot-click powa-shot-click-play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 46 46">
              <path d="M23 0C10.3 0 0 10.3 0 23 0 35.7 10.3 46 23 46 35.7 46 46 35.7 46 23 46 10.3 35.7 0 23 0ZM31.1 24L19.9 31.6C19.5 31.9 19 31.9 18.6 31.7 18.2 31.5 18 31.1 18 30.6L18 15.4C18 14.9 18.2 14.5 18.6 14.3 19 14.1 19.5 14.1 19.9 14.4L31.1 22C31.4 22.2 31.6 22.6 31.6 23 31.6 23.4 31.4 23.8 31.1 24ZM31.1 24" />
            </svg>
          </div>
        </div>`;
    return template.trim();
  }
}