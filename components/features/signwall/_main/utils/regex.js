const passRecomend = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)

const emailRegex = new RegExp(
  /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/,
)

const strongRegularExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})',
)

const mediumRegularExp = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
)

const namesRegex = new RegExp(
  /^([a-zA-ZÑñÁáÉéÍíÓóÚúüÜ\-'\s])+[a-zA-ZZÑñÁáÉéÍíÓóÚúüÜ]+$/,
)

const numberRegex = new RegExp(/^([0-9])+$/);

// eslint-disable-next-line no-useless-escape
const docRegex = new RegExp(/^([0-9a-zA-Z-])+$/)

const phoneRegex = new RegExp(/^[0-9-]+$/)

export {
  passRecomend,
  emailRegex,
  strongRegularExp,
  mediumRegularExp,
  namesRegex,
  numberRegex,
  docRegex,
  phoneRegex
}
