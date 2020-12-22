/*
  document.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    const $anchor = document.getElementById("anchor")
    $anchor.addEventListener("click", () => {
      window.scrollTo(0,0)
    })
  })})
*/

export const anchorScript = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.getElementById("anchor").addEventListener("click",function(){window.scrollTo(0,0)})})});`

/* window.addEventListener("load", () => {
  const currentDate = "<<currentDate>>";
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "setiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const nextMonth = monthNames.findIndex((mo) => mo === currentDate) + 1;
  if (nextMonth > 0 && nextMonth < 12) {
    const loadNextPage = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.body.scrollHeight - 5
      ) {
        document.querySelector(".st-list__progress").classList.add("active");
        setTimeout(() => {
          window.location.href = `/resumen-2020/${monthNames[nextMonth]}/`;
        }, 250);
      }
    };

    if ("IntersectionObserver" in window) {
      const sectionOneObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", loadNextPage);
            sectionOneObserver.unobserve(entry.target);
          }
        });
      });
      sectionOneObserver.observe(document.querySelector(".st-list__bar-cont"));
    } else {
      window.addEventListener("scroll", loadNextPage);
    }

    // Prefetch, se ejecuta cuando se llega a la penultima nota
    if ("IntersectionObserver" in window) {
      const sectionOneObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addPrefetch("prefetch", `/resumen-2020/${monthNames[nextMonth]}/`)
            sectionOneObserver.unobserve(entry.target);
          }
        });
      });
      if (document.querySelectorAll(".st")[document.querySelectorAll(".st").length - 2]) {
        sectionOneObserver.observe(document.querySelectorAll(".st")[document.querySelectorAll(".st").length - 2]);
      }
    }
  }
}) */

export const loadNextPageScript = month =>
  '"use strict";window.addEventListener("load",function(){var e=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","setiembre","octubre","noviembre","diciembre"],t=e.findIndex(function(e){return"<<currentDate>>"===e})+1;if(t>0&&t<12){var n=function(){window.innerHeight+document.documentElement.scrollTop>=document.body.scrollHeight-5&&(document.querySelector(".st-list__progress").classList.add("active"),setTimeout(function(){window.location.href="/resumen-2020/".concat(e[t],"/")},250))};if("IntersectionObserver"in window){var r=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(window.addEventListener("scroll",n),r.unobserve(e.target))})});r.observe(document.querySelector(".st-list__bar-cont"))}else window.addEventListener("scroll",n);if("IntersectionObserver"in window){var o=new IntersectionObserver(function(n){n.forEach(function(n){n.isIntersecting&&(window.addPrefetch("prefetch","/resumen-2020/".concat(e[t],"/")),o.unobserve(n.target))})});document.querySelectorAll(".st")[document.querySelectorAll(".st").length-2]&&o.observe(document.querySelectorAll(".st")[document.querySelectorAll(".st").length-2])}}});'.replace(
    /<<currentDate>>/g,
    month
  )
