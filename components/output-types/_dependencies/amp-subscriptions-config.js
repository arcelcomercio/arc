/**
 * Configuración necesaria, [según documentación de ARC](https://elcomercio.arcpublishing.com/alc/arc-products/subscriptions/user-docs/using-the-arc-subscriptions-paywall-with-amp/)
 * @param {object} subsConfig
 * @param {string} subsConfig.origin
 * @param {string} subsConfig.section
 * @param {string} subsConfig.api
 * @param {string} subsConfig.contentCode
 * @param {string} subsConfig.contentType
 */
export default ({ origin, section, api, contentCode, contentType }) => `{
    "services": [
      {
        "type": "iframe",
        "iframeSrc": "${origin}/arc/subs/p.html",
        "iframeVars": [
          "READER_ID",
          "CANONICAL_URL",
          "AMPDOC_URL",
          "SOURCE_URL",
          "DOCUMENT_REFERRER"
        ],
        "actions":{
          "login": "${origin}/signwall/?outputType=subscriptions&signwallHard=1",
          "subscribe": "${origin}/suscripcionesdigitales/?outputType=subscriptions"
        },
        "data": {
          "contentType": "${contentType}",
          "section": "${section ? section.split('/')[1] : ''}",
          "contentRestriction": "${contentCode}",
          "apiOrigin": "${api}",
          "identityApiOrigin": "${api}"
        }
      }
    ],
    "fallbackEntitlement": {
      "source": "fallback",
      "granted": true,
      "grantReason": "METERING"
    }
  }`
