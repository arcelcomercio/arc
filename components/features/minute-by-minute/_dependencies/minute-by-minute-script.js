export default `
function runScorer() {

  var $liveScorerCont = $(".live-mxm");
  var $liveScorer = $(".live-mxm .box-game");
  var playing_time;

  function gameStatus(text) {
      var status = text;
      switch (status) {
          case 'PT':
              status = "1ER TIEMPO";
              break
          case 'ST':
              status = "2DO TIEMPO";
              break
          case 'PTS':
              status = "1ER TIEMPO SUPL.";
              break
          case 'STS':
              status = "2DO TIEMPO SUPL.";
              break
          case 'Final':
              break
          case 'PENALES':
              status = "PENALES";
              break
          case 'ENTRETIEMPO':
              status = "ENTRETIEMPO";
              break
          default:
              break
      }
      status = status.toUpperCase()
      return status;
  }

  function updateTime(time, min) {
      var minute = 0
      min = parseInt(min)
      switch (time) {
          case 'ST':
              minute = min - 45
              break
          case 'PTS':
              minute = min - 90
              break
          case 'STS':
              minute = min - 105
              break
          case 'Final':
              if (min >= 90 && min < 105) minute = min - 45
              else if (min >= 105 && min < 120) minute = min - 90
              else if (min >= 120) minute = min - 105
              break
          case 'PENALES':
              if (min >= 90 && min < 105) minute = min - 45
              else if (min >= 105 && min < 120) minute = min - 90
              else if (min >= 120) minute = min - 105
              break
          default:
              minute = min
              break
      }
      var timerProgressFill = document.getElementById('timer-progress-fill')
      var gameStatusTime = document.getElementById('game-status-time')
      if (window.innerWidth <= 640) updateCircle(13.5)
      else updateCircle(22)
      window.addEventListener('resize', function () {
          if (window.innerWidth <= 640) updateCircle(13.5)
          else updateCircle(22)
      })

      function updateCircle(r) {
          var length = 2 * Math.PI * r
          var nowSec = 3600 - (minute * 60)

          var percentage = (nowSec * 100) / 3600
          var strokeDashoffset = (length * percentage) / 100
          timerProgressFill.style.strokeDashoffset = strokeDashoffset + 'px'
      }
  }



 var instances = getMxmInstances()

      var typeCode;
      var i = 0;

      for (var key in instances) {
          if (key.indexOf("partido") != -1) {
              typeCode = "partido";
          } else {
              typeCode = "evento";
          }
      }

      instances[key].pubsub.on("data", function (data) {
        console.log('DATAAAA->',data)
        console.log('dentroo')
          var item = $liveScorer,
              equipos,
              publicidad,
              itemMatch;
          scorerContent = $liveScorerCont.find(".scorer-content");

          if (typeCode == "partido") {

              equipos = data.match[0];
              publicidad = data.publicidad;

              if (i <= 0) {
                  $liveScorerCont.addClass("mxm-partido");
                  $liveScorerCont.find(".game-team.team1 .team-shield img").attr("src", equipos.bandera_local);
                  $liveScorerCont.find(".game-team.team1 .team-name").text(equipos.local);
                  $liveScorerCont.find(".game-team.team2 .team-name").text(equipos.visitante);
                  $liveScorerCont.find(".game-team.team1 .team-name.mobile").text(equipos.local_corto);
                  $liveScorerCont.find(".game-team.team2 .team-name.mobile").text(equipos.visitante_corto);
                  $liveScorerCont.find(".game-team.team2 .team-shield img").attr("src", equipos.bandera_visitante);

                  $liveScorerCont.find(".game-score .team-goals.team-goals1 .goals").text(equipos.goles_local);
                  $liveScorerCont.find(".game-score .team-goals.team-goals2 .goals").text(equipos.goles_visitante);

                  if (data.time != "" && data.tiempo != "PENALES" && data.tiempo != "ENTRETIEMPO") {
                      $liveScorerCont.find(".game-status-time").text(data.time);
                  } else if (data.tiempo == "ENTRETIEMPO") {
                      $liveScorerCont.find(".game-status-time").text("ET");
                  } else {
                      $liveScorerCont.find(".game-status-time").text("-");
                  }

                  if (data.tiempo == "PENALES" || (data.tiempo == "FINAL" && (equipos.goles_penal_local > 0 || equipos.goles_penal_visitante > 0))) {
                      $liveScorerCont.find(".game-score .team-goals.team-goals1 .penal").text("(" + equipos.goles_penal_local + ")");
                      $liveScorerCont.find(".game-score .team-goals.team-goals2 .penal").text("(" + equipos.goles_penal_visitante + ")");
                      $liveScorerCont.find(".game-score .game-status .timer-progress").hide();
                  } else {
                      $liveScorerCont.find(".game-score .game-status .timer-progress").show();
                  }

                  $liveScorerCont.find(".game-info .playing-time").text(gameStatus(data.tiempo));
                  $liveScorerCont.find(".game-info .game-group").text(data.inf);


                  $liveScorerCont.find(".scorer-sponsor img").attr("src", publicidad.img_publ_675x97);

                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_320").attr("srcset", publicidad.img_publ_320x52);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_637").attr("srcset", publicidad.img_publ_637x70);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_493").attr("srcset", publicidad.img_publ_493x97);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_675").attr("srcset", publicidad.img_publ_675x97);

                  $(window).resize(function () {
                      scorerContent.removeAttr("style");
                      if (window.innerWidth <= 640) {
                          if (publicidad.background_320x52 != "") {
                              scorerContent.css("background-image", "url(" + publicidad.background_320x52 + ")");
                          }
                      } else if (window.innerWidth <= 1023) {
                          if (publicidad.background_637x70 != "") {
                              scorerContent.css("background-image", "url(" + publicidad.background_637x70 + ")");
                          }
                      } else if (window.innerWidth <= 1359) {
                          if (publicidad.background_493x97 != "") {
                              scorerContent.css("background-image", "url(" + publicidad.background_493x97 + ")");
                          }
                      } else {
                          if (publicidad.background_675x97 != "") {
                              scorerContent.css("background-image", "url(" + publicidad.background_675x97 + ")");
                          }
                      }
                  }).resize();
              } else {
                  $liveScorerCont.find(".game-info .playing-time").text(gameStatus(data.tiempo));

                  if (data.time != "" && data.tiempo != "PENALES" && data.tiempo != "ENTRETIEMPO") {
                      $liveScorerCont.find(".game-status-time").text(data.time);
                  } else if (data.tiempo == "ENTRETIEMPO") {
                      $liveScorerCont.find(".game-status-time").text("ET");
                  } else {
                      $liveScorerCont.find(".game-status-time").text("-");
                  }

                  $liveScorerCont.find(".game-score .team-goals.team-goals1 .goals").text(equipos.goles_local);
                  $liveScorerCont.find(".game-score .team-goals.team-goals2 .goals").text(equipos.goles_visitante);

                  if (data.tiempo == "PENALES" || (data.tiempo == "FINAL" && (equipos.goles_penal_local > 0 || equipos.goles_penal_visitante > 0))) {
                      $liveScorerCont.find(".game-score .team-goals.team-goals1 .penal").text("(" + equipos.goles_penal_local + ")");
                      $liveScorerCont.find(".game-score .team-goals.team-goals2 .penal").text("(" + equipos.goles_penal_visitante + ")");
                      $liveScorerCont.find(".game-score .game-status .timer-progress").hide();
                  } else {
                      $liveScorerCont.find(".game-score .game-status .timer-progress").show();
                  }
              }
              updateTime(data.tiempo, data.time);
          } else {
              publicidad = data.publicidad;
              $liveScorerCont.addClass("mxm-eventos");
              $liveScorerCont.find(".event-info a").attr("href", data.url);
              $liveScorerCont.find(".desc a").attr("href", data.url);
              if (i <= 0) {

                  $liveScorerCont.find(".scorer-sponsor img").attr("src", publicidad.img_publ_675x97);

                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_320").attr("srcset", publicidad.img_publ_320x52);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_493").attr("srcset", publicidad.img_publ_493x97);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_637").attr("srcset", publicidad.img_publ_637x70);
                  $liveScorerCont.find(".scorer-sponsor picture source.srcset_675").attr("srcset", publicidad.img_publ_675x97);



                  $(window).resize(function () {
                      $liveScorerCont.removeAttr("style");
                      if (window.innerWidth <= 640) {
                          if (publicidad.background_320x162 && publicidad.background_320x162 != "" && publicidad.background_320x162 !== "null" && publicidad.background_320x162 !== "undefined") {
                              $liveScorerCont.css("background-image", "url(" + publicidad.background_320x162 + ")");


                          }
                          if (!$liveScorerCont.find(".scorer-sponsor picture source.srcset_320").attr("srcset")) {
                              $liveScorerCont.find(".event-content").addClass("movil-without-ads");
                          }
                      } else if (window.innerWidth <= 1023) {
                          if (publicidad.background_513x256 && publicidad.background_513x256 != "" && publicidad.background_513x256 !== "null" && publicidad.background_513x256 !== "undefined") {
                              $liveScorerCont.css("background-image", "url(" + publicidad.background_513x256 + ")");
                          }
                      } else if (window.innerWidth <= 1359) {
                          if (publicidad.background_715x256 && publicidad.background_715x256 != "" && publicidad.background_715x256 !== "null" && publicidad.background_715x256 !== "undefined") {
                              $liveScorerCont.css("background-image", "url(" + publicidad.background_715x256 + ")");
                          }
                      } else {
                          if (publicidad.background_768x494 && publicidad.background_768x494 != "" && publicidad.background_768x494 !== "null" && publicidad.background_768x494 !== "undefined") {
                              $liveScorerCont.css("background-image", "url(" + publicidad.background_768x494 + ")");
                          }
                      }
                  }).resize();
              }


          }
          i = i + 1;
      });
  


}

window.on_mxm_loaded = function (instances) {
  window.getMxmInstances = function(){
     return  instances
  }
}

function waitjQueryAndMxm() {
  if (window.jQuery) {
      if(document.querySelector('.mxm-input')){
          runScorer()
          return true
      }
    setTimeout(waitjQueryAndMxm, 1000)
  }
  setTimeout(waitjQueryAndMxm, 100)
}

waitjQueryAndMxm();

`
