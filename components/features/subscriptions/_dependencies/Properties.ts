import { env, isProd } from '../../../utilities/arc/env'

const cdnStaticEc = 'https://cdna.elcomercio.pe/resources/dist/elcomercio'
const cdnStaticGe = 'https://cdna.gestion.pe/resources/dist/gestion'

const PropertiesSite = {
  elcomercio: {
    // prettier-ignore
    urls: {
      mainHome:      `https://${isProd ? 'elcomercio.pe' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com'}/?ref=paywall`,
      homeUrl:       `https://${isProd ? 'elcomercio.pe/suscripciones/?ref=paywall' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/suscripciones/?outputType=subscriptions'}`,
      landingUrl:    `https://${isProd ? 'elcomercio.pe/suscripcionesdigitales/?ref=paywall' : 'elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/suscripcionesdigitales/?outputType=subscriptions'}`,
      facebook:      'https://www.facebook.com/elcomercio.pe',
      twitter:       'https://twitter.com/elcomercio_peru',
      instangram:    'https://www.instagram.com/elcomercio/',
      terminos:      'https://suscripciones.elcomercio.pe/terminos/',
      politicas:     'https://elcomercio.pe/politicas-privacidad/',
      terminosSign:  'https://ecoid.pe/terminos_y_condiciones/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      politicasSign: 'https://ecoid.pe/politica_privacidad/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      reclamos:      'http://ecomedia.pe/libro/registrar/elcomercio/',
      appStore:      'https://apps.apple.com/es/app/el-comercio-peru/id793178800?ct=email_footer',
      googlePlay:    'https://play.google.com/store/apps/details?id=com.gec.elcomercio&referrer=email_footer',
      subsPrint:     'https://suscripciones.elcomercio.pe/?ref=Boton_suscrip_imp',
      clickHelp:     'https://pe-eca.grupodigitex.com/C2C_Comercio/Ventas/Ventas.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada',
      arcOrigin:     `https://api${isProd ? '' : '-sandbox'}.elcomercio.pe`,
      codeCxense:    `${isProd ? '8msiqbaswc5u' : '8n3ltuopvlh1'}`,
      subsBundle:    `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/bundle/`,
      subsDigitales: `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/`,
    },

    emails: {
      atencion: 'atencionalcliente@comercio.com.pe',
      cobranzas: 'cobranzas@suscripcionesintegrales.com.pe',
    },

    // prettier-ignore
    texts: {
      mainTop:            '#Qu??dateEnCasa',
      parrafOne:          'Y accede sin l??mites desde la comodidad de tu casa a informaci??n exclusiva:',
      parrafTwo:          'reportajes, informes y la mejor selecci??n de noticias e historias elaboradas por El Comercio.',
      help:               '??Necesitas ayuda?',
      offer:              '??Recomendado!',
      bannerTitle:        'Suscripciones impresas',
      bannerText:         'Recibe la mejor informaci??n todos los d??as en la puerta de tu casa.',
      bannerButton:       'Conocer m??s',
      footerEnd:          'Paquetes que incluyen diario impreso, disponibles s??lo para Lima y Callao',
      bannerNew:          '??Nuevo!',
      uniTitle:           'Plan Universitario',
      uniDescription:     'Informaci??n veraz y de calidad para tu carrera',
      corporativeTitle:   '??Deseas mantener a tu empresa informada?',
      corporativeDescrip: 'Consulta las opciones corporativas que tenemos para tu compa????a',
      helpTitle:          '??Necesitas ayuda o tienes dudas?',
      helpSubstitle:      'Comun??cate con nosotros',
      helpDescription:    'Consulta nuestra secci??n de',
      videoTitle:         'Periodismo independiente y veraz, todos los d??as',
      videoSubtitle:      'Trabajamos para mantenerte informado e inspirado. Te contamos c??mo lo hacemos.',
      videoDescription:   'Con testimonios de Juan Jos?? Garrido (Director Period??stico), Mario Ghibellini (Opini??n), Graciela Villas??s (Investigaci??n) y m??s',
      backSite:           'Volver a El Comercio',
    },

    benefits: [
      {
        title: 'Contenido Premium',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio1`,
        description: `Acceso sin l??mites a informaci??n exclusiva: reportajes, informes y la mejor selecci??n de historias elaboradas por El Comercio.`,
      },
      {
        title: 'Navegaci??n ilimitada',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio2`,
        description: `Navega sin l??mites en elcomercio.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio3`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas.`,
      },
      {
        title: 'Versi??n digital del impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio5`,
        description: `Acceso a la versi??n digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio4`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educaci??n, hogar, entretenimiento y m??s.`,
      },
    ],

    faqs: [
      {
        group: 'Plan Digital El Comercio',
        faqs: [
          {
            q:
              '??Qu?? es acceso ilimitado a la web elcomercio.pe en todos tus dispositivos?',
            a:
              'Es la opci??n que te ofrece El Comercio para seguir inform??ndote sin l??mites a trav??s de su p??gina web desde cualquier dispositivo que desees: celular, laptop, desktop o tablet. Este acceso tambi??n te permite navegar sin l??mites desde la app de El Comercio.',
          },
          {
            q: '??C??mo funciona?',
            a:
              'Si no adquieres la suscripci??n digital, puedes leer determinado n??mero de notas gratuitas dentro del mes (en la web y en la app de El Comercio). Al consumir el n??mero de notas gratuitas mensuales, te pedimos que adquieras un plan para seguir navegando de forma ilimitada en nuestra p??gina web y/o en nuestra app. Para poder usar tu plan, tienes que ingresar con tu usuario y contrase??a.',
          },
          {
            q:
              'Si no adquiero ning??n plan digital, ??puedo seguir navegando en la web de El Comercio?',
            a:
              'Si has cumplido el n??mero de notas gratuitas mensuales, puedes seguir accediendo a la p??gina principal de la web y/o la app, pero no a las notas y dem??s contenido. Solo adquiriendo tu suscripci??n digital puedes seguir navegando sin l??mites.',
          },
          {
            q:
              'Estoy suscrito a la edici??n impresa de El Comercio. ??Debo adquirir el Plan Digital para navegar ilimitadamente en la web / app?',
            a:
              'S??. Tu suscripci??n al diario impreso es independiente a la suscripci??n al Plan Digital. Sin embargo, tienes un precio especial: accede al Plan Digital completamente gratis los 6 primeros meses y luego paga S/10 cada mes (precio regular S/19). El precio especial estar?? vigente para ti siempre y cuando mantengas tu suscripci??n al diario impreso de El  Comercio.',
          },
        ],
      },
      {
        group: 'Plan Digital + Impreso',
        faqs: [
          {
            q: '??En qu?? se diferencia del Plan Digital El Comercio?',
            a: [
              'Adem??s de brindarte navegaci??n sin l??mites en la web y la app de El Comercio, te ofrece la versi??n impresa del diario + acceso a la edici??n impresa en formato digital (PDF) + Club El Comercio (programa de beneficios). En cuanto al reparto de la edici??n impresa, hay dos opciones: ',
              '- 3 d??as de reparto: Viernes, s??bado, domingo',
              '- 7 d??as de reparto: De lunes a domingo.',
            ],
          },
          {
            q: '??Qu?? es acceso a la versi??n impresa en formato digital: PDF?',
            a:
              'Son las ediciones impresas de El Comercio que se encuentran en formato digital (PDF) en la web de Per?? Quiosco. Adquiriendo el Plan Digital + Impreso, podr??s leer la versi??n digital desde el dispositivo que quieras.',
          },
          {
            q: '??C??mo funciona el programa de beneficios Club El Comercio?',
            a:
              'Es el programa de beneficios exclusivo para suscriptores del diario El Comercio, donde accedes a descuentos en restaurantes, entretenimiento y m??s, las veces que desees con cualquier medio de pago. Ver m??s en [Club El Comercio](https://clubelcomercio.pe/)',
          },
          {
            q: '??C??mo hago uso de los beneficios de Club El Comercio?',
            a: [
              '1. Indica que eres suscriptor de Club El Comercio',
              '2. Identif??cate presentando tu Documento de identidad (imprescindible)',
              '3. Disfruta tu descuento',
            ],
          },
          {
            q: '??Cu??ndo empieza el reparto de mi edici??n impresa?',
            a:
              'El servicio de reparto comenzar?? a realizarse en un plazo no mayor a siete (7) d??as ??tiles de efectuado el pago de la misma y siempre que la direcci??n de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '??C??mo solicito el cambio de direcci??n para la entrega de mi suscripci??n?',
            a:
              'Podr??s solicitar el cambio de direcci??n para la prestaci??n del servicio de suscripci??n, siempre y cuando la nueva direcci??n se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de direcci??n en suscripciones.gestion.pe accediendo a la opci??n ???Ingresa??? o llamando a la central de servicio al cliente ??? 3115100 dentro del horario de atenci??n, con seis (06) d??as ??tiles de anticipaci??n. Transcurrido dicho plazo, El Comercio confirmar?? la factibilidad del cambio de direcci??n. Si realizas el cambio de direcci??n por la central telef??nica, no visualizar?? la nueva direcci??n en el portal.',
          },
          {
            q: '??Puedo solicitar un comprobante de venta por la suscripci??n?',
            a: [
              'S??, la empresa emitir?? un comprobante electr??nico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podr?? visualizar dicho comprobante de pago desde la p??gina web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deber?? ingresar los siguientes d??gitos seg??n corresponda.',
              'Persona natural: Ingresar los 8 d??gitos del DNI del suscriptor contrase??a: INICIO00',
              'Empresa: Ingresar los 10 primeros d??gitos del RUC contrase??a: INICIO00',
            ],
          },
          {
            q: '??Puedo cambiar el medio de pago de mi suscripci??n?',
            a:
              'Puedes realizar el cambio de medio de pago accediendo a tu perfil en [https://www.elcomercio.pe](https://www.elcomercio.pe)',
          },
          {
            q: '??Desde cu??ndo hago uso de los beneficios de Club El Comercio?',
            a:
              'Podr??s hacer uso de los descuentos y promociones de Club El Comercio  al momento de culminar el pago con cualquier medio de pago. Siempre que haya culminado su registro ingresando al link que le llegar?? por correo electr??nico al titular de la suscripci??n.',
          },
          {
            q: '??Qui??nes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas que se encuentren registradas en la base de suscriptores de El Comercio',
          },
          {
            q: '??C??mo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario El Comercio en el establecimiento.',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.  ',
              '',
              '### B. Si Usted es una persona jur??dica, s??guenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atenci??n al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre su DNI',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible)',
              '3. Disfruta de Sus Descuentos.',
            ],
          },
        ],
      },
      {
        group: 'Temas Generales',
        faqs: [
          {
            q:
              'Cuando elijo el Plan Digital o el Plan Digital + Impreso, me est??n pidiendo registrarme antes de continuar con la compra. ??Por qu???',
            a:
              'Te pedimos registrarte para ofrecerte una experiencia de navegaci??n cada vez m??s personalizada de acuerdo a tus gustos e intereses. Asimismo, es necesario que est??s registrado para poder asociar la compra a tu usuario.  ',
          },
          {
            q: '??Tiene alg??n costo registrarme?',
            a:
              'No. El proceso de registro es completamente gratuito. Pero recuerda que Registrarte (crear un usuario en la web o app de El Comercio) es distinto a suscribirte al Plan Digital o a alguno de los otros planes. Suscribirte s?? implica un pago.',
          },
          {
            q: '??Qu?? diferencia hay entre registrarme e ingresar?',
            a: [
              '* El registro se hace una sola vez. Reg??strate solo si anteriormente no te has registrado en la web de El Comercio ni en la web de Gesti??n, a trav??s de ning??n dispositivo.',
              '  * Puedes registrarte usando tu Facebook o ingresando un correo electr??nico y contrase??a.',
              '* Ingresa o inicia sesi??n si ya te has registrado previamente a trav??s de alg??n dispositivo.',
              '  * Puedes iniciar sesi??n usando tu Facebook o ingresando el correo y contrase??a que usaste en el registro.',
            ],
          },
          {
            q: '??Me conviene registrarme/iniciar sesi??n con Facebook?',
            a: [
              'S?? te conviene, ya que podr??s seguir accediendo al contenido de las web sin necesidad de recordar una nueva contrase??a.',
              'Si me registro / inicio sesi??n con Facebook,',
              '',
              '|Preguntas|Respuestas|',
              '|---------|----------|',
              '|??El Comercio tendr?? acceso a toda la informaci??n de mi Facebook?|No. S??lo recibiremos los siguientes datos: nombre, apellido, sexo, pa??s y foto de perfil.|',
              '|??El Comercio podr?? publicar en mi muro de Facebook?|No. Nunca publicaremos sin tu consentimiento.|',
              '|??Comenzar?? a seguir a El Comercio en Facebook?|No. Si deseas seguir nuestra p??gina en FB, tienes que entrar al perfil de ??sta y darle like.|',
            ],
          },
          {
            q:
              '??Cu??les son los medios de pago para adquirir alg??n plan digital?',
            a:
              'Puedes adquirir cualquiera de nuestras suscripciones pagando con tarjeta de cr??dito o d??bito, a trav??s del cargo autom??tico.',
          },
          {
            q:
              'Tengo problemas para adquirir uno de los planes digitales. ??Me pueden ayudar?',
            a:
              'Aseg??rate de ingresar la informaci??n correctamente en los espacios solicitados del formulario. Si aun as?? no logras registrarte, ll??manos al [(01) 311-5100](tel:+5113115100)',
          },
          {
            q: '??Qu?? van a hacer con mi informaci??n?',
            a:
              'Te invitamos a visitar nuestra secci??n de Pol??ticas de privacidad donde te explicamos c??mo utilizaremos la informaci??n que pedimos en la Adquisici??n de planes.',
          },
          {
            q: '??Puedo cambiar el medio de pago de mi suscripci??n?',
            a:
              'Puedes realizar el cambio de medio de pago en la secci??n Mi Perfil. Para ello, inicia tu sesi??n en la parte superior derecha de la web.',
          },
          {
            q:
              'Mi pregunta no fue solucionada aqu??, ??d??nde puedo recibir ayuda?',
            a: [
              'Para cualquier informaci??n, duda o consulta, puedes recibir ayuda personalizada por los siguientes medios:',
              '',
              '   1. Ll??manos al [(01) 311-5100](tel:+5113115100)',
              '',
              'Horario de atenci??n al Cliente es el siguiente:',
              '',
              'De lunes a viernes de 7:00 am 9:00 pm',
              'S??bados, domingos y feriados de 7:00 am a 1:00 pm',
            ],
          },
        ],
      },
    ],
  },

  gestion: {
    // prettier-ignore
    urls: {
      mainHome:      `https://${isProd ? 'gestion.pe' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com'}/?ref=paywall`,
      homeUrl:       `https://${isProd ? 'gestion.pe/suscripciones/?ref=paywall' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com/suscripciones/?outputType=subscriptions'}`,
      landingUrl:    `https://${isProd ? 'gestion.pe/suscripcionesdigitales/?ref=paywall' : 'elcomercio-gestion-sandbox.cdn.arcpublishing.com/suscripcionesdigitales/?outputType=subscriptions'}`,
      facebook:      'https://www.facebook.com/Gestionpe',
      twitter:       'https://twitter.com/gestionpe',
      instangram:    'https://www.instagram.com/diariogestion/?hl=es',
      terminos:      'https://suscripciones.gestion.pe/terminos/',
      politicas:     'https://gestion.pe/politica-de-privacidad/',
      terminosSign:  'https://ecoid.pe/terminos_y_condiciones/108f85a3d8e750a325ced951af6cd758a90e73a34',
      politicasSign: 'https://ecoid.pe/politica_privacidad/108f85a3d8e750a325ced951af6cd758a90e73a34',
      reclamos:      'http://ecomedia.pe/libro/registrar/elcomercio/',
      appStore:      'https://apps.apple.com/es/app/gestion/id991224096?ct=email_footer',
      googlePlay:    'https://play.google.com/store/apps/details?id=com.eeec.gestion&referrer=email_footer',
      subsPrint:     'https://suscripciones.gestion.pe/?ref=Boton_suscrip_imp',
      clickHelp:     'https://pe-eca.grupodigitex.com/C2C_Comercio/Gestion/Gestion.aspx?utm_source=web-suscripciones&utm_medium=boton&utm_campaign=C2C&utm_term=ayuda-llamar&utm_content=suscripciones-portada',
      arcOrigin:     `https://api${isProd ? '' : '-sandbox'}.gestion.pe`,
      codeCxense:    `${isProd ? '8n3linhnzos6' : '8msif5r9dikx' }`,
      subsBundle:    `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/bundle/`,
      subsDigitales: `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/`
    },

    emails: {
      atencion: 'atencionalcliente@comercio.com.pe',
      cobranzas: 'cobranzas@suscripcionesintegrales.com.pe',
    },

    // prettier-ignore
    texts: {
      mainTop:            'Informaci??n que inspira',
      parrafOne:          'Suscr??bete y mantente informado con el mejor an??lisis de las coyunturas',
      parrafTwo:          'que marcan el rumbo econ??mico del pa??s.',
      help:               '??Necesitas ayuda?',
      offer:              '??Recomendado!',
      footerEnd:          'Paquetes que incluyen diario impreso, disponibles s??lo para Lima.',
      bannerNew:          '??Nuevo!',
      uniTitle:           'Plan Universitario',
      uniDescription:     'Informaci??n veraz y de calidad para tu carrera',
      corporativeTitle:   '??Deseas mantener a tu empresa informada?',
      corporativeDescrip: 'Consulta las opciones corporativas que tenemos para tu compa????a',
      helpTitle:          '??Necesitas ayuda o tienes dudas?',
      helpSubstitle:      'Comun??cate con nosotros',
      helpDescription:    'Consulta nuestra secci??n de',
      backSite:           'Volver a Gesti??n',
    },

    benefits: [
      {
        title: 'Contenido premium',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio1`,
        description: `Acceso sin l??mites a informaci??n exclusiva: An??lisis e informes exclusivamente desarrollados para gestion.pe, as?? como la mejor selecci??n de art??culos e informes elaborados por The Economist, Diario Gesti??n y la agencia Bloomberg.`,
      },
      {
        title: 'Navegaci??n ilimitada',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio2`,
        description: `Acceso ilimitado a todo el contenido de gestion.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio3`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas. V??lido solo para Lima.`,
      },
      {
        title: 'Versi??n digital del impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio5`,
        description: `Acceso a la versi??n digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio4`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educaci??n, hogar, entretenimiento y m??s.`,
      },
    ],

    faqs: [
      {
        group: 'Plan Digital Gesti??n',
        faqs: [
          {
            q:
              '??Qu?? es acceso ilimitado a la web gestion.pe en todos tus dispositivos?',
            a:
              'Es la opci??n que te ofrece Gesti??n para seguir inform??ndote sin l??mites a trav??s de su p??gina web desde cualquier dispositivo que desees: celular, laptop, desktop o tablet.',
          },
          {
            q: '??C??mo funciona?',
            a:
              'Si no adquieres la suscripci??n digital, puedes leer determinado n??mero de notas gratuitas dentro del mes (noticias generales, excluyendo el ???contenido especial???). Al consumir el n??mero de notas gratuitas mensuales, te pedimos que adquieres un plan para seguir navegando de forma ilimitada en nuestra p??gina web. Para poder usar tu plan, tienes que ingresar con tu usuario y contrase??a.',
          },
          {
            q:
              '??Qu?? es el contenido especial y por qu?? no puedo acceder libremente a ??l?',
            a:
              'Por ???contenido especial??? nos referimos a art??culos especialmente desarrollados para la web de Gesti??n sobre diversos temas vinculados a Econom??a, Negocios, Finanzas, Management y otros temas relevantes para nuestros lectores. Estos art??culos se pueden reconocer por el ??cono ???Plus G??? y no son de libre acceso. Para poder leerlos, debes adquirir una suscripci??n digital.',
          },
          {
            q:
              'Si no adquiero ning??n plan digital, ??puedo seguir navegando en la web de Gesti??n?',
            a:
              'Si has cumplido el n??mero de notas gratuitas mensuales, puedes seguir accediendo a la p??gina principal, pero no a las notas y dem??s contenido. Solo adquiriendo tu suscripci??n digital puedes seguir navegando sin l??mites.',
          },
          {
            q:
              'Estoy suscrito a la edici??n impresa de Gesti??n. ??Debo adquirir el Plan Digital para navegar ilimitadamente en la web y tener acceso a su contenido especial?',
            a:
              'S??. Tu suscripci??n al diario impreso es independiente a la suscripci??n al Plan Digital. Sin embargo, tienes un precio especial: accede al Plan Digital completamente gratis los 3 primeros meses y luego paga S/19 cada mes (precio regular S/39). El precio especial estar?? vigente para ti siempre y cuando mantengas tu suscripci??n al diario impreso de Gesti??n.',
          },
          {
            q: 'Quiero comprar con RUC un plan digital, ??c??mo puedo acceder?',
            a:
              'Si eres una empresa, ingresa a www.gestion.pe/suscripcionesdigitales y haz clic en Suscripciones Corporativas, ah?? encontrar??s un formulario donde podr??s dejar tus datos e inmediatamente nos comunicaremos contigo para atender tu requerimiento. Asimismo, puedes comunicarte con nosotros al 311-5100 y gustosamente atendemos tu consulta y/o requerimiento. ',
          },
        ],
      },
      {
        group: 'Plan Digital + Impreso',
        faqs: [
          {
            q: '??En qu?? se diferencia del Plan Digital Gesti??n?',
            a:
              'Adem??s de brindarte acceso al contenido especial y la navegaci??n sin l??mites en gestion.pe, te ofrece la versi??n impresa del diario (de lunes a viernes) + Revista G (1 vez al mes) + acceso a la edici??n impresa en formato digital (PDF) + Mundo G (programa de beneficios).',
          },
          {
            q: '??Qu?? es Revista G?',
            a: [
              'Es la revista mensual especializada en econom??a, finanzas y negocios. Cuenta con:',
              '- Reportajes e informes sobre manejo de portafolios de inversi??n, gesti??n de patrimonios, e innovaciones tecnol??gicas.',
              '- Entrevistas y notas de negocios que resaltan el desempe??o y las decisiones claves de los CEO al frente de sus retos empresariales.',
              '- Estilo de Vida: Secci??n de opini??n cr??tica de restaurantes, moda de vestir de estaci??n, y lo ??ltimo del segmento premium del mercado automotriz.',
            ],
          },
          {
            q: '??Qu?? es acceso a la versi??n impresa en formato digital: PDF?',
            a:
              'Son las ediciones impresas de Gesti??n que se encuentran en formato digital (PDF) en la web de Per?? Quiosco. Adquiriendo el Plan Digital + Impreso, podr??s leer la versi??n digital desde el dispositivo que quieras.',
          },
          {
            q: '??C??mo funciona el programa de beneficios Mundo G? ',
            a:
              'Es el programa de beneficios exclusivo para suscriptores del diario Gesti??n, donde accedes a descuentos en educaci??n, restaurantes y m??s, las veces que desees con cualquier medio de pago. Ver m??s en [Mundo G](http://mundog.gestion.pe/)',
          },
          {
            q: '????C??mo hago uso de los beneficios de Mundo G?',
            a: [
              '1. Indica que eres suscriptor de Mundo G',
              '2. Identif??cate presentando tu Documento de identidad (imprescindible)',
              '3. Disfruta tu descuento',
            ],
          },
          {
            q: '??Cu??ndo empieza el reparto de mi edici??n impresa?',
            a:
              'El servicio de reparto comenzar?? a realizarse en un plazo no mayor a siete (7) d??as ??tiles de efectuado el pago de la misma y siempre que la direcci??n de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '??C??mo solicito el cambio de direcci??n para la entrega de mi suscripci??n?',
            a:
              'Podr??s solicitar el cambio de direcci??n para la prestaci??n del servicio de suscripci??n, siempre y cuando la nueva direcci??n se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de direcci??n en suscripciones.gestion.pe accediendo a la opci??n ???Ingresa??? o llamando a la central de servicio al cliente ??? 3115100 dentro del horario de atenci??n, con seis (06) d??as ??tiles de anticipaci??n. Transcurrido dicho plazo, El Comercio confirmar?? la factibilidad del cambio de direcci??n. Si realizas el cambio de direcci??n por la central telef??nica, no visualizar?? la nueva direcci??n en el portal.',
          },
          {
            q: '??Puedo solicitar un comprobante de venta por la suscripci??n?',
            a: [
              'S??, la empresa emitir?? un comprobante electr??nico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podr?? visualizar dicho comprobante de pago desde la p??gina web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deber?? ingresar los siguientes d??gitos seg??n corresponda.',
              'Persona natural: Ingresar los 8 d??gitos del DNI del suscriptor contrase??a: INICIO00',
              'Empresa: Ingresar los 10 primeros d??gitos del RUC contrase??a: INICIO00',
            ],
          },
          {
            q: '??Puedo cambiar el medio de pago de mi suscripci??n?',
            a:
              'Puedes realizar el cambio de medio de pago en suscripciones.gestion.pe accediendo a la opci??n ???Ingresa??? ubicada en la parte superior derecha del portal.',
          },
          {
            q: '??Desde cu??ndo hago uso de los beneficios de Mundo G?',
            a:
              'Podr?? hacer uso de los descuentos y promociones de Mundo G al momento de culminar el pago con cualquier medio de pago en suscripciones.gestion.pe ??. Siempre que haya culminado su registro ingresando al link que le llegar?? por correo electr??nico al titular de la suscripci??n.',
          },
          {
            q: '??Qui??nes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas naturales o jur??dicas que se encuentren registradas en la base de suscriptores de Mundo G',
          },
          {
            q: '??C??mo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario Gesti??n en el establecimiento.',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.',
              '',
              '### B. Si Usted es una persona jur??dica, s??guenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atenci??n al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre su DNI.',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible)',
              '3. Disfruta de Sus Descuentos.',
            ],
          },
        ],
      },
      {
        group: 'Plan Impreso',
        faqs: [
          {
            q: '??En qu?? se diferencia de los otros dos planes?',
            a:
              'Te brinda acceso a la edici??n impresa del diario Gesti??n (de lunes a viernes) + Revista G + acceso a la edici??n impresa en formato digital (PDF) +  Mundo G (programa de beneficios). Este plan no incluye navegaci??n ilimitada en la web gestion.pe ni acceso al contenido especial desarrollado para la web.',
          },
          {
            q: '??Cu??ndo empieza el reparto de mi edici??n impresa?',
            a:
              'El servicio de reparto comenzar?? a realizarse en un plazo no mayor a siete (7) d??as ??tiles de efectuado el pago de la misma y siempre que la direcci??n de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '??C??mo solicito el cambio de direcci??n para la entrega de mi suscripci??n?',
            a:
              'Podr??s solicitar el cambio de direcci??n para la prestaci??n del servicio de suscripci??n, siempre y cuando la nueva direcci??n se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de direcci??n en suscripciones.gestion.pe accediendo a la opci??n ???Ingresa??? o llamando a la central de servicio al cliente ??? 3115100 dentro del horario de atenci??n, con seis (06) d??as ??tiles de anticipaci??n. Transcurrido dicho plazo, El Comercio confirmar?? la factibilidad del cambio de direcci??n. Si realizas el cambio de direcci??n por la central telef??nica, no visualizar?? la nueva direcci??n en el portal.',
          },
          {
            q: '??Puedo solicitar un comprobante de venta por la suscripci??n?',
            a: [
              'S??, la empresa emitir?? un comprobante electr??nico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podr?? visualizar dicho comprobante de pago desde la p??gina web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deber?? ingresar los siguientes d??gitos seg??n corresponda.',
              'Persona natural: Ingresar los 8 d??gitos del DNI del suscriptor, contrase??a: INICIO00',
              'Empresa: Ingresar los 10 primeros d??gitos del RUC, contrase??a: INICIO00',
            ],
          },
          {
            q: '??Puedo cambiar el medio de pago de mi suscripci??n?',
            a:
              'Puedes realizar el cambio de medio de pago en suscripciones.gestion.pe accediendo a la opci??n ???Ingresa??? ubicada en la parte superior derecha del portal.',
          },
          {
            q: '??Desde cu??ndo hago uso de los beneficios de Mundo G?',
            a:
              'Podr?? hacer uso de los descuentos y promociones de Mundo G al momento de culminar el pago con cualquier medio de pago en suscripciones.gestion.pe ??. Siempre que haya culminado su registro ingresando al link que le llegar?? por correo electr??nico al titular de la suscripci??n.',
          },
          {
            q: '??Qui??nes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas naturales o jur??dicas que se encuentren registradas en la base de suscriptores de Mundo G',
          },
          {
            q: '??C??mo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario Gesti??n en el establecimiento.',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.',
              '',
              '### B. Si Usted es una persona jur??dica, s??guenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atenci??n al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre',
              '2. Identif??quese presentando su Documento de Identidad (imprescindible)',
              '3. Disfruta de Sus Descuentos.',
            ],
          },
        ],
      },
      {
        group: 'Temas Generales',
        faqs: [
          {
            q:
              'Cuando elijo el Plan Digital o el Plan Digital + Impreso, me est??n pidiendo registrarme antes de continuar con la compra. ??Por qu???',
            a:
              'Te pedimos registrarte para ofrecerte una experiencia de navegaci??n cada vez m??s personalizada de acuerdo a tus gustos e intereses. Asimismo, es necesario que est??s registrado para poder asociar la compra a tu usuario. ',
          },
          {
            q: '??Tiene alg??n costo registrarme?',
            a:
              'No. El proceso de registro es completamente gratuito. Pero recuerda que Registrarte (crear un usuario en la web de gestion.pe) es distinto a suscribirte al Plan Digital o a alguno de los otros planes. Suscribirte s?? implica un pago.',
          },
          {
            q: '??Qu?? diferencia hay entre registrarme e ingresar?',
            a: [
              '* El registro se hace una sola vez. Reg??strate solo si anteriormente no te has registrado en la web de El Comercio ni en la web de Gesti??n, a trav??s de ning??n dispositivo.',
              '  * Puedes registrarte usando tu Facebook, Google o ingresando un correo electr??nico y contrase??a.',
              '* Ingresa o inicia sesi??n si ya te has registrado previamente a trav??s de alg??n dispositivo.',
              '  * Puedes iniciar sesi??n usando tu Facebook, Google o ingresando el correo y contrase??a que usaste en el registro.',
            ],
          },
          {
            q: '??Me conviene registrarme/iniciar sesi??n con Facebook o Google?',
            a: [
              'S?? te conviene, ya que podr??s seguir accediendo al contenido de las web sin necesidad de recordar una nueva contrase??a.',
              'Si me registro / inicio sesi??n con Facebook,',
              '',
              '|Preguntas|Respuestas|',
              '|---------|----------|',
              '|??Gesti??n tendr?? acceso a toda la informaci??n de mi Facebook?|No. S??lo recibiremos los siguientes datos: nombre, apellido, sexo, pa??s y foto de perfil.|',
              '|??Gesti??n podr?? publicar en mi muro de Facebook?|No. Nunca publicaremos sin tu consentimiento.|',
              '|??Comenzar?? a seguir a Gesti??n en Facebook?|No. Si deseas seguir nuestra p??gina en FB, tienes que entrar al perfil de ??sta y darle like.|',
            ],
          },
          {
            q:
              '??Cu??les son los medios de pago para adquirir alg??n plan digital?',
            a:
              'Puedes adquirir cualquiera de nuestras suscripciones pagando con tarjeta de cr??dito o d??bito, a trav??s del cargo autom??tico.',
          },
          {
            q:
              'Tengo problemas para adquirir uno de los planes digitales. ??Me pueden ayudar?',
            a:
              'Aseg??rate de ingresar la informaci??n correctamente en los espacios solicitados del formulario. Si aun as?? no logras registrarte, ll??manos al [(01) 311-5100](tel:+5113115100)',
          },
          {
            q: '??Qu?? van a hacer con mi informaci??n?',
            a:
              'Te invitamos a visitar nuestra secci??n de Pol??ticas de privacidad donde te explicamos c??mo utilizaremos la informaci??n que pedimos en la Adquisici??n de planes.',
          },
          {
            q: '??Puedo cambiar el medio de pago de mi suscripci??n?',
            a:
              'Puedes realizar el cambio de medio de pago en la secci??n Mi Perfil. Para ello, inicia tu sesi??n en la parte superior derecha de la web.',
          },
          {
            q:
              'Mi pregunta no fue solucionada aqu??, ??d??nde puedo recibir ayuda?',
            a: [
              'Para cualquier informaci??n, duda o consulta, puedes recibir ayuda personalizada por los siguientes medios:',
              '',
              '   1. Ll??manos al [(01) 311-5100](tel:+5113115100)',
              '',
              'Horario de atenci??n al Cliente es el siguiente:',
              '',
              'De Lunes a Viernes: 7:00 a.m. a 9:00 p.m.',
              'S??bados, Domingos y Feriados: 7:00 a.m. a 1:00 p.m.',
            ],
          },
        ],
      },
    ],
  },
}

const PropertiesCommon = {
  // prettier-ignore
  urls: {
    ecoID:          `https://${isProd ? '' : 'pre.'}ecoid.pe`,
    newsLetters:    `https://${isProd ? 'afv5trdj4i' : 'vq01ksb95d'}.execute-api.us-east-1.amazonaws.com/${isProd ? 'prod' : 'dev'}/userprofile/public/v1`,
    paymentTracker: `https://${isProd ? 'su3l9d6w10' : '72q176wl1l'}.execute-api.us-east-1.amazonaws.com/${isProd ? 'prod' : 'dev'}/v1`,
    subsDniToken:   `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
    dsnSentry:      'https://81cfb3b862494fdaa0be4359e1423bdb@sentry.ec.pe/82',
    companyEmail:   `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subs-corporativa/`
  },

  // prettier-ignore
  links: {
    identity:     `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-identity.min.js`,
    sales:        `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js`,
    payu:         'https://gateway.payulatam.com/ppp-web-gateway/javascript/PayU.js',
    payuTags:     'https://maf.pagosonline.net/ws/fp/tags.js?id=',
    payuPayments: `https://${isProd ? '' : 'sandbox.'}api.payulatam.com/payments-api/4.0/service`,
    payuPublicKey: isProd ? 'PK63j8CtoTehN173BZ568SB6Bs' : 'PKaC6H4cEDJD919n705L544kSU',
    payuAccountID: isProd ? '781124' : '512323',
    profile:      '/mi-perfil/?outputType=signwall',
    preguntas:    `/suscripcionesdigitales/faqs/${isProd ? '' : '?outputType=subscriptions'}`,
    bannerCorp:   `/suscripcionesdigitales/empresa/${isProd ? '' : '?outputType=subscriptions'}`,
    landingFia:   `/suscripcionesdigitales/fia/${isProd ? '?ref=auth-fia' : '?outputType=subscriptions&ref=auth-fia'}`,
    clubComercio: 'https://clubelcomercio.pe/?home=suscripciones_digitales',
    callCenter:   'tel:+5113115100'
  },

  tokens: {
    paymentTracker: isProd
      ? '5088cbc5ceb807c702b4e3487173ef792eb50be4'
      : 'deb904a03a4e31d420a014534514b8cc8ca4d111',
  },

  // prettier-ignore
  texts: {
    login:           'Bienvenido. Inicia sesi??n',
    register:        'Reg??strate',
    forgot:          'Olvid?? mi contrase??a',
    subtitleForgot:  'Ingresa tu correo electr??nico para cambiar tu contrase??a',
    msgForgotOk:     `Revisa tu correo electr??nico para cambiar tu contrase??a`,
    backLogin:       `Regresar a `,
    orEnterDates:    'O completa tus datos para registrarte',
    orEnterDatesLog: 'O ingresa con tu usuario',
    accept:          `Al crear la cuenta acepto los `,
    terms:           'T??rminos y Condiciones',
    and:             ` y `,
    policies:        'Pol??ticas de Privacidad',
    hasAccount:      `Ya tengo una cuenta `,
    noticeUser:      'Con tus datos, mejoraremos tu experiencia de navegaci??n y nunca publicaremos sin tu permiso',
    notHasAccount:   `No tengo cuenta `,
    RememberChose:   'Recuerda que puedes elegir entre nuestros diferentes planes.',
    verifyEmail:     'Verifique su correo electr??nico. A esta enviaremos su boleta.',
    rememberRecurrency: 'El precio de la suscripci??n se cargar?? autom??ticamente en tu tarjeta cada mes o a??o, seg??n el per??odo elegido.',
    showSecure:      'Compra seguro. Esta web est?? protegida',
    textTerms:       'Acepto las condiciones de servicio, las pol??ticas de privacidad, y estoy de acuerdo con la informaci??n.',
    whereCvv:        '??D??nde est?? el CVV?',
    titlePay:        'Ingresa tu informaci??n de pago',
    labelcNumber:    'N??mero de tarjeta',
    labelcExpire:    'Fecha de vencimiento',
    labelcCvv:       `CVV `,
    termsAccept:     `Acepto las `,
    termsConditions: 'condiciones de servicio',
    textTermsThe:    `, las `,
    textTermsPolices:'pol??ticas de privacidad',
    textTermsAccord: `, y estoy de acuerdo con la informaci??n.`,
    knowBenefits:   'Conoce los beneficios del Club y descarga la aplicaci??n en Google Play o App Store',
    downloadApps:    'Descarga la aplicaci??n en Google Play o App Store',
    rememberBenefits:` con los accesos para Club El Comercio. No olvides que tu servicio de suscripci??n se renueva autom??ticamente.`,
    sendEmailTo:     `Te enviaremos un mail a `,
    sendEmailReciept:`Enviaremos la boleta de compra de la suscripci??n al correo: `,
    haveSuscription: `Estimado suscriptor ya cuentas con una suscripci??n activa. Ver los detalles en: `,
    continuedShop:   '??Desea continuar con la compra?',
    contactTo:       'Cualquier consulta cont??ctanos',
    sendTo:          ` enviando un correo a `,
    successSubsPrint:'ACCEDE A ESTOS PRECIOS ESPECIALES POR SER SUSCRIPTOR IMPRESO',
    successSubsFree: 'Accede a contenido exclusivo y navega ilimitadamente a las noticias m??s relevantes del Per?? y del mundo.',
    titleValidDni:   '??Eres suscriptor de nuestra edici??n impresa?',
    subTitleValidDni:'Inicia sesi??n o reg??strate y descubre el precio',
    registerSuccess: 'Tu cuenta ha sido creada correctamente',
    checkInbox:      'Revisa tu bandeja de correo para confirmar tu registro y sigue navegando',
    notReceiptEmail: '??No recibiste el correo?',
    reSendEmail:     'Reenviar correo de activaci??n',
    youCanSendEmail: 'Podr??s reenviar nuevamente dentro de',
    textWinback:     '??Tenemos un precio especial para ti!',
    titleCompany:    'Por favor env??anos tus datos para brindarte informaci??n sobre nuestras suscripciones corporativas.',
    successCompany:  'Tu mensaje ha sido enviado, nos pondremos en contacto contigo.',
    errorCompany:    'Ha ocurrido un error. Int??ntelo m??s tarde'
  },
}

export { PropertiesCommon, PropertiesSite }
