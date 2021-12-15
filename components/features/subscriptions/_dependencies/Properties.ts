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
      backSite:           'Volver a El Comercio',
    },

    benefits: [
      {
        title: 'Contenido Premium',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio1`,
        description: `Acceso sin límites a información exclusiva: reportajes, informes y la mejor selección de historias elaboradas por El Comercio.`,
      },
      {
        title: 'Navegación ilimitada',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio2`,
        description: `Navega sin límites en elcomercio.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio3`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas.`,
      },
      {
        title: 'Versión digital del impreso',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio5`,
        description: `Acceso a la versión digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticEc}/images/landing/beneficios/beneficio4`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educación, hogar, entretenimiento y más.`,
      },
    ],

    faqs: [
      {
        group: 'Plan Digital El Comercio',
        faqs: [
          {
            q:
              '¿Qué es acceso ilimitado a la web elcomercio.pe en todos tus dispositivos?',
            a:
              'Es la opción que te ofrece El Comercio para seguir informándote sin límites a través de su página web desde cualquier dispositivo que desees: celular, laptop, desktop o tablet. Este acceso también te permite navegar sin límites desde la app de El Comercio.',
          },
          {
            q: '¿Cómo funciona?',
            a:
              'Si no adquieres la suscripción digital, puedes leer determinado número de notas gratuitas dentro del mes (en la web y en la app de El Comercio). Al consumir el número de notas gratuitas mensuales, te pedimos que adquieras un plan para seguir navegando de forma ilimitada en nuestra página web y/o en nuestra app. Para poder usar tu plan, tienes que ingresar con tu usuario y contraseña.',
          },
          {
            q:
              'Si no adquiero ningún plan digital, ¿puedo seguir navegando en la web de El Comercio?',
            a:
              'Si has cumplido el número de notas gratuitas mensuales, puedes seguir accediendo a la página principal de la web y/o la app, pero no a las notas y demás contenido. Solo adquiriendo tu suscripción digital puedes seguir navegando sin límites.',
          },
          {
            q:
              'Estoy suscrito a la edición impresa de El Comercio. ¿Debo adquirir el Plan Digital para navegar ilimitadamente en la web / app?',
            a:
              'Sí. Tu suscripción al diario impreso es independiente a la suscripción al Plan Digital. Sin embargo, tienes un precio especial: accede al Plan Digital completamente gratis los 6 primeros meses y luego paga S/10 cada mes (precio regular S/19). El precio especial estará vigente para ti siempre y cuando mantengas tu suscripción al diario impreso de El  Comercio.',
          },
        ],
      },
      {
        group: 'Plan Digital + Impreso',
        faqs: [
          {
            q: '¿En qué se diferencia del Plan Digital El Comercio?',
            a: [
              'Además de brindarte navegación sin límites en la web y la app de El Comercio, te ofrece la versión impresa del diario + acceso a la edición impresa en formato digital (PDF) + Club El Comercio (programa de beneficios). En cuanto al reparto de la edición impresa, hay dos opciones: ',
              '- 3 días de reparto: Viernes, sábado, domingo',
              '- 7 días de reparto: De lunes a domingo.',
            ],
          },
          {
            q: '¿Qué es acceso a la versión impresa en formato digital: PDF?',
            a:
              'Son las ediciones impresas de El Comercio que se encuentran en formato digital (PDF) en la web de Perú Quiosco. Adquiriendo el Plan Digital + Impreso, podrás leer la versión digital desde el dispositivo que quieras.',
          },
          {
            q: '¿Cómo funciona el programa de beneficios Club El Comercio?',
            a:
              'Es el programa de beneficios exclusivo para suscriptores del diario El Comercio, donde accedes a descuentos en restaurantes, entretenimiento y más, las veces que desees con cualquier medio de pago. Ver más en [Club El Comercio](https://clubelcomercio.pe/)',
          },
          {
            q: '¿Cómo hago uso de los beneficios de Club El Comercio?',
            a: [
              '1. Indica que eres suscriptor de Club El Comercio',
              '2. Identifícate presentando tu Documento de identidad (imprescindible)',
              '3. Disfruta tu descuento',
            ],
          },
          {
            q: '¿Cuándo empieza el reparto de mi edición impresa?',
            a:
              'El servicio de reparto comenzará a realizarse en un plazo no mayor a siete (7) días útiles de efectuado el pago de la misma y siempre que la dirección de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '¿Cómo solicito el cambio de dirección para la entrega de mi suscripción?',
            a:
              'Podrás solicitar el cambio de dirección para la prestación del servicio de suscripción, siempre y cuando la nueva dirección se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de dirección en suscripciones.gestion.pe accediendo a la opción “Ingresa” o llamando a la central de servicio al cliente – 3115100 dentro del horario de atención, con seis (06) días útiles de anticipación. Transcurrido dicho plazo, El Comercio confirmará la factibilidad del cambio de dirección. Si realizas el cambio de dirección por la central telefónica, no visualizará la nueva dirección en el portal.',
          },
          {
            q: '¿Puedo solicitar un comprobante de venta por la suscripción?',
            a: [
              'Sí, la empresa emitirá un comprobante electrónico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podrá visualizar dicho comprobante de pago desde la página web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deberá ingresar los siguientes dígitos según corresponda.',
              'Persona natural: Ingresar los 8 dígitos del DNI del suscriptor contraseña: INICIO00',
              'Empresa: Ingresar los 10 primeros dígitos del RUC contraseña: INICIO00',
            ],
          },
          {
            q: '¿Puedo cambiar el medio de pago de mi suscripción?',
            a:
              'Puedes realizar el cambio de medio de pago accediendo a tu perfil en [https://www.elcomercio.pe](https://www.elcomercio.pe)',
          },
          {
            q: '¿Desde cuándo hago uso de los beneficios de Club El Comercio?',
            a:
              'Podrás hacer uso de los descuentos y promociones de Club El Comercio  al momento de culminar el pago con cualquier medio de pago. Siempre que haya culminado su registro ingresando al link que le llegará por correo electrónico al titular de la suscripción.',
          },
          {
            q: '¿Quiénes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas que se encuentren registradas en la base de suscriptores de El Comercio',
          },
          {
            q: '¿Cómo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario El Comercio en el establecimiento.',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.  ',
              '',
              '### B. Si Usted es una persona jurídica, síguenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atención al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre su DNI',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible)',
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
              'Cuando elijo el Plan Digital o el Plan Digital + Impreso, me están pidiendo registrarme antes de continuar con la compra. ¿Por qué?',
            a:
              'Te pedimos registrarte para ofrecerte una experiencia de navegación cada vez más personalizada de acuerdo a tus gustos e intereses. Asimismo, es necesario que estés registrado para poder asociar la compra a tu usuario.  ',
          },
          {
            q: '¿Tiene algún costo registrarme?',
            a:
              'No. El proceso de registro es completamente gratuito. Pero recuerda que Registrarte (crear un usuario en la web o app de El Comercio) es distinto a suscribirte al Plan Digital o a alguno de los otros planes. Suscribirte sí implica un pago.',
          },
          {
            q: '¿Qué diferencia hay entre registrarme e ingresar?',
            a: [
              '* El registro se hace una sola vez. Regístrate solo si anteriormente no te has registrado en la web de El Comercio ni en la web de Gestión, a través de ningún dispositivo.',
              '  * Puedes registrarte usando tu Facebook o ingresando un correo electrónico y contraseña.',
              '* Ingresa o inicia sesión si ya te has registrado previamente a través de algún dispositivo.',
              '  * Puedes iniciar sesión usando tu Facebook o ingresando el correo y contraseña que usaste en el registro.',
            ],
          },
          {
            q: '¿Me conviene registrarme/iniciar sesión con Facebook?',
            a: [
              'Sí te conviene, ya que podrás seguir accediendo al contenido de las web sin necesidad de recordar una nueva contraseña.',
              'Si me registro / inicio sesión con Facebook,',
              '',
              '|Preguntas|Respuestas|',
              '|---------|----------|',
              '|¿El Comercio tendrá acceso a toda la información de mi Facebook?|No. Sólo recibiremos los siguientes datos: nombre, apellido, sexo, país y foto de perfil.|',
              '|¿El Comercio podrá publicar en mi muro de Facebook?|No. Nunca publicaremos sin tu consentimiento.|',
              '|¿Comenzaré a seguir a El Comercio en Facebook?|No. Si deseas seguir nuestra página en FB, tienes que entrar al perfil de ésta y darle like.|',
            ],
          },
          {
            q:
              '¿Cuáles son los medios de pago para adquirir algún plan digital?',
            a:
              'Puedes adquirir cualquiera de nuestras suscripciones pagando con tarjeta de crédito o débito, a través del cargo automático.',
          },
          {
            q:
              'Tengo problemas para adquirir uno de los planes digitales. ¿Me pueden ayudar?',
            a:
              'Asegúrate de ingresar la información correctamente en los espacios solicitados del formulario. Si aun así no logras registrarte, llámanos al [(01) 311-5100](tel:+5113115100)',
          },
          {
            q: '¿Qué van a hacer con mi información?',
            a:
              'Te invitamos a visitar nuestra sección de Políticas de privacidad donde te explicamos cómo utilizaremos la información que pedimos en la Adquisición de planes.',
          },
          {
            q: '¿Puedo cambiar el medio de pago de mi suscripción?',
            a:
              'Puedes realizar el cambio de medio de pago en la sección Mi Perfil. Para ello, inicia tu sesión en la parte superior derecha de la web.',
          },
          {
            q:
              'Mi pregunta no fue solucionada aquí, ¿dónde puedo recibir ayuda?',
            a: [
              'Para cualquier información, duda o consulta, puedes recibir ayuda personalizada por los siguientes medios:',
              '',
              '   1. Llámanos al [(01) 311-5100](tel:+5113115100)',
              '',
              'Horario de atención al Cliente es el siguiente:',
              '',
              'De lunes a viernes de 7:00 am 9:00 pm',
              'Sábados, domingos y feriados de 7:00 am a 1:00 pm',
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
      mainTop:            'Información que inspira',
      parrafOne:          'Suscríbete y mantente informado con el mejor análisis de las coyunturas',
      parrafTwo:          'que marcan el rumbo económico del país.',
      help:               '¿Necesitas ayuda?',
      offer:              '¡Recomendado!',
      bannerTitle:        '',
      bannerText:         '',
      bannerButton:       '',
      footerEnd:          'Paquetes que incluyen diario impreso, disponibles sólo para Lima.',
      bannerNew:          '¡Nuevo!',
      uniTitle:           'Plan Universitario',
      uniDescription:     'Información veraz y de calidad para tu carrera',
      corporativeTitle:   '¿Deseas mantener a tu empresa informada?',
      corporativeDescrip: 'Consulta las opciones corporativas que tenemos para tu compañía',
      helpTitle:          '¿Necesitas ayuda o tienes dudas?',
      helpSubstitle:      'Comunícate con nosotros',
      helpDescription:    'Consulta nuestra sección de',
      videoTitle:         '',
      videoSubtitle:      '',
      videoDescription:   '',
      backSite:           'Volver a Gestión',
    },

    benefits: [
      {
        title: 'Contenido premium',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio1`,
        description: `Acceso sin límites a información exclusiva: Análisis e informes exclusivamente desarrollados para gestion.pe, así como la mejor selección de artículos e informes elaborados por The Economist, Diario Gestión y la agencia Bloomberg.`,
      },
      {
        title: 'Navegación ilimitada',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio2`,
        description: `Acceso ilimitado a todo el contenido de gestion.pe desde todos tus dispositivos: celular, laptop, desktop, tablet o app.`,
      },
      {
        title: 'Diario impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio3`,
        description: `Recibe el diario impreso desde la comodidad de tu casa todas las semanas. Válido solo para Lima.`,
      },
      {
        title: 'Versión digital del impreso',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio5`,
        description: `Acceso a la versión digital del diario de lunes a domingo desde tu smartphone, tablet o computadora.`,
      },
      {
        title: 'Beneficios Club',
        image: `${cdnStaticGe}/images/landing/beneficios/beneficio4`,
        description: `Acceso a cientos de descuentos ilimitados en restaurantes, educación, hogar, entretenimiento y más.`,
      },
    ],

    faqs: [
      {
        group: 'Plan Digital Gestión',
        faqs: [
          {
            q:
              '¿Qué es acceso ilimitado a la web gestion.pe en todos tus dispositivos?',
            a:
              'Es la opción que te ofrece Gestión para seguir informándote sin límites a través de su página web desde cualquier dispositivo que desees: celular, laptop, desktop o tablet.',
          },
          {
            q: '¿Cómo funciona?',
            a:
              'Si no adquieres la suscripción digital, puedes leer determinado número de notas gratuitas dentro del mes (noticias generales, excluyendo el “contenido especial”). Al consumir el número de notas gratuitas mensuales, te pedimos que adquieres un plan para seguir navegando de forma ilimitada en nuestra página web. Para poder usar tu plan, tienes que ingresar con tu usuario y contraseña.',
          },
          {
            q:
              '¿Qué es el contenido especial y por qué no puedo acceder libremente a él?',
            a:
              'Por “contenido especial” nos referimos a artículos especialmente desarrollados para la web de Gestión sobre diversos temas vinculados a Economía, Negocios, Finanzas, Management y otros temas relevantes para nuestros lectores. Estos artículos se pueden reconocer por el ícono “Plus G” y no son de libre acceso. Para poder leerlos, debes adquirir una suscripción digital.',
          },
          {
            q:
              'Si no adquiero ningún plan digital, ¿puedo seguir navegando en la web de Gestión?',
            a:
              'Si has cumplido el número de notas gratuitas mensuales, puedes seguir accediendo a la página principal, pero no a las notas y demás contenido. Solo adquiriendo tu suscripción digital puedes seguir navegando sin límites.',
          },
          {
            q:
              'Estoy suscrito a la edición impresa de Gestión. ¿Debo adquirir el Plan Digital para navegar ilimitadamente en la web y tener acceso a su contenido especial?',
            a:
              'Sí. Tu suscripción al diario impreso es independiente a la suscripción al Plan Digital. Sin embargo, tienes un precio especial: accede al Plan Digital completamente gratis los 3 primeros meses y luego paga S/19 cada mes (precio regular S/39). El precio especial estará vigente para ti siempre y cuando mantengas tu suscripción al diario impreso de Gestión.',
          },
          {
            q: 'Quiero comprar con RUC un plan digital, ¿cómo puedo acceder?',
            a:
              'Si eres una empresa, ingresa a www.gestion.pe/suscripcionesdigitales y haz clic en Suscripciones Corporativas, ahí encontrarás un formulario donde podrás dejar tus datos e inmediatamente nos comunicaremos contigo para atender tu requerimiento. Asimismo, puedes comunicarte con nosotros al 311-5100 y gustosamente atendemos tu consulta y/o requerimiento. ',
          },
        ],
      },
      {
        group: 'Plan Digital + Impreso',
        faqs: [
          {
            q: '¿En qué se diferencia del Plan Digital Gestión?',
            a:
              'Además de brindarte acceso al contenido especial y la navegación sin límites en gestion.pe, te ofrece la versión impresa del diario (de lunes a viernes) + Revista G (1 vez al mes) + acceso a la edición impresa en formato digital (PDF) + Mundo G (programa de beneficios).',
          },
          {
            q: '¿Qué es Revista G?',
            a: [
              'Es la revista mensual especializada en economía, finanzas y negocios. Cuenta con:',
              '- Reportajes e informes sobre manejo de portafolios de inversión, gestión de patrimonios, e innovaciones tecnológicas.',
              '- Entrevistas y notas de negocios que resaltan el desempeño y las decisiones claves de los CEO al frente de sus retos empresariales.',
              '- Estilo de Vida: Sección de opinión crítica de restaurantes, moda de vestir de estación, y lo último del segmento premium del mercado automotriz.',
            ],
          },
          {
            q: '¿Qué es acceso a la versión impresa en formato digital: PDF?',
            a:
              'Son las ediciones impresas de Gestión que se encuentran en formato digital (PDF) en la web de Perú Quiosco. Adquiriendo el Plan Digital + Impreso, podrás leer la versión digital desde el dispositivo que quieras.',
          },
          {
            q: '¿Cómo funciona el programa de beneficios Mundo G? ',
            a:
              'Es el programa de beneficios exclusivo para suscriptores del diario Gestión, donde accedes a descuentos en educación, restaurantes y más, las veces que desees con cualquier medio de pago. Ver más en [Mundo G](http://mundog.gestion.pe/)',
          },
          {
            q: ' ¿Cómo hago uso de los beneficios de Mundo G?',
            a: [
              '1. Indica que eres suscriptor de Mundo G',
              '2. Identifícate presentando tu Documento de identidad (imprescindible)',
              '3. Disfruta tu descuento',
            ],
          },
          {
            q: '¿Cuándo empieza el reparto de mi edición impresa?',
            a:
              'El servicio de reparto comenzará a realizarse en un plazo no mayor a siete (7) días útiles de efectuado el pago de la misma y siempre que la dirección de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '¿Cómo solicito el cambio de dirección para la entrega de mi suscripción?',
            a:
              'Podrás solicitar el cambio de dirección para la prestación del servicio de suscripción, siempre y cuando la nueva dirección se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de dirección en suscripciones.gestion.pe accediendo a la opción “Ingresa” o llamando a la central de servicio al cliente – 3115100 dentro del horario de atención, con seis (06) días útiles de anticipación. Transcurrido dicho plazo, El Comercio confirmará la factibilidad del cambio de dirección. Si realizas el cambio de dirección por la central telefónica, no visualizará la nueva dirección en el portal.',
          },
          {
            q: '¿Puedo solicitar un comprobante de venta por la suscripción?',
            a: [
              'Sí, la empresa emitirá un comprobante electrónico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podrá visualizar dicho comprobante de pago desde la página web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deberá ingresar los siguientes dígitos según corresponda.',
              'Persona natural: Ingresar los 8 dígitos del DNI del suscriptor contraseña: INICIO00',
              'Empresa: Ingresar los 10 primeros dígitos del RUC contraseña: INICIO00',
            ],
          },
          {
            q: '¿Puedo cambiar el medio de pago de mi suscripción?',
            a:
              'Puedes realizar el cambio de medio de pago en suscripciones.gestion.pe accediendo a la opción “Ingresa” ubicada en la parte superior derecha del portal.',
          },
          {
            q: '¿Desde cuándo hago uso de los beneficios de Mundo G?',
            a:
              'Podrá hacer uso de los descuentos y promociones de Mundo G al momento de culminar el pago con cualquier medio de pago en suscripciones.gestion.pe  . Siempre que haya culminado su registro ingresando al link que le llegará por correo electrónico al titular de la suscripción.',
          },
          {
            q: '¿Quiénes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas naturales o jurídicas que se encuentren registradas en la base de suscriptores de Mundo G',
          },
          {
            q: '¿Cómo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario Gestión en el establecimiento.',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.',
              '',
              '### B. Si Usted es una persona jurídica, síguenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atención al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre su DNI.',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible)',
              '3. Disfruta de Sus Descuentos.',
            ],
          },
        ],
      },
      {
        group: 'Plan Impreso',
        faqs: [
          {
            q: '¿En qué se diferencia de los otros dos planes?',
            a:
              'Te brinda acceso a la edición impresa del diario Gestión (de lunes a viernes) + Revista G + acceso a la edición impresa en formato digital (PDF) +  Mundo G (programa de beneficios). Este plan no incluye navegación ilimitada en la web gestion.pe ni acceso al contenido especial desarrollado para la web.',
          },
          {
            q: '¿Cuándo empieza el reparto de mi edición impresa?',
            a:
              'El servicio de reparto comenzará a realizarse en un plazo no mayor a siete (7) días útiles de efectuado el pago de la misma y siempre que la dirección de entrega, se encuentre dentro de la zona de reparto de las publicaciones.',
          },
          {
            q:
              '¿Cómo solicito el cambio de dirección para la entrega de mi suscripción?',
            a:
              'Podrás solicitar el cambio de dirección para la prestación del servicio de suscripción, siempre y cuando la nueva dirección se encuentre dentro de la zona de reparto. Si lo deseas, puedes realizar el cambio de dirección en suscripciones.gestion.pe accediendo a la opción “Ingresa” o llamando a la central de servicio al cliente – 3115100 dentro del horario de atención, con seis (06) días útiles de anticipación. Transcurrido dicho plazo, El Comercio confirmará la factibilidad del cambio de dirección. Si realizas el cambio de dirección por la central telefónica, no visualizará la nueva dirección en el portal.',
          },
          {
            q: '¿Puedo solicitar un comprobante de venta por la suscripción?',
            a: [
              'Sí, la empresa emitirá un comprobante electrónico (boleta o factura) por el importe correspondiente al servicio contratado. El suscriptor podrá visualizar dicho comprobante de pago desde la página web clubelcomercio.pe o ingresando directamente a [http://ecomedia.pe/facturacion](http://ecomedia.pe/facturacion) Para visualizar el comprobante, el suscriptor deberá ingresar los siguientes dígitos según corresponda.',
              'Persona natural: Ingresar los 8 dígitos del DNI del suscriptor, contraseña: INICIO00',
              'Empresa: Ingresar los 10 primeros dígitos del RUC, contraseña: INICIO00',
            ],
          },
          {
            q: '¿Puedo cambiar el medio de pago de mi suscripción?',
            a:
              'Puedes realizar el cambio de medio de pago en suscripciones.gestion.pe accediendo a la opción “Ingresa” ubicada en la parte superior derecha del portal.',
          },
          {
            q: '¿Desde cuándo hago uso de los beneficios de Mundo G?',
            a:
              'Podrá hacer uso de los descuentos y promociones de Mundo G al momento de culminar el pago con cualquier medio de pago en suscripciones.gestion.pe  . Siempre que haya culminado su registro ingresando al link que le llegará por correo electrónico al titular de la suscripción.',
          },
          {
            q: '¿Quiénes tienen acceso a las promociones?',
            a:
              'Todas aquellas personas naturales o jurídicas que se encuentren registradas en la base de suscriptores de Mundo G',
          },
          {
            q: '¿Cómo hago uso de las promociones?',
            a: [
              '### A. Si usted es una persona natural, siga los siguientes pasos:',
              '1. Indique que es suscriptor de Diario Gestión en el establecimiento.',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible).',
              '3. Disfruta de sus descuentos.',
              '',
              '### B. Si Usted es una persona jurídica, síguenos los Siguientes Pasos:',
              '1. Registre en nuestra central de atención al cliente [(01) 311-5100](tel:+5113115100) a los beneficiarios de su empresa y registre',
              '2. Identifíquese presentando su Documento de Identidad (imprescindible)',
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
              'Cuando elijo el Plan Digital o el Plan Digital + Impreso, me están pidiendo registrarme antes de continuar con la compra. ¿Por qué?',
            a:
              'Te pedimos registrarte para ofrecerte una experiencia de navegación cada vez más personalizada de acuerdo a tus gustos e intereses. Asimismo, es necesario que estés registrado para poder asociar la compra a tu usuario. ',
          },
          {
            q: '¿Tiene algún costo registrarme?',
            a:
              'No. El proceso de registro es completamente gratuito. Pero recuerda que Registrarte (crear un usuario en la web de gestion.pe) es distinto a suscribirte al Plan Digital o a alguno de los otros planes. Suscribirte sí implica un pago.',
          },
          {
            q: '¿Qué diferencia hay entre registrarme e ingresar?',
            a: [
              '* El registro se hace una sola vez. Regístrate solo si anteriormente no te has registrado en la web de El Comercio ni en la web de Gestión, a través de ningún dispositivo.',
              '  * Puedes registrarte usando tu Facebook, Google o ingresando un correo electrónico y contraseña.',
              '* Ingresa o inicia sesión si ya te has registrado previamente a través de algún dispositivo.',
              '  * Puedes iniciar sesión usando tu Facebook, Google o ingresando el correo y contraseña que usaste en el registro.',
            ],
          },
          {
            q: '¿Me conviene registrarme/iniciar sesión con Facebook o Google?',
            a: [
              'Sí te conviene, ya que podrás seguir accediendo al contenido de las web sin necesidad de recordar una nueva contraseña.',
              'Si me registro / inicio sesión con Facebook,',
              '',
              '|Preguntas|Respuestas|',
              '|---------|----------|',
              '|¿Gestión tendrá acceso a toda la información de mi Facebook?|No. Sólo recibiremos los siguientes datos: nombre, apellido, sexo, país y foto de perfil.|',
              '|¿Gestión podrá publicar en mi muro de Facebook?|No. Nunca publicaremos sin tu consentimiento.|',
              '|¿Comenzaré a seguir a Gestión en Facebook?|No. Si deseas seguir nuestra página en FB, tienes que entrar al perfil de ésta y darle like.|',
            ],
          },
          {
            q:
              '¿Cuáles son los medios de pago para adquirir algún plan digital?',
            a:
              'Puedes adquirir cualquiera de nuestras suscripciones pagando con tarjeta de crédito o débito, a través del cargo automático.',
          },
          {
            q:
              'Tengo problemas para adquirir uno de los planes digitales. ¿Me pueden ayudar?',
            a:
              'Asegúrate de ingresar la información correctamente en los espacios solicitados del formulario. Si aun así no logras registrarte, llámanos al [(01) 311-5100](tel:+5113115100)',
          },
          {
            q: '¿Qué van a hacer con mi información?',
            a:
              'Te invitamos a visitar nuestra sección de Políticas de privacidad donde te explicamos cómo utilizaremos la información que pedimos en la Adquisición de planes.',
          },
          {
            q: '¿Puedo cambiar el medio de pago de mi suscripción?',
            a:
              'Puedes realizar el cambio de medio de pago en la sección Mi Perfil. Para ello, inicia tu sesión en la parte superior derecha de la web.',
          },
          {
            q:
              'Mi pregunta no fue solucionada aquí, ¿dónde puedo recibir ayuda?',
            a: [
              'Para cualquier información, duda o consulta, puedes recibir ayuda personalizada por los siguientes medios:',
              '',
              '   1. Llámanos al [(01) 311-5100](tel:+5113115100)',
              '',
              'Horario de atención al Cliente es el siguiente:',
              '',
              'De Lunes a Viernes: 7:00 a.m. a 9:00 p.m.',
              'Sábados, Domingos y Feriados: 7:00 a.m. a 1:00 p.m.',
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
    ecoID:            `https://${isProd ? '' : 'pre.'}ecoid.pe`,
    newsLetters:      `https://${isProd ? 'afv5trdj4i' : 'vq01ksb95d'}.execute-api.us-east-1.amazonaws.com/${isProd ? 'prod' : 'dev'}/userprofile/public/v1`,
    paymentTracker:   `https://${isProd ? 'su3l9d6w10' : '72q176wl1l'}.execute-api.us-east-1.amazonaws.com/${isProd ? 'prod' : 'dev'}/v1`,
    subsDniToken:     `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
    sentrySubs:       'https://81cfb3b862494fdaa0be4359e1423bdb@sentry.ec.pe/82',
    sentrySign:       'https://d78c55937db946dabdf2de8c488358ed@sentry.ec.pe/71',
    companyEmail:     `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
    tokenPayEfectivo: `https://${isProd ? '' : 'pre1a.'}services.pagoefectivo.pe/v1/authorizations`,
    cipPayEfectivo:   `https://${isProd ? '' : 'dev'}paywall.comerciosuscripciones.pe/notifications/api/cip_creation/`
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
    profile:      '/mi-perfil/?outputType=subscriptions',
    preguntas:    `/suscripcionesdigitales/faqs/${isProd ? '' : '?outputType=subscriptions'}`,
    bannerCorp:   `/suscripcionesdigitales/empresa/${isProd ? '' : '?outputType=subscriptions'}`,
    landingFia:   `/suscripcionesdigitales/fia/${isProd ? '?ref=auth-fia' : '?outputType=subscriptions&ref=auth-fia'}`,
    clubComercio: 'https://clubelcomercio.pe/?home=suscripciones_digitales',
    callCenter:   'tel:+5113115100',
    howItWork:    'https://cip.pagoefectivo.pe/CNT/QueEsPagoEfectivo.aspx',
    facebookKey:   isProd ? '258201114673936' : '861476194483517',
    googleKey:     isProd ? '595814524616-8iqsq2qh5nqamr8r0f8stp4bsanurh0l' : '1091574505245-hd5ma7kv3tnrbeic39sqaglpps83bt1o' // CONFIRMAR CON FRANZ KEY PROD
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
    verifyEmail:     'Verifique su correo electrónico. A este enviaremos su boleta.',
    verifyEmailPayEfec: 'Verifique su correo electrónico. A este enviaremos su boleta después de realizar el pago.',
    rememberRecurrency: 'El precio de la suscripción se cargará automáticamente en tu tarjeta cada mes o año, según el período elegido.',
    showSecure:      'Compra seguro. Esta web está protegida',
    textTerms:       'Acepto las condiciones de servicio, las políticas de privacidad, y estoy de acuerdo con la información.',
    whereCvv:        '¿Dónde está el CVV?',
    titlePay:        'Elige e ingresa tu método de pago',
    labelcNumber:    'Número de tarjeta',
    labelcExpire:    'Fecha de vencimiento',
    labelcCvv:       `CVV `,
    termsAccept:     `Acepto las `,
    termsConditions: 'condiciones de servicio',
    textTermsThe:    `, las `,
    textTermsPolices:'políticas de privacidad',
    textTermsAccord: `, y estoy de acuerdo con la información.`,
    knowBenefits:   'Conoce los beneficios del Club y descarga la aplicación en Google Play o App Store',
    downloadApps:    'Descarga la aplicación en Google Play o App Store',
    rememberBenefits:` con los accesos para Club El Comercio. No olvides que tu servicio de suscripción se renueva automáticamente.`,
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
    titleContinue:   'Para continuar se requiere completar',
    youCanSendEmail: 'Podrás reenviar nuevamente dentro de',
    textWinback:     '¡Tenemos un precio especial para ti!',
    titleCompany:    'Por favor envíanos tus datos para brindarte información sobre nuestras suscripciones corporativas.',
    successCompany:  'Tu mensaje ha sido enviado, nos pondremos en contacto contigo.',
    errorCompany:    'Ha ocurrido un error. Inténtelo más tarde',
    howItWork:       '¿Cómo funciona?',
    textBanca:       'Paga en BBVA, BCP, Interbank, Scotiabank, Banbif, Caja Arequipa Y Banco Pichincha, a travéz de la banca por internet o banca móvil en la opción pago de servicios.',
    textAgentes:     'Depósitos en efectivo via pago efectivo - Paga en BBVA, BCP, Interbank, Scotiabank, Banbif, Wester Union, Tambo+, kasnet Full Carga, Red Digital, Comercio Niubiz Multiservicios, Money Gram, Caja Arequipa, Disashop, Banco de la Nación, Caja Sullana, Caja los Andes, Caja Trujillo, Banco Azteca, Caja del Santa, Caja Raiz.'
  },
}

export { PropertiesCommon, PropertiesSite }
