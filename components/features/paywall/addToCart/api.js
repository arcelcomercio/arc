/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */

export default class Services {
  apiGetCampaign(origin, campaign) {
    const response = new Promise(resolve => {
      fetch(`${origin}/retail/public/v1/offer/preview/${campaign}`).then(
        res => {
          return resolve(res.json())
        }
      )
    })
    return response
  }

  apiGenerateCardToken(parameter3) {
    var loadJSONP = (function() {
      var unique = 0
      return function(url, callback, context) {
        // INIT
        // eslint-disable-next-line prefer-template
        var name = '_jsonp_' + unique++
        // eslint-disable-next-line prefer-template
        if (url.match(/\?/)) url += '&callback=' + name
        // eslint-disable-next-line prefer-template
        else url += '?callback=' + name

        // Create script
        // eslint-disable-next-line vars-on-top
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url

        // Setup handler
        window[name] = function(data) {
          callback.call(context || window, data)
          document.getElementsByTagName('head')[0].removeChild(script)
          script = null
          delete window[name]
        }

        // Load JSON
        document.getElementsByTagName('head')[0].appendChild(script)
      }
    })()

    return loadJSONP(
      `https://sandbox.api.payulatam.com/payments-api/4.0/service.token?public_key=PKaC6H4cEDJD919n705L544kSU&account_id=512323&list_id=mylistID&_card%5Bnumber%5D=4437030140190994&_card%5Bexp_month%5D=10&_card%5Bexp_year%5D=2021&_card%5Bdocument%5D=44000001&_card%5Bpayer_id%5D=10&_card%5Bname_card%5D=jorge+duenas&_card%5Bcvc%5D=123&_card%5Bmethod%5D=VISA&_=${ Date.now()}`,
      data => {
        window.alert(data.token)
        console.log(data)
        return data
      }
    )
  }

  apiPaymentRegister(local) {
    const response = new Promise(resolve => {
      fetch(`${local}/api/payment/register-pending/`, {
        method: 'POST',
        body: JSON.stringify({
          order: 'Z3FP027ZDD55CZSV',
          total: 20,
          profile: {
            name: 'Joaquin',
            lastname: 'Tarazona',
            lastname_mother: 'Local',
            doc_type: 'DNI',
            doc_number: '44000001',
            email: 'test.mpp.prod.3@sharklasers.com',
            phone: '987654321',
          },
          card: {
            method: 'VISA',
            number: '443703******0994',
            token: '829a9c3c-edbe-4d12-b10d-2924c8f5216d',
          },
          product: [
            {
              campaignCode: 'campaignsandbox',
              sku: 'digitalsanbox',
              price_code: 'WAANFR',
              amount: 20,
            },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          Authorization: '3150babb4e158cd6ec7e15808cb6a4994cdc3cdf',
          'user-token': '[TOKEN_USER]',
        },
      }).then(res => {
        return resolve(res.json())
      })
    })
    return response
  }
}
