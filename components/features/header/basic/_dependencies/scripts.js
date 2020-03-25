/* document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("h-basic_search-btn")
  button.addEventListener("click", () => {
    const input = document.getElementById("h-basic_search-input")
    const svgPath = document.getElementById("h-basic_search-path")
    if (input.value) {
      const newQuery = encodeURIComponent(input.value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
    else if (input.style.width === "150px")  {
      input.style = ""
      button.style = ""
      svgPath.style = ""
    } else {
      input.style = "width:150px;padding: 5px 8px;"
      button.style = "background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;"
      svgPath.style = "fill: #575757;"
    }
  })
}) */
// eslint-disable-next-line import/prefer-default-export
export const searchScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("h-basic_search-btn");e.addEventListener("click",function(){var t=document.getElementById("h-basic_search-input"),n=document.getElementById("h-basic_search-path");if(t.value){var d=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(d,"/todas/descendiente/?query=").concat(d)}else"150px"===t.style.width?(t.style="",e.style="",n.style=""):(t.style="width:150px;padding: 5px 8px;",e.style="background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;",n.style="fill: #575757;")})});'
