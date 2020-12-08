/* 
    window.addEventListener("load", () => {
      requestIdle(function() {
        const showMore = document.getElementById('toggle_showmore')
        if(showMore){
          showMore.addEventListener('click', () => {
            const classContent = document.getElementsByClassName("st-foot__content")[0]
            const classLabel = document.getElementsByClassName("st-foot__showmore")[0]
            if(classContent && classLabel) {
              if (showMore.checked){
                classContent.style.display="inherit"
                classLabel.style.margin="auto"
                classLabel.style.marginRight ="30px"
                classLabel.style.marginTop ="-25px"
                classLabel.style.position = "inherit"
              }else{
                classContent.style.display="none"
                classLabel.style.margin="inherit"
                classLabel.style.marginRight ="15px"
                classLabel.style.marginTop ="-10px"
                classLabel.style.position = "absolute"
              }
            }
          })
        }
      })
    })
 */

// eslint-disable-next-line import/prefer-default-export
export const toggleFooterInfo = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("toggle_showmore");e&&e.addEventListener("click",function(){var t=document.getElementsByClassName("st-foot__content")[0],n=document.getElementsByClassName("st-foot__showmore")[0];t&&n&&(e.checked?(t.style.display="inherit",n.style.margin="auto",n.style.marginRight="30px",n.style.marginTop="-25px",n.style.position="inherit"):(t.style.display="none",n.style.margin="inherit",n.style.marginRight="15px",n.style.marginTop="-10px",n.style.position="absolute"))})})});`
