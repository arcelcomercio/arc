import templayed from 'templayed'

/* eslint-disable no-template-curly-in-string */
// prettier-ignore
export default {
  strings: {
    // General
    currencySymbol: `S/`,

    // Errors
    minLength: `Longitud inválida, mínimo {{min}} caracteres.`,
    maxLength: `Longitud inválida, máximo {{max}} caracteres.`,
    lengthNotBetween: `Longitud inválida, entre {{min}} y {{max}} caracteres`,
    lengthNotExactly: `Longitud inválida, requiere {{len}} dígitos`,
    requiredField: `Este campo es requerido`,
    wrongFormat: `Formato inválido`,
    wrongEmail: `Correo inválido`,
    wrongCardNumber: `Número tarjeta inválido`,
    wrongCvv: `CVV Inválido`,
    wrongDate: `Fecha incorrecta`,
    checkRequired: `Debe seleccionar el check`,
    tryLater: `Ha ocurrido un error. Inténtelo más tarde`,

    // Summary
    planPrice: `Precio del plan`,
    subscriptorDiscount: `Descuento de suscriptor`,
    subscriptionDetail: `DETALLE DE LA SUSCRIPCIÓN`,

    // Plans
    subscribe: `SUSCRIBIRME`,
    offerHeadBand: `¡APROVECHA NUESTAS PROMOCIONES DE LANZAMIENTO!`,
    freeAmount: `Gratis`,
    initialOffer: `durante 6 meses`,
    regularOffer: `Luego, S/ 10 cada mes.`,
    monthlyFrequency: `Suscripción Mensual`,
    yearlyFrequency: `Suscripción Anual`,
    monthlyPeriod: `al mes`,
    yearlyPeriod: `al año`,
    insertDocument: `Ingresa tu Documento`,
    welcomePrintedSubscriptor: 
     `ACCEDE A ESTOS **PRECIOS ESPECIALES** POR SER SUSCRIPTOR
      IMPRESO`,
    idCheckingDescription: 
     `Valida tu N° de documento y  
      **aprovecha la promoción** que tenemos para ti:`,
    featureDescription1: 
     `Beneficio especial para  
      suscriptores del diario impreso`,
    businessSubscriptionsBanner1: `¿ERES EMPRESA? CONSULTA NUESTRAS`,
    businessSubscriptionsBanner2: `SUSCRIPCIONES CORPORATIVAS`,
    printedSubscriptorBanner1: `¿ERES SUSCRIPTOR DEL DIARIO IMPRESO EL COMERCIO?`,
    printedSubscriptorBanner2: `ADQUIERE EL PLAN DIGITAL GRATIS POR 6 MESES.`,
    
    // Profile
    insertPersonalInfo: `Ingrese sus datos`,

    // Payment
    securityText: `Compra seguro. Esta web está protegida`,
    chooseCreditCard: `Selecciona un tipo de tarjeta`,
    paymentNotice: 
     `El precio de la suscripción se cargará automáticamente en tu
      tarjeta cada mes o año, según el período elegido.`,
    acceptAgreement: 
     `Acepto las [condiciones de servicio]({{terms_url}}), 
      las [políticas de privacidad]({{privacy_url}}), 
      y estoy de acuerdo con la información.`,
    

    // Confirmation
    welcomeNewSubscriptor: `¡Bienvenido(a) {{firstName}}!`,
    successfulSubscription: `Tu suscripción ha sido exitosa.` ,
    purchaseDetails: `DETALLE DE COMPRA`,
    subscriptionNotice: 
     `Enviaremos la boleta de compra de la  
      suscripción al correo: **{{email}}**`,
    continueButton: `SIGUE NAVEGANDO`,

    // Support
    supportTitle: `Soporte`,
    supportSubtitle: `Si tienes dudas o consultas, llámanos o envíanos un correo`,
    supportContent: 
    `**Central Telefónica:**  
    (+51) 311 5100  
    <br/>
    **Horario de atención:**  
    De lunes a viernes: 7 am - 2 pm  
    Sábados, domingos y feriados: de 7am - 1pm  
    <br/>
    **Correos:** 
    -Servicio al cliente y Ventas:  
     suscriptores@comercio.com.pe  
    -Pagos pendientes y Facturación:  
     cobranzas@suscripcionesintegrales.com.pe`,

    // Contact 
    corporateSubscriptionsTitle: 
     `Por favor envíanos tus datos para brindarte información sobre
      nuestras suscripciones corporativas.`,
    subscriptionTypeDescription: `Tipo de consulta de suscripción`,
    subscriptionType1: `Quiero una suscripción`,
    subscriptionType2: `Tengo una suscripción`,
    subscriptionType3: `Otros`,
    messageSendNotifacion: `Tu mensaje ha sido enviado, nos pondremos en contacto con usted.`,
    returnTo: `Volver a gestión`,
    thanks: `Gracias`,

    // Forms
    emailLabel: `Correo Electrónico`,
    nameLabel: `Nombre`,
    namesLabel: `Nombres`,
    lastNamesLabel: `Apellidos`,
    lastNameLabel: `Apellido Paterno`,
    secondLastNameLabel: `Apellido Materno`,
    orgLabel: `Organización`,
    priceLabel: `Precio`,
    subscriptionTypeLabel: `Tipo de subscripción`,
    cellPhoneLabel: `Número de Celular`,
    descriptionLabel: `Descripción`,
    documentNumberLabel: `Número de documento`,
    cardNumberlabel: `Número de tarjeta`,
    planLabel: `PAQUETE`,
    totalLabel: `TOTAL`,
    sendButton: `Enviar`,
    nextButton: `Continuar`,
    payButton: `Pagar`,

    // Footer
    contactUs: `Contáctanos al`,
    contactPhoneNumber: `01 311-5100`,
    contactEmail: `suscripciones@comercio.com.pe`,
    footerAd: `Paquetes que incluyen diario impreso, disponibles sólo para Lima y Callao`,
    supportLink: `Soporte`,
    privacyPolicyLink: `Políticas de privacidad`,
    faqsLink: `Preguntas frecuentes`,
    disclaimerLink: `Libro de reclamaciones`,
    termsLink: `Términos y Condiciones`,
    appDownloads: `Descarga nuestra app`,

    // Utilities
    interpolate: (tmpl, vars) => templayed(tmpl)(vars)
  },
}
