const fetch = require('node-fetch')

const {
  PB_VERSION: pbVersion,
  RETRIES: retries,
  TOKEN_SANDBOX: tokenSandbox,
} = process.env

const urls = [
  'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/subscriptions.js?d=',
  'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/default.js?d=',
  'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/lite.js?d=',
  'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/subscriptions.js?d=',
  'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/default.js?d=',
  'https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/pf/dist/components/combinations/lite.js?d=',
]

console.log('PageBuilder Version:', pbVersion)
console.log('tokenSandbox', tokenSandbox)

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const verifyAssetVersion = async () => {
  await timeout(60000)
  console.log('invoke api to get version number')
  const response = await fetch(
    `https://api.sandbox.elcomercio.arcpublishing.com/deployments/fusion/services`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${tokenSandbox}`,
      },
    }
  )
  const data = await response.json()
  console.log('response', data)

  const lambdasList = data['lambdas']

  if (!lambdasList) {
    throw 'error to get lambdas'
  }
  const lambdaDetail = lambdasList.find((item) => !item.Aliases)

  return lambdaDetail['Version']
}

const headService = async (url) => {
  const response = await fetch(url)
  console.log(url, response.status)
  return { status: response.status }
}

const assets = async () => {
  let failed = 0,
    requestPromise = [],
    version
  /** Retries to get version */
  for (const iterator of new Array(retries)) {
    version = await verifyAssetVersion()
    if (version) break
  }

  if (!version) throw 'error to get version'
  console.log('version', version)

  try {
    urls.forEach((item) => {
      requestPromise.push(headService(`${item}${version}`))
    })

    const result = await Promise.all(requestPromise)
    result.forEach((element) => {
      if (element.status !== 200) ++failed
    })

    if (failed > 0) throw 'have erros in process from urls'
  } catch (error) {
    console.log('error', error)
    throw new Error(error)
  }
}

assets()
