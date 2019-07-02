const passRecomend = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)

const emailRegex = new RegExp(
  // /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
  /^[a-zA-Z0-9][a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

const strongRegularExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)

const mediumRegularExp = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
)

const namesRegex = new RegExp(
  /^[^0-9 ]{1}([a-zA-ZÑñÁáÉéÍíÓóÚúüÜ\-'\s])+[a-zA-ZZÑñÁáÉéÍíÓóÚúüÜ]+$/
)

const numberRegex = new RegExp(/^([0-9])+$/)

// eslint-disable-next-line no-useless-escape
const docRegex = new RegExp(/^([0-9a-zA-Z.\-])+$/)

export {
  passRecomend,
  emailRegex,
  strongRegularExp,
  mediumRegularExp,
  namesRegex,
  numberRegex,
  docRegex,
}
