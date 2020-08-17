// prettier-ignore
const passRecomend = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})')
// prettier-ignore
const emailRegex = new RegExp(/^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/)
// prettier-ignore
const strongRegularExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})')
// prettier-ignore
const mediumRegularExp = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})')
// prettier-ignore
const namesRegex = new RegExp(/^([a-zA-ZÑñÁáÉéÍíÓóÚúüÜ\-'\s])+[a-zA-ZZÑñÁáÉéÍíÓóÚúüÜ]+$/)
const numberRegex = new RegExp(/^([0-9])+$/)
const docRegex = new RegExp(/^([0-9a-zA-Z-])+$/)
const phoneRegex = new RegExp(/^[0-9-]+$/)
// prettier-ignore
const patternCard = [/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]
const patternDate = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
const patterCvv = [/\d/, /\d/, /\d/, /\d/]

// const patternDNI = new Array(8).fill(/\d/)
// const patternCEX = new Array(15).fill(/[a-zA-Z0-9-]/)
// const patternCDI = new Array(15).fill(/[a-zA-Z0-9-]/)
// // prettier-ignore
// const patternPHONE = [/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/, " ", /\d/, /\d/,/\d/, " ", /\d/, /\d/,/\d/]

export {
  passRecomend,
  emailRegex,
  strongRegularExp,
  mediumRegularExp,
  namesRegex,
  numberRegex,
  docRegex,
  phoneRegex,
  patternCard,
  patternDate,
  patterCvv,
}
