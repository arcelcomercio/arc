/*
  const jwplayerObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      target.classList.remove("jwplayer-lazy")

      if (window.powaBoot) {
      observer.unobserve(target)
    }
  }
  })
}

window.addEventListener("load", () => {
  requestIdle(()=> {
    if ('IntersectionObserver' in window) {
      const options = {
        rootMargin: '0px',
      }
      const videos = Array.from(document.body.querySelectorAll('.jwplayer-lazy'))
      const observer = new IntersectionObserver(jwplayerObserver, options)
      videos.forEach(video => {
          observer.observe(video)
          
      })
    }
  })
})
*/
const videoScript = `
"use strict";

var jwplayerObserver = function jwplayerObserver(entries, observer) {
  entries.forEach(function (entry) {
    var isIntersecting = entry.isIntersecting,
      target = entry.target;

    if (isIntersecting) {
      const nameId = target.getAttribute("id");
      const [name,mediaId] = nameId.split('-');
      jwplayer(nameId).setup({ 
        "playlist": "https://cdn.jwplayer.com/v2/media/" +mediaId
      })
      observer.unobserve(target);
    }
  });
};

window.addEventListener("load", function () {
  requestIdle(function () {
    if ("IntersectionObserver" in window) {
      var options = {
        rootMargin: "0px"
      };
      var videos = Array.from(document.body.querySelectorAll(".jwplayer-lazy"));
      var observer = new IntersectionObserver(jwplayerObserver, options);
      videos.forEach(function (video) {
        observer.observe(video);
      });
    }
  });
});
`

export default videoScript
