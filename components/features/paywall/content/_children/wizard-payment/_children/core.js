import getDomain from '../../../../_dependencies/domains'

/* eslint-disable import/prefer-default-export */
export default function corePayment(profile, order, plan){
    const {
      firstName,
      lastName,
      secondLastName,
      documentNumber,
      documentType,
      phone,
      email,
      printed
    } = profile
    const { orderNumber } = order
  const {
    sku,
    priceCode,
    amount
  } = plan

    return {
        apiPaymentRegister(cardMethod, token){
            const headers = new window.Headers({
                'Content-Type': 'application/json',
                Authorization: 'Token deb904a03a4e31d420a014534514b8cc8ca4d111',
                'user-token': window.Identity.userIdentity.accessToken,
              })
              return fetch(`${getDomain('ORIGIN_SUSCRIPCIONES')}/api/payment/register-pending/`, {
                method: 'POST',
                body: JSON.stringify({
                  order: orderNumber,
                  total: amount,
                  printed,
                  profile: {
                    name: firstName,
                    lastname: lastName,
                    lastname_mother: secondLastName,
                    doc_type: documentType,
                    doc_number: documentNumber,
                    email,
                    phone,
                  },
                  card: {
                    method: cardMethod.toUpperCase(),
                    token,
                  },
                  product: [
                    {
                      sku,
                      price_code: priceCode,
                      amount,
                    },
                  ],
                }),
                headers,
              }).then(() => token)
        }
    }
}


