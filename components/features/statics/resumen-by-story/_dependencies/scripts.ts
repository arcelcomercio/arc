/*
  document.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    const $anchor = document.getElementById("anchor")
    $anchor.addEventListener("click", () => {
      window.scrollTo(0,0)
    })
  })})
*/

export const anchorScript = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.getElementById("anchor").addEventListener("click",function(){window.scrollTo(0,0)})})});`

// window.addEventListener("load", () => {
//   const nextMonthPath = "<<nextSectionPath>>";
//   const mainPath = "<<mainPath>>";
//   if (nextMonthPath) {
//     const loadNextPage = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.body.scrollHeight - 5
//       ) {
//         document.querySelector(".st-list__progress").classList.add("active");
//         setTimeout(() => {
//           window.location.href = `${mainPath}${nextMonthPath}/`;
//         }, 250);
//       }
//     };

//     if ("IntersectionObserver" in window) {
//       const sectionOneObserver = new IntersectionObserver(function (entries) {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             window.addEventListener("scroll", loadNextPage);
//             sectionOneObserver.unobserve(entry.target);
//           }
//         });
//       });
//       sectionOneObserver.observe(document.querySelector(".st-list__bar-cont"));
//     } else {
//       window.addEventListener("scroll", loadNextPage);
//     }

//     // Prefetch, se ejecuta cuando se llega a la penultima nota
//     if ("IntersectionObserver" in window) {
//       const sectionOneObserver = new IntersectionObserver(function (entries) {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             window.addPrefetch("prefetch", `${mainPath}${nextMonthPath}/`)
//             sectionOneObserver.unobserve(entry.target);
//           }
//         });
//       });
//       if (document.querySelectorAll(".st") && document.querySelectorAll(".st")[Math.round(document.querySelectorAll(".st").length / 2)]) {
//         sectionOneObserver.observe(document.querySelectorAll(".st")[Math.round(document.querySelectorAll(".st").length / 2)]);
//       }
//     }
//   }
// })

export const loadNextPageScript = (
  nextSectionPath: string,
  mainPath: string
): string =>
  '"use strict";window.addEventListener("load",()=>{{const e=()=>{window.innerHeight+document.documentElement.scrollTop>=document.body.scrollHeight-5&&(document.querySelector(".st-list__progress").classList.add("active"),setTimeout(()=>{window.location.href="<<mainPath>><<nextSectionPath>>/"},250))};if("IntersectionObserver"in window){const t=new IntersectionObserver(function(n){n.forEach(n=>{n.isIntersecting&&(window.addEventListener("scroll",e),t.unobserve(n.target))})});t.observe(document.querySelector(".st-list__bar-cont"))}else window.addEventListener("scroll",e);if("IntersectionObserver"in window){const e=new IntersectionObserver(function(t){t.forEach(t=>{t.isIntersecting&&(window.addPrefetch("prefetch","<<mainPath>><<nextSectionPath>>/"),e.unobserve(t.target))})});document.querySelectorAll(".st")&&document.querySelectorAll(".st")[Math.round(document.querySelectorAll(".st").length/2)]&&e.observe(document.querySelectorAll(".st")[Math.round(document.querySelectorAll(".st").length/2)])}}});'
    .replace(/<<nextSectionPath>>/g, nextSectionPath)
    .replace(/<<mainPath>>/g, mainPath)
