const fetch = require('node-fetch')
const FormData = require('form-data')
const fs = require('fs')

const {
  PB_VERSION: pbVersion,
  ENV: environment,
  ARC_DOMAIN: endpoint,
  BUNDLE_NAME: bundleName,
  USERNAME: username,
  PASSWORD: password,
  TOKEN_ARC: tokenSandbox,
} = process.env

const baseURL = `https://${username}:${password}@${endpoint}/deployments/fusion/`
const newBaseURL = `https://${endpoint}/deployments/fusion/`

console.log('Environment:', environment)
console.log('PageBuilder Version:', pbVersion)
console.log('bundleName', bundleName)

const form = new FormData()
form.append('name', bundleName)
form.append('bundle', fs.createReadStream('bundle.zip'))

const notifySideEffect = (logMessage, slackMessage) => () => {
  logMessage && console.log(logMessage)
  //slackMessage && webhook.send(slackMessage);
}

const deploy = () =>
  fetch(`${newBaseURL}services?bundle=${bundleName}&version=${pbVersion}`, {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${tokenSandbox}`,
    },
  })
    .then((response) => response.json())
    .then(({ event: { id } = {} }) => id)
    // .then(id => {
    //   fetch(`${newBaseURL}deployments/${id}`, {})
    // })
    .catch((err) => {
      console.log('error-->', err.response)
      throw { err, message: 'deploy bundle' }
    })

const handleError = (error, stepName) => {
  console.log('Error encountered during deployment')
  if (error.response) {
    console.log('An Error in the response.')
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.log('An error in the request occurred')
    console.log(error.request)
  } else {
    console.log('An unknown error occured')
    error && console.log(error)
  }

  throw new Error('Errors during deployment', stepName)
}

const headers = form.getHeaders()
headers['Authorization'] = `Bearer ${tokenSandbox}`
console.log(headers)
fetch(`${newBaseURL}bundles`, {
  method: 'post',
  body: form,
  headers,
  maxContentLength: Infinity,
})
  .catch((err) => {
    throw { err, message: 'upload bundle' }
  })
  .then((res) => res.json())
  .then((response) => {
    console.log(response)
  })
  .then(deploy)
  .then((response) => {
    console.log('response deploy-->', response)
  })
  .then(
    notifySideEffect(
      'Notifying Slack channel of promotion.',
      `PageBuilder bundle \`${bundleName}\` has been promoted in the \`${environment}\` environment! :partyparrot: :philosoraptor:`
    )
  )
  .catch((err, message = 'end to process') => {
    handleError(err, message)
  })
