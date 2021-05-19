const passRecomend = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)
const emailRegex = new RegExp(/^[\w]{1}[\w.-]+@[\w-]{2,}(?:\.[\w-]{2,})+$/)
const strongRegularExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)
const mediumRegularExp = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
)
const namesRegex = new RegExp(/^([a-zñáéíóúü'\s-])+[a-zñáéíóúü]+$/, 'i')
const descripRegex = new RegExp(/^(?!\s)[\wñáéíóúü@,.-\s]+$/, 'i')

// prettier-ignore
const patternCard = [/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]
const patternDate = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
const patterCvv = [/\d/, /\d/, /\d/, /\d/]

const numberRegex = new RegExp(/^([\d])+$/)
const cellphoneRegex = new RegExp(/^9\d{8}$/)
const docRegex = new RegExp(/^([a-zA-Z0-9-])+$/)
const phoneRegex = new RegExp(/^[\d-]+$/)

const maskDocuments = {
  DNI: new Array(8).fill(/\d/),
  CEX: new Array(15).fill(/[a-zA-Z0-9-]/),
  CDI: new Array(15).fill(/[a-zA-Z0-9-]/),
}

const docPatterns = {
  DNI: /(\d){8}/,
  CDI: /^([a-zA-Z0-9-]{5,15})/,
  CEX: /^([a-zA-Z0-9-]{5,15})/,
}

export {
  cellphoneRegex,
  descripRegex,
  docPatterns,
  docRegex,
  emailRegex,
  maskDocuments,
  mediumRegularExp,
  namesRegex,
  numberRegex,
  passRecomend,
  patterCvv,
  patternCard,
  patternDate,
  phoneRegex,
  strongRegularExp,
}
