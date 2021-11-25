// PENDIENTE DE FUNCIONALIDAD
/*
document.addEventListener('DOMContentLoaded', function () {
    var buttonShare = document.getElementById('<<buttonShare>>');
    buttonShare.addEventListener('click', function () {
      var windowTitle = '<<windowTitle>>';
      var windowPath = '<<windowPathname>>';
  
      if (navigator.share) {
        navigator.share({
          title: "".concat(windowTitle),
          url: "".concat(windowPath)
        }).then(function () {
          console.log('corriendo la api nativa');
        })["catch"](function () {
          console.log('ocurrió un error al correr la api nativa');
        });
      } else {
        var activeShareButtons = document.getElementById('<<socialButtons>>');
        activeShareButtons.style.visibility = 'visible';
      }
    });
  });
*/
export const shareNatively = (
  buttonShare: string,
  socialButtons: string,
  wdtitle: string,
  wdpath: string
): string =>
  `"use strict";

  document.addEventListener('DOMContentLoaded', function () {
    var buttonShare = document.getElementById('<<buttonShare>>');
    buttonShare.addEventListener('click', function () {
      var windowTitle = '<<windowTitle>>';
      var windowPath = '<<windowPathname>>';
  
      if (navigator.share) {
        navigator.share({
          title: "".concat(windowTitle),
          url: "".concat(windowPath)
        }).then(function () {
          console.log('corriendo la api nativa');
        })["catch"](function () {
          console.log('ocurrió un error al correr la api nativa');
        });
      } else {
        var activeShareButtons = document.getElementById('<<socialButtons>>');
        activeShareButtons.style.visibility = 'visible';
      }
    });
  });`
    .replace('<<buttonShare>>', buttonShare)
    .replace('<<socialButtons>>', socialButtons)
    .replace('<<windowTitle>>', wdtitle)
    .replace('<<windowPathname>>', wdpath)
