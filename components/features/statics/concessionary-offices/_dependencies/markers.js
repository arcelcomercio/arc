const urlIcon =
  'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800'
const tpl = (name, district, address, phone, email) =>
  `<h4>${name}</h4><p itemprop="description">Distrito: <span>${district}</span><br>Dirección: <span>${address}</span><br>Teléfono: <span>${phone}</span><br>E-mail: <span>${email}</span></p>`

export default {
  ate: [
    {
      lat: -12.0761031,
      lng: -76.9890287,
      title: 'Oficina Concesionaria',
      distrito: 'ate',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Copytip S.R.L.',
          'Ate',
          'Jr. Los Aymaras 221 - Salamanca',
          '434-2356',
          'copytip@hotmail.com'
        ),
      },
    },
  ],
  callao: [
    {
      lat: -12.0137849,
      lng: -77.0962217,
      title: 'Oficina Concesionaria',
      distrito: 'callao',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Power Publicidad EIRL',
          'Callao',
          'Calle Las Azucenas 123 Urb. Juan Ingunza Valdivia',
          '484-2730',
          'wsantiagoa@hotmail.com'
        ),
      },
    },
  ],
  chorrillos: [
    {
      lat: -12.167495,
      lng: -77.0250916999999,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Aito Service S.A.C.',
          'Chorrillos',
          'Av. Alejandro Iglesias 472',
          '251-6459 / 467-4705',
          'aitoservicesac@hotmail.com'
        ),
      },
    },
    {
      lat: -12.1768243,
      lng: -77.0115134,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Comercial Matellini S.R.L.',
          'Chorrillos',
          'Av. P. De La República 1397 Matellini',
          '251-6829',
          'commatellini@yahoo.es'
        ),
      },
    },
    {
      lat: -12.2041021,
      lng: -77.0140323,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Inversiones Ichma SAC',
          'Chorrillos',
          'Alameda Los Cedros 275',
          '380-7371',
          'com@iichma.com;rmelgarejo@iichma.com;info@iichma.com'
        ),
      },
    },
  ],
  comas: [
    {
      lat: -11.9212048,
      lng: -77.0422085,
      title: 'Oficina Concesionaria',
      distrito: 'comas',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Megapoint Publicidad y Marketing E.I.R.L.',
          'Comas',
          'Av. Tupac Amaru 5313  Urb. Huaquillay',
          '537-8370',
          'agenciacomas@megapoint.com.pe;gmaldonado@megapoint.com.pe'
        ),
      },
    },
  ],
  'jesus-maria': [
    {
      lat: -12.0741578,
      lng: -77.0513766,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Alcance Publicidad Soc. Comercial de Resp. Ltda.',
          'Jesús María',
          'Av. Gral. Garzón 1420',
          '423-3943 / 425-1586',
          'alcancecomercio1@yahoo.es;alcancecomercio2@yahoo.es'
        ),
      },
    },
    {
      lat: -12.0865447276757,
      lng: -77.0542028546333,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'T & S SAC Promotores Publicistas',
          'Jesús María',
          'Edificio Las Orquídeas 111 - Urb. Residencial San Felipe',
          '261-3790',
          'ts_sac@yahoo.es'
        ),
      },
    },
    {
      lat: -12.0753793,
      lng: -77.0470083,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Adomar Publicidad S.A.C.',
          'Comas',
          'Jr. Huáscar 1306 - 1308',
          '423-6818 / 654-3612',
          'adomar_comercio@hotmail.com;marlene_gl@hotmail.com'
        ),
      },
    },
  ],
  'la-molina': [
    {
      lat: -12.0633213,
      lng: -76.9458933999999,
      title: 'Oficina Concesionaria',
      distrito: 'lamolina',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Bocet Art S.A. Publicistas',
          'La Molina',
          'Av. Flora Tristán 946',
          '349-2885',
          'bocetart@gmail.com'
        ),
      },
    },
    {
      lat: -12.0825998,
      lng: -76.9281209,
      title: 'Oficina Concesionaria',
      distrito: 'lamolina',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'De la Divina Gracia S.R.L.',
          'La Molina',
          'Av. La Molina 2830 Interior B-19 C.C. Molicentro',
          '68-2289 / 368-0502',
          'deladivinagracia5409@gmail.com;mnb0706@gmail.com'
        ),
      },
    },
  ],
  'la-victoria': [
    {
      lat: -12.0654374,
      lng: -77.029766699999,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'A y N Publicidad y Servicios E.I.R.L.',
          'La Victoria',
          'Jr. Saenz Peña 451',
          '330-7659',
          'nacridel@hotmail.com'
        ),
      },
    },

    {
      lat: -12.0724945,
      lng: -77.0111814,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Diseño y Publicidad A&M S.R.L.',
          'La Victoria',
          'Av. Aviación 1155',
          '323-9942',
          'dispublicidad_aym@hotmail.com;irene_jmv@hotmail.com'
        ),
      },
    },
    {
      lat: -12.0805963,
      lng: -77.035207,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Maria Elizabeth Evanan Mendoza',
          'La Victoria',
          'Av. Nicolás Arriola 898 Int. 3 (Dentro del terminal Transportes Cromotex) Urb. Santa Catalina',
          '942793252',
          'publicidadlavictoria@gmail.com;genesisproductos1@gmail.com'
        ),
      },
    },
    {
      lat: -12.0819923,
      lng: -77.0235333,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Publimark Rosser E.I.R.L.',
          'La Victoria',
          'Jr. Rodolfo Beltran  184- Urb. Santa Catalina',
          '265-3553',
          'pbmrosser@hotmail.com;agenciaelcomercio@yahoo.es'
        ),
      },
    },
  ],
  lima: [
    {
      lat: -12.049735,
      lng: -77.0309459999999,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Di Tolla Pub y Mkt EIRL',
          'Lima',
          'Jr. Lampa 659',
          '715-1920 /715-1110',
          'titi@ditollapublicidad.com.pe;nelladtc@ditollapublicidad.com.pe'
        ),
      },
    },
    {
      lat: -12.0712095,
      lng: -77.0377209,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Impulso Empresa de Servicios SAC',
          'Lima',
          'Av. Arenales 680',
          '424-0086',
          'impulso5313@hotmail.com'
        ),
      },
    },
    {
      lat: -12.0672064,
      lng: -76.9896913,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Macpherson S.R.L.',
          'Lima',
          'Av. Oscar R. Benavides 1623',
          '4255015 / 4255333',
          'macphersonsrl@yahoo.com;publicidad@macpersonperu.com;macphersonsrl@gmail.com'
        ),
      },
    },
  ],
  lince: [
    {
      lat: -12.0906065,
      lng: -77.0325589,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Agencia de Servicios Empresariales El Administrador E.I.R.L.',
          'Lince',
          'Av. Petit Thouars 2702',
          '222-2035',
          'administrador_eirl@hotmail.com'
        ),
      },
    },
    {
      lat: -12.0829589,
      lng: -77.0357586,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Gstar E.I.R.L',
          'Lince',
          'Av. Arenales 1825',
          '230-9110',
          'agenciagstar@zoho.com'
        ),
      },
    },
    {
      lat: -12.0897407,
      lng: -77.0248548,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'F&M Publicidad y Sevicios SRL',
          'Lince',
          'Av. Las Begonias 2709',
          '422-8289 / 221-5312',
          'fympublicidad2007@gmail.com'
        ),
      },
    },
    {
      lat: -12.0872777,
      lng: -77.0427402,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Publicidad y Servicios Múltiples EIRL.',
          'Lince',
          'Jr. Mateo Pumacahua N° 2541',
          '471-4355',
          'psm_agencia@hotmail.com'
        ),
      },
    },
    {
      lat: -12.0856527,
      lng: -77.0334295,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'R&R Publiservice SAC.',
          'Lince',
          'Calle Risso Nro. 278  Int. 102',
          '266-0769',
          'ryr.publicidad1@gmail.com;ryr-publicidad@hotmail.com;ryr.publicidad3@gmail.com'
        ),
      },
    },
  ],
  'los-olivos': [
    {
      lat: -11.9777062,
      lng: -77.0722380999999,
      title: 'Oficina Concesionaria',
      distrito: 'losolivos',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Inversiones Generales Calle & Loli S.A.C.',
          'Los Olivos',
          'Av. Las Palmeras 5144',
          '523-9544',
          'lagri_loli@hotmail.com'
        ),
      },
    },
  ],
  miraflores: [
    {
      lat: -12.122639,
      lng: -77.011409,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'LGA Publicidad SAC',
          'Miraflores',
          'Ca. Luis Arias Schereiber 148 Of. 202 Aurora',
          '272-1133 / 266-4042',
          'informes@lgapublicidad.com;luzclementel@gmail.com'
        ),
      },
    },
    {
      lat: -12.118798,
      lng: -77.035207,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Mar Representaciones S.A.C.',
          'Miraflores',
          'Av. Pardo 620 Int. ST14',
          '447-6020 / 444-1299',
          'm.representaciones2010@gmail.com'
        ),
      },
    },
    {
      lat: -12.121996,
      lng: -77.0276658999999,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Perú Nexxos',
          'Miraflores',
          'Cal. Alcanfores Nro. 267 Int. 206',
          '445-8921',
          'perunexxos@hotmail.com;peruavisos1@hotmail.com;peruavisos2@hotmail.com'
        ),
      },
    },
    {
      lat: -12.115865,
      lng: -77.0429963,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Santa Bárbara Comunicaciones',
          'Miraflores',
          'Av. La Mar 416 - Santa Cruz',
          '421-6940',
          'jeen51@gmail.com'
        ),
      },
    },
  ],
  'pueblo-libre': [
    {
      lat: -12.0752582,
      lng: -77.063254,
      title: 'Oficina Concesionaria',
      distrito: 'pueblolibre',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Mora Publicidad y Representaciones SAC (SUCURSAL)',
          'Pueblo Libre',
          'Av. Sucre 493',
          '461-9260',
          'morasucre@gmail.com'
        ),
      },
    },
  ],
  'puente-piedra': [
    {
      lat: -11.8668758,
      lng: -77.0767788,
      title: 'Oficina Concesionaria',
      distrito: 'puentepiedra',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Markakev E.I.R.L.',
          'Puente Piedra',
          'Av. Buenos Aires 246',
          '548-8010',
          'markakev@hotmail.com'
        ),
      },
    },
  ],
  'san-juan-m': [
    {
      lat: -12.1570327,
      lng: -76.9728506999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanjuandemiraflores',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Grupo Valverde Salazar S.A.C',
          'San Juan de Miraflores',
          'Av. San Juan 1056',
          '450-2458',
          'avisos@grvssac.com;contacto@grvssac.com'
        ),
      },
    },
  ],
  'san-martin': [
    {
      lat: -12.0257279,
      lng: -77.0531209,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          '1811 E.I.R.L',
          'San Martín de Porres',
          'Av. Eduardo de Habich 293 Int. A Urb. Ingeniería',
          '483-1794 / 483-2358',
          '1811eirl@hotmail.com;1811eirl@gmail.com'
        ),
      },
    },
    {
      lat: -12.0319576,
      lng: -77.0725204,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'CR Publicidad & Servicios SAC',
          'San Martín de Porres',
          'Av. Perú 2473',
          '568-8036',
          'janypublicidad@hotmail.com'
        ),
      },
    },
    {
      lat: -11.9834815,
      lng: -77.058751,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Model Comunicaciones SAC',
          'San Martín de Porres',
          'Av. Gerardo Unger 4321',
          '485-6226 / 792-9653',
          'modelcomunicaciones@hotmail.com;wilfredo.quiroz@hotmail.com'
        ),
      },
    },
    {
      lat: -12.0124208,
      lng: -77.0797294,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Otorongo Ap S.A.C.',
          'San Martín de Porres',
          'Av. Tomás Valle con Av. Universitaria',
          '531-7624',
          'otorongo21@outlook.com'
        ),
      },
    },
  ],
  'san-borja': [
    {
      lat: -12.0905299,
      lng: -77.0029531999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanborja',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Cocchella Costa S.C.R.L.',
          'San Borja',
          'Av. Aviación 2491',
          '4759476 / 2255840',
          'cocchella_costa@yahoo.com;cocchella_costa2@yahoo.com'
        ),
      },
    },
    {
      lat: -12.0901269,
      lng: -76.9963669,
      title: 'Oficina Concesionaria',
      distrito: 'sanborja',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'San Miguel Service S.A.C.',
          'San Borja',
          'Av. San Luis 2006 Of.202-A',
          '224-6762',
          'sanmiguelpublicidad@yahoo.com'
        ),
      },
    },
  ],
  'san-isidro': [
    {
      lat: -12.0979448,
      lng: -77.0305200999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanisidro',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Laos & Asociados S.R.L.',
          'San Isidro',
          'Calle Manuel A. Fuentes 420, interior 101, San Isidro',
          '222-0494',
          'publilaos@gmail.com;publilaos@yahoo.es'
        ),
      },
    },
  ],
  'san-luis': [
    {
      lat: -12.0808576,
      lng: -76.9931136999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanluis',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Portofino Publicidad y Servicios EIRL',
          'San Luis',
          'Av. Canadá 3560 Urb. Villa Jardín',
          '435-6142 / 436-7359',
          'portofino_pps3@hotmail.com;portofino_publicidad@yahoo.es;portofino_publicidad@hotmail.com'
        ),
      },
    },
  ],
  'san-miguel': [
    {
      lat: -12.0752318,
      lng: -77.0818985999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanmiguel',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Inversiones & Servicios Chirirka E.I.R.L',
          'San Miguel',
          'Av. La Mar Nro. 2275 Int.201 (Centro Comercial Shopping Center San Miguel)',
          '658-9264',
          'chirirkaeirl@yahoo.com'
        ),
      },
    },
    {
      lat: -12.0670112,
      lng: -77.0974408999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanmiguel',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Publicidad y Representaciones EIRL',
          'San Miguel',
          'Av. Elmer J. Faucett 367 Urb. Maranga',
          '451-6040 / 451-3325',
          'ascyr@yahoo.com'
        ),
      },
    },
  ],
  'santa-anita': [
    {
      lat: -12.053663,
      lng: -76.9650169999999,
      title: 'Oficina Concesionaria',
      distrito: 'santaanita',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Piscis E.I.R.L.',
          'Santa Anita',
          'Los Ruiseñores 204 - A',
          '362-0298 / 362-7173',
          'piscis@speedy.com.pe;piscis-artes@hotmail.com - Srta. Karin Gonzales'
        ),
      },
    },
  ],
  surco: [
    {
      lat: -12.1087349,
      lng: -76.9726776999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'DLC Pride Publicity S.A.C.',
          'Santiago de Surco',
          'Jr. Cartavio 105 - Monterrico',
          '578-9332 / 993369765',
          'dlcpridepublicity@gmail.com'
        ),
      },
    },
    {
      lat: -12.1501472,
      lng: -76.9875018999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Distribuidora Sur Perú S.A.C.',
          'Santiago de Surco',
          'Av. Los Proceres 377',
          '274-0632',
          'disurpesa@yahoo.es;asistente@disurpesa.com;cflorez@disurpesa.com'
        ),
      },
    },
    {
      lat: -12.1112966,
      lng: -76.9928702999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Mora Publicidad y Representaciones S.A.C.',
          'Santiago de Surco',
          'Av. Primavera 120 Int. A Of. 213 y 214 - Urb. Chacarilla del Estanque',
          '219-5340 / 372-0325',
          'r.mora.publicidad@gmail.com;artesmora@gmail.com'
        ),
      },
    },
    {
      lat: -12.1461,
      lng: -76.9905297,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Perdro Fernando Yataco Tasaico',
          'Santiago de Surco',
          'Jr. Esteban Camere Nro. 136 Urb. San Roque',
          '274-7869',
          'fgintl010@gmail.com;amym2769@hotmail.com'
        ),
      },
    },
    {
      lat: -12.1281631,
      lng: -77.0000774,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Publimarines S.A.C.',
          'Santiago de Surco',
          'Calle Preciados 149 - 201',
          '448-7935',
          'publimarines_sac@hotmail.com;publimarines_julissa@hotmail.com'
        ),
      },
    },
  ],
  surquillo: [
    {
      lat: -12.1132861,
      lng: -77.0221199,
      title: 'Oficina Concesionaria',
      distrito: 'surquillo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Hs Publicidad SAC',
          'Surquillo',
          'Av. Angamos Este 913',
          '242-6613',
          'hspublicidadventas@gmail.com;hspublicidad@hotmail.com;hspublicidad@gmail.com'
        ),
      },
    },
  ],

  arequipa: [
    {
      lat: -16.396511,
      lng: -71.537783,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'AUREA PERU GROUP S.A.C.',
          'Arequipa',
          'CALLE BOLIVAR 202, CERCADO, AREQUIPA',
          '951993675 / 054-290206',
          'publicidad@aureaperu.pe'
        ),
      },
    },
    {
      lat: -16.403026,
      lng: -71.532139,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'JOBLAN SERVICIOS E.I.R.L.',
          'Arequipa',
          'CAL.NUEVA NRO. 320 URB. CERCADO (CERCA A RADIO MELODIA) AREQUIPA',
          '054-238931',
          'joblan_sanchez@hotmail.com'
        ),
      },
    },
    {
      lat: -16.395881,
      lng: -71.545153,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'KOMUNICA T PUBLICIDAD & MARKETING E.I.R.L.',
          'Arequipa',
          'AV. ZAMACOLA NRO. 202A (2DO PISO OFICINA 1) AREQUIPA',
          '054-324337 / 959070806 / 958792731',
          'anikajs@hotmail.com / komunicatpym@outlook.com'
        ),
      },
    },
    {
      lat: -16.3869496,
      lng: -71.5495363999999,
      title: 'Agencia de Publicidad',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'PUBLICIDAD & COMERCIO E.I.R.LTDA. - PUBLICOM E.I.R.LTDA.',
          'Cayma',
          'CAL.LOS ARCES NRO. 218 INT. 201 URB. LEON XXIII - AREQUIPA - CAYMA',
          '(054)274760 / 981-588-329 / 976991600',
          'daliazun@hotmail.com / publicidadycomercio@publicom.pe'
        ),
      },
    },
    {
      lat: -16.382857,
      lng: -71.545914,
      title: 'Agencia de Publicidad',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'COMERCIO PUBLICIDAD & MKT E.I.R.L.',
          'Cayma',
          'AV. CAYMA MZA. 5 LOTE. A INT. 2 URB. CAYMA',
          '994637633 / 054-314590',
          'comercio.publicidadymkt@gmail.com'
        ),
      },
    },
    {
      lat: -11.955867,
      lng: -77.052216,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'VOCERO PUBLICIDAD E.I.R.L.',
          'Alto Selva Alegre',
          'VILLA EL SOL MZA. L LOTE. 16 P.J. PAMPA DE POLANCO SECTOR (A 4 CDRAS. DE LA MUNICIPALIDAD) ALTO SELVA ALEGRE',
          '964532495',
          'vocero.masquepublicidad@gmail.com'
        ),
      },
    },
  ],
  sullana: [
    {
      lat: -4.889233,
      lng: -80.685406,
      title: 'Oficina Concesionaria',
      distrito: 'sullana',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'NUEVO NORTE EIRL',
          'Sullana',
          'CAL.UGARTECHE NRO. 490 PIURA - SULLANA - SULLANA',
          '073-502083 / 969937244 / RPC962210000',
          'radionuevonorte@hotmail.com / jocarrascof@hotmail.com'
        ),
      },
    },
  ],
  tumbes: [
    {
      lat: -3.564428,
      lng: -80.448716,
      title: 'Oficina Concesionaria',
      distrito: 'tumbes',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'JUNIOR RAMON CARRILLO INFANTE',
          'Tumbes',
          'AV. PROLONGACIÓN EL EJÉRCITO NRO. 338 BARRIO EL TABLAZO',
          '947038685',
          'juniorc20@hotmail.com'
        ),
      },
    },
  ],
  chimbote: [
    {
      lat: -9.074909,
      lng: -78.59631,
      title: 'Oficina Concesionaria',
      distrito: 'chimbote',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'PERÚ EN LÍNEA COMUNICACIONES SRL',
          'Chimbote',
          'JR. SAENZ PEÑA NRO. 298 INT. 303 CASCO URBANO (TERCER PISO) ANCASH - SANTA - CHIMBOTE',
          '959041300 / 043-200003 / 943488686',
          'agencia@peruenlinea.org'
        ),
      },
    },
  ],
  trujillo: [
    {
      lat: -8.082637,
      lng: -79.049979,
      title: 'Agencia de Publicidad',
      distrito: 'trujillo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'EXTERNA CONSULTING SAC',
          'Trujillo',
          'CAL.ALFONSO UGARTE NRO. 471 URB. CENTRO CIVICO LA LIBERTAD - TRUJILLO',
          '9798-00246',
          'david.velasquez@externaperu.com'
        ),
      },
    },
    {
      lat: -8.113862,
      lng: -79.023853,
      title: 'Oficina Concesionaria',
      distrito: 'trujillo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'FULL MARKETING CLASE S.A.C.',
          'Trujillo',
          'AV. ESPAÑA 2155 INT. 208 - TRUJILLO',
          '950-209648 / 943814678 / (044)206680',
          'fullmarketingcardenas@outlook.com;fullmktclase@gmail.com'
        ),
      },
    },
    {
      lat: -8.10846,
      lng: -79.014518,
      title: 'Oficina Concesionaria',
      distrito: 'trujillo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'BANGOO AGENCIA DE COMUNICACIONES & RED PUBLICITARIA EMPRESARIAL S.A.C.',
          'Trujillo',
          'CAL. RAUL PORRAS BARRENECHEA NRO. 664 URB. PALERMO, TRUJILLO',
          '44-654020 / 992857778',
          'gerencia@bangooagency.com/ tatianapuelles@bangooagency.com'
        ),
      },
    },
  ],
  chiclayo: [
    {
      lat: -6.780845,
      lng: -79.844354,
      title: 'Agencia de Publicidad',
      distrito: 'chiclayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'SERVICIOS GENERALES PUBLIKA2 E.I.R.L',
          'Chiclayo',
          'CALLE LOS SAUCES 566 URB. SANTA VICTORIA - CHICLAYO',
          '994636765',
          'malenatimarchi@hotmail.com'
        ),
      },
    },
    {
      lat: -6.771464,
      lng: -79.839838,
      title: 'Agencia de Publicidad',
      distrito: 'chiclayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'Inversiones Zeus SAC',
          'Lambayeque',
          'PJ. WOYKE NRO. 179 INT. 204 CENTRO DE CHICLAYO  LAMBAYEQUE - CHICLAYO',
          '074-235914 / 978434124',
          'inversiones_zeus_cix@hotmail.com'
        ),
      },
    },
    {
      lat: -6.771464,
      lng: -79.839838,
      title: 'Oficina Concesionaria',
      distrito: 'chiclayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'DISTRIBUCIÓN DE PUBLICACIONES AYALA',
          'Chiclayo',
          'AV. ORIENTE 183  URB. SAN JUAN CHICLAYO',
          '979147716 / 949947048',
          'x.joseluis@gmail.com;agencia.dpa@gmail.com'
        ),
      },
    },
  ],
  piura: [
    {
      lat: -5.191535,
      lng: -80.653645,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'ISMENIA MARGOT OROZCO DE GONZALES',
          'Piura',
          'MZA. C2 LOTE. 10 URB. LOS FICUS 2 ETAPA PIURA',
          '990999428',
          'morozco_46@hotmail.com'
        ),
      },
    },
    {
      lat: -5.189187,
      lng: -80.606274,
      title: 'Oficina Concesionaria',
      distrito: 'piura',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'LUCE PUBLICIDAD Y PRODUCCIONES E.I.R.L.',
          'Piura',
          'CAL.LOS GERANIOS MZA. N LOTE. 4 DPTO. 302, URB. MIRAFLORES',
          '073 347665 / 994637601',
          'lucepublicidadeirl@gmail.com'
        ),
      },
    },
    {
      lat: -8.082637,
      lng: -79.049979,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'MASS MEDIA NORTE EIRL',
          'Piura',
          'JR. AYACUCHO N° 713, PIURA',
          '969375683 / 948932450 / 073 - 541687',
          'yoslizano@hotmail.com'
        ),
      },
    },
    {
      lat: -5.195068,
      lng: -80.62611,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'KOMUNICA2 PUBLICIDAD Y MARKETING E.I.R.L.',
          'Piura',
          'JR. CALLAO 330, OF. R, (2DO PISO) C.C. LA CHOLITA, PIURA',
          '073-325192 / 995073976',
          'komunica2publicidad@gmail.com / komunica2gerencia@gmail.com / komunica2artes@gmail.com'
        ),
      },
    },
  ],
  huancayo: [
    {
      lat: -12.058502,
      lng: -75.213892,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'COPIAS ALFA EIRL(SUCURSAL)',
          'Huancayo',
          'JR. JULIO C TELLO NRO. 296 URB. EL TAMBO HUANCAYO',
          '964 488 501 / 064-419085',
          'copiasalfahyo@gmail.com'
        ),
      },
    },
    {
      lat: -12.06313,
      lng: -75.208185,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'P & M SOLUTIONS SAC',
          'Huancayo',
          'AV. FERROCARRIL  NRO 404, HUANCAYO',
          '999 899 831',
          'publicidadpyms@gmail.com'
        ),
      },
    },
    {
      lat: -12.066517,
      lng: -75.206486,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'VIOLETA RAMOS CAMACLLANQUI',
          'Chilca',
          'AV. 9 DE DICIEMBRE NRO. 787A (PUERTAS 787A Y 787B) CHILCA',
          '#958504013',
          'boticaramos2003@yahoo.es'
        ),
      },
    },
    {
      lat: -12.086407,
      lng: -75.208515,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'MAGDA NELLY PALOMINO GALARZA',
          'Huancayo',
          'AV. GIRALDEZ NRO. 392 (ESQUINA CON FERROCARRIL) HUANCAYO',
          'RPM#981 784 758',
          'carol_dian20@hotmail.com'
        ),
      },
    },
  ],
  tacna: [
    {
      lat: -18.012454,
      lng: -70.252541,
      title: 'Oficina Concesionaria',
      distrito: 'tacna',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'ALFEREZ CRUZ GLORIA AGUEDA (IAN RIVEREA.NET)',
          'Tacna',
          'CAL.INCLAN NRO. 341 (ESPALDAS DE LA CAJA MUNICIPAL DE TACNA) TACNA',
          '934046431 / 956477621',
          'manuelriv6@hotmail.com/concesionariotacnasmart@gmail.com'
        ),
      },
    },
  ],
  huanuco: [
    {
      lat: -9.929089,
      lng: -76.238772,
      title: 'Oficina Concesionaria',
      distrito: 'huanuco',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'TANIA ISABEL QUINTANA LOYA',
          'Huánuco',
          'JR. 28 DE JULIO N°1030 2DO PISO, HUANUCO',
          '954 178 072 / #995 722 550 / 968 689 730',
          'tiquintanal@gmail.com'
        ),
      },
    },
  ],
  ayacucho: [
    {
      lat: -9.929089,
      lng: -76.238772,
      title: 'Oficina Concesionaria',
      distrito: 'ayacucho',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'CENTRO SUPERIOR TECNOLOGICO Y SISTEMAS – PERÚ E.I.R.L.',
          'Huamanga',
          'JR. CUSCO NRO. 303 URB. CERCADO AYACUCHO - HUAMANGA',
          '965 835 151',
          'cestys2017_publicidad@outlook.es'
        ),
      },
    },
  ],
  ica: [
    {
      lat: -14.063349,
      lng: -75.729805,
      title: 'Oficina Concesionaria',
      distrito: 'ica',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'EDWARD QUISPE CONTRERAS (ICA GRAF)',
          'Ica',
          'CAL.TACNA NRO. 130 INT. 28 ASOC. COMERC PLAZA BUNKER (1ER PISO- EN EL 3ER PASADIZO) ICA',
          '056-225418 / 943 631 285',
          'publicidad.icagraf@gmail.com'
        ),
      },
    },
  ],
  puno: [
    {
      lat: -15.837055,
      lng: -70.033613,
      title: 'Oficina Concesionaria',
      distrito: 'puno',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'PUBLIMAS COMUNICACIÓN Y MARKETING E.I.R.L.',
          'Tacna',
          'JR. TACNA 121, INT. 516, PUNO',
          '950727666 / 951960688 / (051) 363515',
          'maribel_cabreraq@yahoo.es'
        ),
      },
    },
    {
      lat: -15.493769,
      lng: -70.135097,
      title: 'Sucursal',
      distrito: 'puno',
      icon: urlIcon,
      infoWindow: {
        content: tpl(
          'PUBLIMAS COMUNICACIÓN Y MARKETING E.I.R.L.',
          'Tacna',
          'JR. JAUREGUI NRO. 289 TDA. 103 (EN LA PLAZA DE ARMAS DE JULIACA) PUNO - SAN ROMAN - JULIACA',
          '950727666 / 951960688 / (051) 363515',
          'maribel_cabreraq@yahoo.es'
        ),
      },
    },
  ],
}
