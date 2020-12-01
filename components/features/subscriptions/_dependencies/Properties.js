import ENV from 'fusion:environment'

const ArcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
const IsPROD = ArcEnv === 'prod'

const cdnStaticEc = 'https://cdna.elcomercio.pe/resources/dist/elcomercio'
const cdnStaticGe = 'https://cdna.gestion.pe/resources/dist/gestion'

const PropertiesSite = {
  elcomercio: {
    // prettier-ignore
    urls: {
      mainHome:     `https://${IsPROD ? 'elcomercio.pe' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com'}/?ref=paywall`,
      homeUrl:      `https://${IsPROD ? 'elcomercio.pe/suscripciones/?ref=paywall' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/suscripciones/?outputType=subscriptions'}`,
      landingUrl:   `https://${IsPROD ? 'elcomercio.pe/suscripcionesdigitales/?ref=paywall' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/suscripcionesdigitales/?outputType=subscriptions'}`,
      facebook:     'https://www.facebook.com/elcomercio.pe',
      twitter:      'https://twitter.com/elcomercio_peru',
      instangram:   'https://www.instagram.com/elcomercio/',
      terminos:     'https://suscripciones.elcomercio.pe/terminos/',
      politicas:    'https://elcomercio.pe/politicas-privacidad/',
      terminosSign: 'https://ecoid.pe/terminos_y_condiciones/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      politicasSign:'https://ecoid.pe/politica_privacidad/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      reclamos:     'http://ecomedia.pe/libro/registrar/elcomercio/',
      appStore:     'https://apps.apple.com/es/app/el-comercio-peru/id793178800?ct=email_footer',
      googlePlay:   'https://play.google.com/store/apps/details?id=com.gec.elcomercio&referrer=email_footer',
      subsPrint:    'https://suscripciones.elcomercio.pe/?ref=Boton_suscrip_imp',
      clickHelp:    'https://pe-eca.grupodigitex.com/C2C_Comercio/Ventas/Ventas.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada',
      arcOrigin:    `https://api${IsPROD ? '' : '-sandbox'}.elcomercio.pe`,
      codeCxense:   `${IsPROD ? '8msiqbaswc5u' : '8n3ltuopvlh1'}` 
    },

    emails: {
      atencion: 'atencionalcliente@comercio.com.pe',
      cobranzas: 'cobranzas@suscripcionesintegrales.com.pe',
    },

    // prettier-ignore
    texts: {
      mainTop:            '#QuédateEnCasa',
      parrafOne:          'Y accede sin límites desde la comodidad de tu casa a información exclusiva:',
      parrafTwo:          'reportajes, informes y la mejor selección de noticias e historias elaboradas por El Comercio.',
      help:               '¿Necesitas ayuda?',
      offer:              '¡Recomendado!',
      bannerTitle:        'Suscripciones impresas',
      bannerText:         'Recibe la mejor información todos los días en la puerta de tu casa.',
      bannerButton:       'Conocer más',
      footerEnd:          'Paquetes que incluyen diario impreso, disponibles sólo para Lima y Callao',
      bannerNew:          '¡Nuevo!',
      uniTitle:           'Plan Universitario',
      uniDescription:     'Información veraz y de calidad para tu carrera',
      corporativeTitle:   '¿Deseas mantener a tu empresa informada?',
      corporativeDescrip: 'Consulta las opciones corporativas que tenemos para tu compañía',
      helpTitle:          '¿Necesitas ayuda o tienes dudas?',
      helpSubstitle:      'Comunícate con nosotros',
      helpDescription:    'Consulta nuestra sección de',
      videoTitle:         'Periodismo independiente y veraz, todos los días',
      videoSubtitle:      'Trabajamos para mantenerte informado e inspirado. Te contamos cómo lo hacemos.',
      videoDescription:   'Con testimonios de Juan José Garrido (Director Periodístico), Mario Ghibellini (Opinión), Graciela Villasís (Investigación) y más',
    },

    benefist: [
      {
        title: 'Contenido Premium',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio1.png`,
        description: `Acceso sin límites a información exclusiva: reportajes, informes y la mejor selección de historias elaboradas por El Comercio.`,
      },
      {
        title: 'Navegación ilimitada',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio2.png`,
        description: `Navega sin límites en elcomercio.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio3.png`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas.`,
      },
      {
        title: 'Versión digital del impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio5.png`,
        description: `Acceso a la versión digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio4.png`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educación, hogar, entretenimiento y más.`,
      },
    ],
  },

  gestion: {
    // prettier-ignore
    urls: {
      mainHome:     `https://${IsPROD ? 'gestion.pe' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com'}/?ref=paywall`,
      homeUrl:      `https://${IsPROD ? 'gestion.pe/suscripciones/?ref=paywall' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com/suscripciones/?outputType=subscriptions'}`,
      landingUrl:   `https://${IsPROD ? 'gestion.pe/suscripcionesdigitales/?ref=paywall' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com/suscripcionesdigitales/?outputType=subscriptions'}`,
      facebook:     'https://www.facebook.com/Gestionpe',
      twitter:      'https://twitter.com/gestionpe',
      instangram:   'https://www.instagram.com/diariogestion/?hl=es',
      terminos:     'https://suscripciones.gestion.pe/terminos/',
      politicas:    'https://gestion.pe/politica-de-privacidad/',
      terminosSign: 'https://ecoid.pe/terminos_y_condiciones/108f85a3d8e750a325ced951af6cd758a90e73a34',
      politicasSign:'https://ecoid.pe/politica_privacidad/108f85a3d8e750a325ced951af6cd758a90e73a34',
      reclamos:     'http://ecomedia.pe/libro/registrar/elcomercio/',
      appStore:     'https://apps.apple.com/es/app/gestion/id991224096?ct=email_footer',
      googlePlay:   'https://play.google.com/store/apps/details?id=com.eeec.gestion&referrer=email_footer',
      subsPrint:    'https://suscripciones.gestion.pe/?ref=Boton_suscrip_imp',
      clickHelp:    'https://pe-eca.grupodigitex.com/C2C_Comercio/Gestion/Gestion.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada',
      arcOrigin:    `https://api${IsPROD ? '' : '-sandbox'}.gestion.pe`,
      codeCxense:   `${IsPROD ? '8n3linhnzos6' : '8msif5r9dikx' }`
    },

    emails: {
      atencion: 'atencionalcliente@comercio.com.pe',
      cobranzas: 'cobranzas@suscripcionesintegrales.com.pe',
    },

    // prettier-ignore
    texts: {
      mainTop:            'Información que inspira',
      parrafOne:          'Suscríbete y mantente informado con el mejor análisis de las coyunturas',
      parrafTwo:          'que marcan el rumbo económico del país.',
      help:               '¿Necesitas ayuda?',
      offer:              '¡Recomendado!',
      footerEnd:          'Paquetes que incluyen diario impreso, disponibles sólo para Lima.',
      bannerNew:          '¡Nuevo!',
      uniTitle:           'Plan Universitario',
      uniDescription:     'Información veraz y de calidad para tu carrera',
      corporativeTitle:   '¿Deseas mantener a tu empresa informada?',
      corporativeDescrip: 'Consulta las opciones corporativas que tenemos para tu compañía',
      helpTitle:          '¿Necesitas ayuda o tienes dudas?',
      helpSubstitle:      'Comunícate con nosotros',
      helpDescription:    'Consulta nuestra sección de',
    },

    benefist: [
      {
        title: 'Contenido premium',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio1.png`,
        description: `Acceso sin límites a información exclusiva: Análisis e informes exclusivamente desarrollados para gestion.pe, así como la mejor selección de artículos e informes elaborados por The Economist, Diario Gestión y la agencia Bloomberg.`,
      },
      {
        title: 'Navegación ilimitada',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio2.png`,
        description: `Acceso ilimitado a todo el contenido de gestion.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio3.png`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas. Válido solo para Lima.`,
      },
      {
        title: 'Versión digital del impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio5.png`,
        description: `Acceso a la versión digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio4.png`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educación, hogar, entretenimiento y más.`,
      },
    ],
  },
}

const PropertiesCommon = {
  // prettier-ignore
  urls: {
    ecoID:          `https://${IsPROD ? '' : 'pre.'}ecoid.pe`,
    newsLetters:    `https://${IsPROD ? 'afv5trdj4i' : 'vq01ksb95d'}.execute-api.us-east-1.amazonaws.com/${IsPROD ? 'prod' : 'dev'}/userprofile/public/v1`,
    paymentTracker: `https://${IsPROD ? 'su3l9d6w10' : '72q176wl1l'}.execute-api.us-east-1.amazonaws.com/${IsPROD ? 'prod' : 'dev'}/v1`,
    subsDniToken:   `https://${IsPROD ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
    dsnSentry:      `https://${IsPROD ? '81cfb3b862494fdaa0be4359e1423bdb@sentry.ec.pe/82' : '59b299c8444f4b8e9ac7abaa19f719cc@o271396.ingest.sentry.io/1483012'}`,
  },

  // prettier-ignore
  links: {
    identity:     `https://arc-subs-sdk.s3.amazonaws.com/${ArcEnv}/sdk-identity.min.js`,
    sales:        `https://arc-subs-sdk.s3.amazonaws.com/${ArcEnv}/sdk-sales.min.js`,
    payu:         'https://gateway.payulatam.com/ppp-web-gateway/javascript/PayU.js',
    payuTags:     'https://maf.pagosonline.net/ws/fp/tags.js?id=',
    payuPayments: 'https://sandbox.api.payulatam.com/payments-api/4.0/service',
    profile:      '/mi-perfil/?outputType=signwall',
    preguntas:    `/suscripcionesdigitales/faqs/${IsPROD ? '' : '?outputType=paywall'}`,
    bannerCorp:   `/suscripcionesdigitales/empresa/${IsPROD ? '' : '?outputType=paywall'}`,
    landingFia:   `/suscripcionesdigitales/fia/${IsPROD ? '?ref=auth-fia' : '?outputType=subscriptions&ref=auth-fia'}`,
    clubComercio: 'https://clubelcomercio.pe/?home=suscripciones_digitales',
    callCenter:   'tel:+5113115100'
  },

  tokens: {
    paymentTracker: IsPROD
      ? '5088cbc5ceb807c702b4e3487173ef792eb50be4'
      : 'deb904a03a4e31d420a014534514b8cc8ca4d111',
  },

  // prettier-ignore
  texts: {
    login:           'Bienvenido. Inicia sesión',
    register:        'Regístrate',
    forgot:          'Olvidé mi contraseña',
    subtitleForgot:  'Ingresa tu correo electrónico para cambiar tu contraseña',
    msgForgotOk:     `Revisa tu correo electrónico para cambiar tu contraseña`,
    backLogin:       `Regresar a `,
    orEnterDates:    'O completa tus datos para registrarte',
    orEnterDatesLog: 'O ingresa con tu usuario',
    accept:          `Al crear la cuenta acepto los `,
    terms:           'Términos y Condiciones',
    and:             ` y `,
    policies:        'Políticas de Privacidad',
    hasAccount:      `Ya tengo una cuenta `,
    noticeUser:      'Con tus datos, mejoraremos tu experiencia de navegación y nunca publicaremos sin tu permiso',
    notHasAccount:   `No tengo cuenta `,
    RememberChose:   'Recuerda que puedes elegir entre nuestros diferentes planes.',
    verifyEmail:     'Verifique su correo electrónico. A esta enviaremos su boleta.',
    rememberRecurrency: 'El precio de la suscripción se cargará automáticamente en tu tarjeta cada mes o año, según el período elegido.',
    showSecure:      'Compra seguro. Esta web está protegida',
    textTerms:       'Acepto las condiciones de servicio, las políticas de privacidad, y estoy de acuerdo con la información.',
    whereCvv:        '¿Dónde está el CVV?',
    titlePay:        'Ingresa tu información de pago',
    labelcNumber:    'Número de tarjeta',
    labelcExpire:    'Fecha de vencimiento',
    labelcCvv:       `CVV `,
    termsAccept:     `Acepto las `,
    termsConditions: 'condiciones de servicio',
    textTermsThe:    `, las `,
    textTermsPolices:'políticas de privacidad',
    textTermsAccord: `, y estoy de acuerdo con la información.`,
    knownBenefist:   'Conoce los beneficios del Club y descarga la aplicación en Google Play o App Store',
    downloadApps:    'Descarga la aplicación en Google Play o App Store',
    rememberBenefist:` con los accesos para Club El Comercio. No olvides que tu servicio de suscripción se renueva automáticamente.`,
    sendEmailTo:     `Te enviaremos un mail a `,
    sendEmailReciept:`Enviaremos la boleta de compra de la suscripción al correo: `,
    haveSuscription: `Estimado suscriptor ya cuentas con una suscripción activa. Ver los detalles en: `,
    continuedShop:   '¿Desea continuar con la compra?',
    contactTo:       'Cualquier consulta contáctanos',
    sendTo:          ` enviando un correo a `,
    successSubsPrint:'ACCEDE A ESTOS PRECIOS ESPECIALES POR SER SUSCRIPTOR IMPRESO',
    successSubsFree: 'Accede a contenido exclusivo y navega ilimitadamente a las noticias más relevantes del Perú y del mundo.',
    titleValidDni:   '¿Eres suscriptor de nuestra edición impresa?',
    subTitleValidDni:'Inicia sesión o regístrate y descubre el precio',
    registerSuccess: 'Tu cuenta ha sido creada correctamente',
    checkInbox:      'Revisa tu bandeja de correo para confirmar tu registro y sigue navegando',
    notReceiptEmail: '¿No recibiste el correo?',
    reSendEmail:     'Reenviar correo de activación',
    youCanSendEmail: 'Podrás reenviar nuevamente dentro de'
  }
}

export { PropertiesSite, PropertiesCommon, ArcEnv, IsPROD }
