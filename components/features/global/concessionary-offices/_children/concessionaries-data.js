const zonanorte = [
  'Comas',
  'Los Olivos',
  'Puente Piedra',
  'San Martin de Porres',
]
const zonacentro = [
  'Jesus Maria',
  'La Victoria',
  'Lima',
  'Lince',
  'Pueblo Libre',
  'San Borja',
  'San Isidro',
  'San Luis',
]

const zonaeste = ['Ate', 'La Molina', 'Santa Anita']
const zonaoeste = ['Miraflores', 'San Miguel']
const zonasur = [
  'Chorrillos',
  'San Juan de Miraflores',
  'Santiago de Surco',
  'Surquillo',
]
const callao = ['Callao']
const vertodas = [
  'Ate',
  'Callao',
  'Chorrillos',
  'Comas',
  'Jesus Maria',
  'La Molina',
  'La Victoria',
  'Lima',
  'Lince',
  'Los Olivos',
  'Miraflores',
  'Pueblo Libre',
  'Puente Piedra',
  'San Borja',
  'San Isidro',
  'San Juan de Miraflores',
  'San Luis',
  'San Martin de Porres',
  'San Miguel',
  'Santa Anita',
  'Santiago de Surco',
  'Surquillo',
]

const markers = [{}]

//document.addEventListener("DOMContentLoaded", function (event) {
window.addEventListener('load', function(event) {
  map_lima = new GMaps({
    div: '#mapalima',
    lat: -12.055345316962327,
    lng: -77.04518530000001,
    zoom: 12,
  })

  this._ate = function() {
    map_lima.addMarker({
      lat: -12.0761031,
      lng: -76.9890287,
      title: 'Oficina Concesionaria',
      distrito: 'ate',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Copytip S.R.L.</h4><p>Distrito: <span>Ate</span><br>Dirección: <span>Jr. Los Aymaras 221 - Salamanca</span><br>Teléfono: <span>434-2356</span><br>E-mail: <span>copytip@hotmail.com</span></p>',
      },
    })
  }
  this._callao = function() {
    map_lima.addMarker({
      lat: -12.0137849,
      lng: -77.0962217,
      title: 'Oficina Concesionaria',
      distrito: 'callao',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Power Publicidad EIRL</h4><p>Distrito: <span>Callao</span><br>Dirección: <span>Calle Las Azucenas 123 Urb. Juan Ingunza Valdivia </span><br>Teléfono: <span>484-2730</span><br>E-mail: <span>wsantiagoa@hotmail.com</span></p>',
      },
    })
  }
  this._chorrillos = function() {
    map_lima.addMarker({
      lat: -12.167495,
      lng: -77.0250916999999,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Aito Service S.A.C.</h4><p>Distrito: <span>Chorrillos</span><br>Dirección: <span>Av. Alejandro Iglesias 472</span><br>Teléfono: <span>251-6459 / 467-4705 </span><br>E-mail: <span>aitoservicesac@hotmail.com </span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.1768243,
      lng: -77.0115134,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Comercial Matellini S.R.L.</h4><p>Distrito: <span>Chorrillos</span><br>Dirección: <span>Av. P. De La República 1397 Matellini</span><br>Teléfono: <span>251-6829</span><br>E-mail: <span>commatellini@yahoo.es</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.2041021,
      lng: -77.0140323,
      title: 'Oficina Concesionaria',
      distrito: 'chorrillos',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Inversiones Ichma SAC</h4><p>Distrito: <span>Chorrillos</span><br>Dirección: <span>Alameda Los Cedros 275</span><br>Teléfono: <span>380-7371</span><br>E-mail: <span>com@iichma.com;rmelgarejo@iichma.com;info@iichma.com</span></p>',
      },
    })
  }
  this._comas = function() {
    map_lima.addMarker({
      lat: -11.9212048,
      lng: -77.0422085,
      title: 'Oficina Concesionaria',
      distrito: 'comas',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Megapoint Publicidad y Marketing E.I.R.L.</h4><p>Distrito: <span>Comas</span><br>Dirección: <span>Av. Tupac Amaru 5313  Urb. Huaquillay</span><br>Teléfono: <span>537-8370</span><br>E-mail: <span>agenciacomas@megapoint.com.pe;gmaldonado@megapoint.com.pe</span></p>',
      },
    })
  }
  this._jesusmaria = function() {
    map_lima.addMarker({
      lat: -12.0741578,
      lng: -77.0513766,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Alcance Publicidad Soc. Comercial de Resp. Ltda.</h4><p>Distrito: <span>Jesús María</span><br>Dirección: <span>Av. Gral. Garzón 1420</span><br>Teléfono: 423-3943 / 425-1586<span></span><br>E-mail: <span>alcancecomercio1@yahoo.es;alcancecomercio2@yahoo.es</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0865447276757,
      lng: -77.0542028546333,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>T & S SAC Promotores Publicistas</h4><p>Distrito: <span>Jesús María</span><br>Dirección: <span>Edificio Las Orquídeas 111 - Urb. Residencial San Felipe</span><br>Teléfono: <span>261-3790</span><br>E-mail: <span>ts_sac@yahoo.es</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0753793,
      lng: -77.0470083,
      title: 'Oficina Concesionaria',
      distrito: 'jesusmaria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Adomar Publicidad S.A.C.</h4><p>Distrito: <span>Jesús María</span><br>Dirección: <span>Jr. Huáscar 1306 - 1308</span><br>Teléfono: <span>423-6818 / 654-3612</span><br>E-mail: <span>adomar_comercio@hotmail.com;marlene_gl@hotmail.com</span></p>',
      },
    })
  }
  this._lamolina = function() {
    map_lima.addMarker({
      lat: -12.0633213,
      lng: -76.9458933999999,
      title: 'Oficina Concesionaria',
      distrito: 'lamolina',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Bocet Art S.A. Publicistas</h4><p>Distrito: <span>La Molina</span><br>Dirección: <span>Av. Flora Tristán 946</span><br>Teléfono: <span>349-2885</span><br>E-mail: <span>bocetart@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0825998,
      lng: -76.9281209,
      title: 'Oficina Concesionaria',
      distrito: 'lamolina',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>De la Divina Gracia S.R.L.</h4><p>Distrito: <span>La Molina</span><br>Dirección: <span>Av. La Molina 2830 Interior B-19 C.C. Molicentro </span><br>Teléfono: <span>368-2289 / 368-0502</span><br>E-mail: <span>deladivinagracia5409@gmail.com;mnb0706@gmail.com</span></p>',
      },
    })
  }
  this._lavictoria = function() {
    map_lima.addMarker({
      lat: -12.0654374,
      lng: -77.029766699999,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>A y N Publicidad y Servicios E.I.R.L.</h4><p>Distrito: <span>La Victoria</span><br>Dirección: <span>Jr. Saenz Peña 451</span><br>Teléfono: <span>330-7659</span><br>E-mail: <span>nacridel@hotmail.com</span></p>',
      },
    })

    map_lima.addMarker({
      lat: -12.0724945,
      lng: -77.0111814,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Diseño y Publicidad A&M S.R.L.</h4><p>Distrito: <span>La Victoria</span><br>Dirección: <span>Av. Aviación 1155</span><br>Teléfono: <span>323-9942 </span><br>E-mail: <span>dispublicidad_aym@hotmail.com;irene_jmv@hotmail.com </span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0805963,
      lng: -77.035207,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Maria Elizabeth Evanan Mendoza </h4><p>Distrito: <span>La Victoria</span><br>Dirección: <span>Av. Nicolás Arriola 898 Int. 3 (Dentro del terminal Transportes Cromotex) Urb. Santa Catalina</span><br>Teléfono: <span>942793252</span><br>E-mail: <span>publicidadlavictoria@gmail.com;genesisproductos1@gmail.com </span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0819923,
      lng: -77.0235333,
      title: 'Oficina Concesionaria',
      distrito: 'lavictoria',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Publimark Rosser E.I.R.L.</h4><p>Distrito: <span>La Victoria</span><br>Dirección: <span>Jr. Rodolfo Beltran  184- Urb. Santa Catalina</span><br>Teléfono: <span>265-3553</span><br>E-mail: <span>pbmrosser@hotmail.com;agenciaelcomercio@yahoo.es</span></p>',
      },
    })
  }
  this._lima = function() {
    map_lima.addMarker({
      lat: -12.049735,
      lng: -77.0309459999999,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Di Tolla Pub y Mkt EIRL</h4><p>Distrito: <span>Lima</span><br>Dirección: <span>Jr. Lampa 659</span><br>Teléfono: <span>715-1920 /715-1110</span><br>Email: <span>titi@ditollapublicidad.com.pe;nelladtc@ditollapublicidad.com.pe</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0712095,
      lng: -77.0377209,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Impulso Empresa de Servicios SAC</h4><p>Distrito: <span>Lima</span><br>Dirección: <span>Av. Arenales 680</span><br>Teléfono: <span>424-0086</span><br>E-mail: <span>impulso5313@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0672064,
      lng: -76.9896913,
      title: 'Oficina Concesionaria',
      distrito: 'lima',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Macpherson S.R.L.</h4><p>Distrito: <span>Lima</span><br>Dirección: <span>Av. Oscar R. Benavides 1623</span><br>Teléfono: <span>4255015 / 4255333</span><br>E-mail: <span>macphersonsrl@yahoo.com;publicidad@macpersonperu.com;macphersonsrl@gmail.com</span></p>',
      },
    })
  }
  this._lince = function() {
    map_lima.addMarker({
      lat: -12.0906065,
      lng: -77.0325589,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Agencia de Servicios Empresariales El Administrador E.I.R.L.</h4><p>Distrito: <span>Lince</span><br>Dirección: <span>Av. Petit Thouars 2702</span><br>Teléfono: <span>222-2035</span><br>E-mail: <span>administrador_eirl@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0829589,
      lng: -77.0357586,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Gstar E.I.R.L</h4><p>Distrito: <span>Lince</span><br>Dirección: <span>Av. Arenales 1825</span><br>Teléfono: <span>230-9110</span><br>E-mail: <span>agenciagstar@zoho.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0897407,
      lng: -77.0248548,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>F&M Publicidad y Sevicios SRL</h4><p>Distrito: <span>Lince</span><br>Dirección: <span>Av. Las Begonias 2709</span><br>Teléfono: <span>422-8289 / 221-5312</span><br>E-mail: <span>fympublicidad2007@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0872777,
      lng: -77.0427402,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Publicidad y Servicios Múltiples EIRL.</h4><p>Distrito: <span>Lince</span><br>Dirección: <span>Jr. Mateo Pumacahua N° 2541</span><br>Teléfono: <span>471-4355</span><br>E-mail: <span>psm_agencia@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0856527,
      lng: -77.0334295,
      title: 'Oficina Concesionaria',
      distrito: 'lince',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>R&R Publiservice SAC.</h4><p>Distrito: <span>Lince</span><br>Dirección: <span>Calle Risso Nro. 278  Int. 102</span><br>Teléfono: <span>266-0769</span><br>E-mail: <span>ryr.publicidad1@gmail.com;ryr-publicidad@hotmail.com;ryr.publicidad3@gmail.com</span></p>',
      },
    })
  }
  this._losolivos = function() {
    map_lima.addMarker({
      lat: -11.9777062,
      lng: -77.0722380999999,
      title: 'Oficina Concesionaria',
      distrito: 'losolivos',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Inversiones Generales Calle & Loli S.A.C.</h4><p>Distrito: <span>Los Olivos</span><br>Dirección: <span>Av. Las Palmeras 5144</span><br>Teléfono: <span>523-9544</span><br>E-mail: <span>lagri_loli@hotmail.com</span></p>',
      },
    })
  }
  this._miraflores = function() {
    map_lima.addMarker({
      lat: -12.122639,
      lng: -77.011409,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>LGA Publicidad SAC</h4><p>Distrito: <span>Miraflores</span><br>Dirección: <span>Ca. Luis Arias Schereiber 148 Of. 202 Aurora</span><br>Teléfono: <span>272-1133 / 266-4042</span><br>E-mail: <span>informes@lgapublicidad.com;luzclementel@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.118798,
      lng: -77.035207,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Mar Representaciones S.A.C.</h4><p>Distrito: <span>Miraflores</span><br>Dirección: <span>Av. Pardo 620 Int. ST14 </span><br>Teléfono: <span>447-6020 / 444-1299</span><br>E-mail: <span>m.representaciones2010@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.121996,
      lng: -77.0276658999999,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Perú Nexxos</h4><p>Distrito: <span>Miraflores</span><br>Dirección: <span>Cal. Alcanfores Nro. 267 Int. 206</span><br>Teléfono: <span>445-8921</span><br>E-mail: <span>perunexxos@hotmail.com;peruavisos1@hotmail.com;peruavisos2@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.115865,
      lng: -77.0429963,
      title: 'Oficina Concesionaria',
      distrito: 'miraflores',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Santa Bárbara Comunicaciones</h4><p>Distrito: <span>Miraflores</span><br>Dirección: <span>Av. La Mar 416 - Santa Cruz</span><br>Teléfono: <span>421-6940</span><br>E-mail: <span>jeen51@gmail.com</span></p>',
      },
    })
  }
  this._pueblolibre = function() {
    map_lima.addMarker({
      lat: -12.0752582,
      lng: -77.063254,
      title: 'Oficina Concesionaria',
      distrito: 'pueblolibre',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Mora Publicidad y Representaciones SAC (SUCURSAL)</h4><p>Distrito: <span>Pueblo Libre</span><br>Dirección: <span>Av. Sucre 493</span><br>Teléfono: <span>461-9260</span><br>E-mail: <span>morasucre@gmail.com</span></p>',
      },
    })
  }
  this._puentepiedra = function() {
    map_lima.addMarker({
      lat: -11.8668758,
      lng: -77.0767788,
      title: 'Oficina Concesionaria',
      distrito: 'puentepiedra',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Markakev E.I.R.L.</h4><p>Distrito: <span>Puente Piedra</span><br>Dirección: <span>Av. Buenos Aires 246 </span><br>Teléfono: <span>548-8010</span><br>E-mail: <span>markakev@hotmail.com</span></p>',
      },
    })
  }
  this._sanjuandemiraflores = function() {
    map_lima.addMarker({
      lat: -12.1570327,
      lng: -76.9728506999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanjuandemiraflores',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Grupo Valverde Salazar S.A.C</h4><p>Distrito: <span>San Juan de Miraflores</span><br>Dirección: <span>Av. San Juan 1056</span><br>Teléfono: <span> 450-2458</span><br>E-mail: <span>avisos@grvssac.com;contacto@grvssac.com</span></p>',
      },
    })
  }
  this._sanmartindeporres = function() {
    map_lima.addMarker({
      lat: -12.0257279,
      lng: -77.0531209,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>1811 E.I.R.L</h4><p>Distrito: <span>San Martín de Porres</span><br>Dirección: <span>Av. Eduardo de Habich 293 Int. A Urb. Ingeniería</span><br>Teléfono: <span>483-1794 / 483-2358 </span><br>E-mail: <span>1811eirl@hotmail.com;1811eirl@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0319576,
      lng: -77.0725204,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>CR Publicidad & Servicios SAC</h4><p>Distrito: <span>San Martín de Porres</span><br>Dirección: <span>Av. Perú 2473</span><br>Teléfono: <span>568-8036</span><br>E-mail: <span>janypublicidad@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -11.9834815,
      lng: -77.058751,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Model Comunicaciones SAC</h4><p>Distrito: <span>San Martín de Porres</span><br>Dirección: <span>Av. Gerardo Unger 4321</span><br>Teléfono: <span> 485-6226 / 792-9653</span><br>E-mail: <span>modelcomunicaciones@hotmail.com;wilfredo.quiroz@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0124208,
      lng: -77.0797294,
      title: 'Oficina Concesionaria',
      distrito: 'sanmartindeporres',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Otorongo Ap S.A.C.</h4><p>Distrito: <span>San Martín de Porres</span><br>Dirección: <span>Av. Tomás Valle con Av. Universitaria</span><br>Teléfono: <span>531-7624 </span><br>E-mail: <span>otorongo21@outlook.com </span></p>',
      },
    })
  }
  this._sanborja = function() {
    map_lima.addMarker({
      lat: -12.0905299,
      lng: -77.0029531999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanborja',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Cocchella Costa S.C.R.L.</h4><p>Distrito: <span>San Borja</span><br>Dirección: <span>Av. Aviación 2491</span><br>Teléfono: <span>4759476 / 2255840 </span><br>E-mail: <span>cocchella_costa@yahoo.com;cocchella_costa2@yahoo.com</span></p>',
      },
    })

    map_lima.addMarker({
      lat: -12.0901269,
      lng: -76.9963669,
      title: 'Oficina Concesionaria',
      distrito: 'sanborja',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>San Miguel Service S.A.C.</h4><p>Distrito: <span>San Borja</span><br>Dirección: <span>Av. San Luis 2006 Of.202-A</span><br>Teléfono: <span>224-6762 </span><br>E-mail: <span>sanmiguelpublicidad@yahoo.com </span></p>',
      },
    })
  }
  this._sanisidro = function() {
    map_lima.addMarker({
      lat: -12.0979448,
      lng: -77.0305200999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanisidro',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Laos & Asociados S.R.L.</h4><p>Distrito: <span>San Isidro</span><br>Dirección: <span>Calle Manuel A. Fuentes 420, interior 101, San Isidro </span><br>Teléfono: <span>222-0494 </span><br>E-mail: <span>publilaos@gmail.com;publilaos@yahoo.es </span></p>',
      },
    })
  }

  this._sanluis = function() {
    map_lima.addMarker({
      lat: -12.0808576,
      lng: -76.9931136999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanluis',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Portofino Publicidad y Servicios EIRL</h4><p>Distrito: <span>San Luis</span><br>Dirección: <span>Av. Canadá 3560 Urb. Villa Jardín</span><br>Teléfono: <span>435-6142 / 436-7359</span><br>E-mail: <span>portofino_pps3@hotmail.com;portofino_publicidad@yahoo.es;portofino_publicidad@hotmail.com</span></p>',
      },
    })
  }

  this._sanmiguel = function() {
    map_lima.addMarker({
      lat: -12.0752318,
      lng: -77.0818985999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanmiguel',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Inversiones & Servicios Chirirka E.I.R.L </h4><p>Distrito: <span>San Miguel</span><br>Dirección: <span>Av. La Mar Nro. 2275 Int.201 (Centro Comercial Shopping Center San Miguel)</span><br>Teléfono: <span>658-9264</span><br>E-mail: <span>chirirkaeirl@yahoo.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.0670112,
      lng: -77.0974408999999,
      title: 'Oficina Concesionaria',
      distrito: 'sanmiguel',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Publicidad y Representaciones EIRL</h4><p>Distrito: <span>San Miguel</span><br>Dirección: <span>Av. Elmer J. Faucett 367 Urb. Maranga</span><br>Teléfono: <span>451-6040 / 451-3325</span><br>E-mail: <span>ascyr@yahoo.com</span></p>',
      },
    })
  }

  this._santaanita = function() {
    map_lima.addMarker({
      lat: -12.053663,
      lng: -76.9650169999999,
      title: 'Oficina Concesionaria',
      distrito: 'santaanita',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Piscis E.I.R.L. </h4><p>Distrito: <span>Santa Anita</span><br>Dirección: <span>Los Ruiseñores 204 - A</span><br>Teléfono: <span>362-0298 / 362-7173</span><br>E-mail: <span>piscis@speedy.com.pe;piscis-artes@hotmail.com - Srta. Karin Gonzales</span></p>',
      },
    })
  }

  this._santiagodesurco = function() {
    map_lima.addMarker({
      lat: -12.1087349,
      lng: -76.9726776999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>DLC Pride Publicity S.A.C.</h4><p>Distrito: <span>Santiago de Surco</span><br>Dirección: <span>Jr. Cartavio 105 - Monterrico</span><br>Teléfono: <span>578-9332 / 993369765</span><br>E-mail: <span>dlcpridepublicity@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.1501472,
      lng: -76.9875018999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Distribuidora Sur Perú S.A.C.</h4><p>Distrito: <span>Santiago de Surco</span><br>Dirección: <span>Av. Los Proceres 377</span><br>Teléfono: <span>274-0632</span><br>E-mail: <span>disurpesa@yahoo.es;asistente@disurpesa.com;cflorez@disurpesa.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.1112966,
      lng: -76.9928702999999,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Mora Publicidad y Representaciones S.A.C.</h4><p>Distrito: <span>Santiago de Surco</span><br>Dirección: <span>Av. Primavera 120 Int. A Of. 213 y 214 - Urb. Chacarilla del Estanque</span><br>Teléfono: <span>219-5340 / 372-0325</span><br>E-mail: <span>r.mora.publicidad@gmail.com;artesmora@gmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.1461,
      lng: -76.9905297,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Perdro Fernando Yataco Tasaico</h4><p>Distrito: <span>Santiago de Surco</span><br>Dirección: <span>Jr. Esteban Camere Nro. 136 Urb. San Roque</span><br>Teléfono: <span>274-7869</span><br>E-mail: <span>fgintl010@gmail.com;amym2769@hotmail.com</span></p>',
      },
    })
    map_lima.addMarker({
      lat: -12.1281631,
      lng: -77.0000774,
      title: 'Oficina Concesionaria',
      distrito: 'santiagodesurco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Publimarines S.A.C.</h4><p>Distrito: <span>Santiago de Surco</span><br>Dirección: <span>Calle Preciados 149 - 201</span><br>Teléfono: <span>448-7935</span><br>E-mail: <span>publimarines_sac@hotmail.com;publimarines_julissa@hotmail.com</span></p>',
      },
    })
  }
  this._surquillo = function() {
    map_lima.addMarker({
      lat: -12.1132861,
      lng: -77.0221199,
      title: 'Oficina Concesionaria',
      distrito: 'surquillo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Hs Publicidad SAC</h4><p>Distrito: <span>Surquillo</span><br>Dirección: <span> Av. Angamos Este 913</span><br>Teléfono: <span>242-6613</span><br>E-mail: <span>hspublicidadventas@gmail.com;hspublicidad@hotmail.com;hspublicidad@gmail.com</span></p>',
      },
    })
  }

  mapa_peru = new GMaps({
    div: '#mapaperu',
    lat: -9.31490900980779,
    lng: -74.99041654999996,
    zoom: 5,
  })

  this._arequipa = function() {
    mapa_peru.addMarker({
      lat: -16.396511,
      lng: -71.537783,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>AUREA PERU GROUP S.A.C.</h4><p>Distrito: <span>Arequipa</span><br>Dirección: <span>CALLE BOLIVAR 202, CERCADO, AREQUIPA</span><br>Teléfono: <span>951993675 / 054-290206</span><br>E-mail: <span>publicidad@aureaperu.pe </span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -16.403026,
      lng: -71.532139,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>JOBLAN SERVICIOS E.I.R.L.</h4><p>Distrito: <span>Arequipa</span><br>Dirección: <span>CAL.NUEVA NRO. 320 URB. CERCADO (CERCA A RADIO MELODIA) AREQUIPA</span><br>Teléfono: <span>054-238931</span><br>E-mail: <span>joblan_sanchez@hotmail.com </span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -16.395881,
      lng: -71.545153,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>KOMUNICA T PUBLICIDAD & MARKETING E.I.R.L.</h4><p>Distrito: <span>Arequipa</span><br>Dirección: <span>AV. ZAMACOLA NRO. 202A (2DO PISO OFICINA 1) AREQUIPA</span><br>Teléfono: <span>054-324337 / 959070806 / 958792731</span><br>E-mail: <span>anikajs@hotmail.com / komunicatpym@outlook.com </span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -16.3869496,
      lng: -71.5495363999999,
      title: 'Agencia de Publicidad',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>PUBLICIDAD & COMERCIO E.I.R.LTDA. - PUBLICOM E.I.R.LTDA.</h4><p>Distrito: <span>Cayma</span><br>Dirección: <span>CAL.LOS ARCES NRO. 218 INT. 201 URB. LEON XXIII - AREQUIPA - CAYMA</span><br>Teléfono: <span>(054)274760 / 981-588-329 / 976991600 </span><br>E-mail: <span>daliazun@hotmail.com / publicidadycomercio@publicom.pe</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -16.382857,
      lng: -71.545914,
      title: 'Agencia de Publicidad',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>COMERCIO PUBLICIDAD & MKT E.I.R.L.</h4><p>Distrito: <span>Cayma</span><br>Dirección: <span>AV. CAYMA MZA. 5 LOTE. A INT. 2 URB. CAYMA </span><br>Teléfono: <span>994637633 / 054-314590 </span><br>E-mail: <span>comercio.publicidadymkt@gmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -11.955867,
      lng: -77.052216,
      title: 'Oficina Concesionaria',
      distrito: 'arequipa',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>VOCERO PUBLICIDAD E.I.R.L.</h4><p>Distrito: <span>Alto Selva Alegre</span><br>Dirección: <span>VILLA EL SOL MZA. L LOTE. 16 P.J. PAMPA DE POLANCO SECTOR (A 4 CDRAS. DE LA MUNICIPALIDAD) ALTO SELVA ALEGRE </span><br>Teléfono: <span>964532495 </span><br>E-mail: <span>vocero.masquepublicidad@gmail.com</span></p>',
      },
    })
  }
  this._sullana = function() {
    mapa_peru.addMarker({
      lat: -4.889233,
      lng: -80.685406,
      title: 'Oficina Concesionaria',
      distrito: 'sullana',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>NUEVO NORTE EIRL </h4><p>Distrito: <span>Sullana</span><br>Dirección: <span>CAL.UGARTECHE NRO. 490 PIURA - SULLANA - SULLANA</span><br>Teléfono: <span>073-502083 / 969937244 / RPC962210000</span><br>E-mail: <span>radionuevonorte@hotmail.com / jocarrascof@hotmail.com</span></p>',
      },
    })
  }
  this._tumbes = function() {
    mapa_peru.addMarker({
      lat: -3.564428,
      lng: -80.448716,
      title: 'Oficina Concesionaria',
      distrito: 'tumbes',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>JUNIOR RAMON CARRILLO INFANTE </h4><p>Distrito: <span>Tumbes</span><br>Dirección: <span>AV. PROLONGACIÓN EL EJÉRCITO NRO. 338 BARRIO EL TABLAZO</span><br>Teléfono: <span>947038685</span><br>E-mail: <span>juniorc20@hotmail.com</span></p>',
      },
    })
  }
  this._chimbote = function() {
    mapa_peru.addMarker({
      lat: -9.074909,
      lng: -78.59631,
      title: 'Oficina Concesionaria',
      distrito: 'chimbote',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>PERÚ EN LÍNEA COMUNICACIONES SRL </h4><p>Distrito: <span>Chimbote</span><br>Dirección: <span>JR. SAENZ PEÑA NRO. 298 INT. 303 CASCO URBANO (TERCER PISO) ANCASH - SANTA - CHIMBOTE</span><br>Teléfono: <span>959041300 / 043-200003 / 943488686</span><br>E-mail: <span>agencia@peruenlinea.org</span></p>',
      },
    })
  }
  this._trujillo = function() {
    mapa_peru.addMarker({
      lat: -8.082637,
      lng: -79.049979,
      title: 'Agencia de Publicidad',
      distrito: 'trujillo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>EXTERNA CONSULTING SAC</h4><p>Distrito: <span>Trujillo</span><br>Dirección: <span>CAL.ALFONSO UGARTE NRO. 471 URB. CENTRO CIVICO LA LIBERTAD - TRUJILLO</span><br>Teléfono: <span>9798-00246</span><br>E-mail: <span>david.velasquez@externaperu.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -8.113862,
      lng: -79.023853,
      title: 'Oficina Concesionaria',
      distrito: 'trujillo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>FULL MARKETING CLASE S.A.C.</h4><p>Distrito: <span>Trujillo</span><br>Dirección: <span>AV. ESPAÑA 2155 INT. 208 - TRUJILLO</span><br>Teléfono: <span>950-209648 / 943814678 / (044)206680 </span><br>E-mail: <span>fullmarketingcardenas@outlook.com;fullmktclase@gmail.com</span></p>',
      },
    })
    mapa_peru.addMarker({
      lat: -8.10846,
      lng: -79.014518,
      title: 'Oficina Concesionaria',
      distrito: 'trujillo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>BANGOO AGENCIA DE COMUNICACIONES & RED PUBLICITARIA EMPRESARIAL S.A.C.</h4><p>Distrito: <span>Trujillo</span><br>Dirección: <span>CAL. RAUL PORRAS BARRENECHEA NRO. 664 URB. PALERMO, TRUJILLO</span><br>Teléfono: <span>44-654020 / 992857778 </span><br>E-mail: <span>gerencia@bangooagency.com/ tatianapuelles@bangooagency.com</span></p>',
      },
    })
  }
  this._chiclayo = function() {
    mapa_peru.addMarker({
      lat: -6.780845,
      lng: -79.844354,
      title: 'Agencia de Publicidad',
      distrito: 'chiclayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>SERVICIOS GENERALES PUBLIKA2 E.I.R.L </h4><p>Distrito: <span>Chiclayo</span><br>Dirección: <span>CALLE LOS SAUCES 566 URB. SANTA VICTORIA - CHICLAYO</span><br>Teléfono: <span>994636765</span><br>E-mail: <span>malenatimarchi@hotmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -6.771464,
      lng: -79.839838,
      title: 'Agencia de Publicidad',
      distrito: 'chiclayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>Inversiones Zeus SAC</h4><p>Distrito: <span>Lambayeque</span><br>Dirección: <span>PJ. WOYKE NRO. 179 INT. 204 CENTRO DE CHICLAYO  LAMBAYEQUE - CHICLAYO</span><br>Teléfono: <span>074-235914 / 978434124 </span><br>E-mail: <span>inversiones_zeus_cix@hotmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -6.771464,
      lng: -79.839838,
      title: 'Oficina Concesionaria',
      distrito: 'chiclayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>DISTRIBUCIÓN DE PUBLICACIONES AYALA </h4><p>Distrito: <span>Chiclayo</span><br>Dirección: <span>AV. ORIENTE 183  URB. SAN JUAN CHICLAYO </span><br>Teléfono: <span>979147716 / 949947048 </span><br>E-mail: <span>x.joseluis@gmail.com;agencia.dpa@gmail.com</span></p>',
      },
    })
  }
  this._piura = function() {
    mapa_peru.addMarker({
      lat: -5.191535,
      lng: -80.653645,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>ISMENIA MARGOT OROZCO DE GONZALES</h4><p>Distrito: <span>Piura</span><br>Dirección: <span>MZA. C2 LOTE. 10 URB. LOS FICUS 2 ETAPA PIURA </span><br>Teléfono: <span>990999428</span><br>E-mail: <span>morozco_46@hotmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -5.189187,
      lng: -80.606274,
      title: 'Oficina Concesionaria',
      distrito: 'piura',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>LUCE PUBLICIDAD Y PRODUCCIONES E.I.R.L.</h4><p>Distrito: <span>Piura</span><br>Dirección: <span>CAL.LOS GERANIOS MZA. N LOTE. 4 DPTO. 302, URB. MIRAFLORES</span><br>Teléfono: <span>073 347665 / 994637601</span><br>E-mail: <span>lucepublicidadeirl@gmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -8.082637,
      lng: -79.049979,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>MASS MEDIA NORTE EIRL</h4><p>Distrito: <span>Piura</span><br>Dirección: <span>JR. AYACUCHO N° 713, PIURA</span><br>Teléfono: <span>969375683 / 948932450 / 073 - 541687</span><br>E-mail: <span>yoslizano@hotmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -5.195068,
      lng: -80.62611,
      title: 'Agencia de Publicidad',
      distrito: 'piura',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>KOMUNICA2 PUBLICIDAD Y MARKETING E.I.R.L.</h4><p>Distrito: <span>Piura</span><br>Dirección: <span>JR. CALLAO 330, OF. R, (2DO PISO) C.C. LA CHOLITA, PIURA</span><br>Teléfono: <span>073-325192 / 995073976 </span><br>E-mail: <span>komunica2publicidad@gmail.com / komunica2gerencia@gmail.com / komunica2artes@gmail.com</span></p>',
      },
    })
  }
  this._huancayo = function() {
    mapa_peru.addMarker({
      lat: -12.058502,
      lng: -75.213892,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>COPIAS ALFA EIRL(SUCURSAL)</h4><p>Distrito: <span>Huancayo</span><br>Dirección: <span>JR. JULIO C TELLO NRO. 296 URB. EL TAMBO HUANCAYO</span><br>Teléfono: <span>964 488 501 / 064-419085</span><br>E-mail: <span>copiasalfahyo@gmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -12.06313,
      lng: -75.208185,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>P & M SOLUTIONS SAC</h4><p>Distrito: <span>Huancayo</span><br>Dirección: <span>AV. FERROCARRIL  NRO 404, HUANCAYO </span><br>Teléfono: <span>999 899 831</span><br>E-mail: <span>publicidadpyms@gmail.com</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -12.066517,
      lng: -75.206486,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>VIOLETA RAMOS CAMACLLANQUI</h4><p>Distrito: <span>Chilca</span><br>Dirección: <span>AV. 9 DE DICIEMBRE NRO. 787A (PUERTAS 787A Y 787B) CHILCA </span><br>Teléfono: <span>#958504013</span><br>E-mail: <span>boticaramos2003@yahoo.es</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -12.086407,
      lng: -75.208515,
      title: 'Oficina Concesionaria',
      distrito: 'huancayo',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>MAGDA NELLY PALOMINO GALARZA </h4><p>Distrito: <span>Huancayo</span><br>Dirección: <span>AV. GIRALDEZ NRO. 392 (ESQUINA CON FERROCARRIL) HUANCAYO </span><br>Teléfono: <span>RPM#981 784 758</span><br>E-mail: <span>carol_dian20@hotmail.com</span></p>',
      },
    })
  }

  this._tacna = function() {
    mapa_peru.addMarker({
      lat: -18.012454,
      lng: -70.252541,
      title: 'Oficina Concesionaria',
      distrito: 'tacna',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>ALFEREZ CRUZ GLORIA AGUEDA (IAN RIVEREA.NET)</h4><p>Distrito: <span>Tacna</span><br>Dirección: <span>CAL.INCLAN NRO. 341 (ESPALDAS DE LA CAJA MUNICIPAL DE TACNA) TACNA</span><br>Teléfono: <span>934046431 / 956477621</span><br>E-mail: <span>manuelriv6@hotmail.com/concesionariotacnasmart@gmail.com</span></p>',
      },
    })
  }

  this._huanuco = function() {
    mapa_peru.addMarker({
      lat: -9.929089,
      lng: -76.238772,
      title: 'Oficina Concesionaria',
      distrito: 'huanuco',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>TANIA ISABEL QUINTANA LOYA</h4><p>Distrito: <span>Huánuco</span><br>Dirección: <span>JR. 28 DE JULIO N°1030 2DO PISO, HUANUCO</span><br>Teléfono: <span>954 178 072 / #995 722 550 / 968 689 730</span><br>E-mail: <span>tiquintanal@gmail.com</span></p>',
      },
    })
  }

  this._ayacucho = function() {
    mapa_peru.addMarker({
      lat: -9.929089,
      lng: -76.238772,
      title: 'Oficina Concesionaria',
      distrito: 'ayacucho',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>CENTRO SUPERIOR TECNOLOGICO Y SISTEMAS – PERÚ E.I.R.L.</h4><p>Distrito: <span>Huamanga</span><br>Dirección: <span>JR. CUSCO NRO. 303 URB. CERCADO AYACUCHO - HUAMANGA</span><br>Teléfono: <span>965 835 151</span><br>E-mail: <span>cestys2017_publicidad@outlook.es</span></p>',
      },
    })
  }

  this._ica = function() {
    mapa_peru.addMarker({
      lat: -14.063349,
      lng: -75.729805,
      title: 'Oficina Concesionaria',
      distrito: 'ica',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>EDWARD QUISPE CONTRERAS (ICA GRAF)</h4><p>Distrito: <span>Ica</span><br>Dirección: <span>CAL.TACNA NRO. 130 INT. 28 ASOC. COMERC PLAZA BUNKER (1ER PISO- EN EL 3ER PASADIZO) ICA</span><br>Teléfono: <span>056-225418 / 943 631 285</span><br>E-mail: <span>publicidad.icagraf@gmail.com</span></p>',
      },
    })
  }

  this._puno = function() {
    mapa_peru.addMarker({
      lat: -15.837055,
      lng: -70.033613,
      title: 'Oficina Concesionaria',
      distrito: 'puno',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>PUBLIMAS COMUNICACIÓN Y MARKETING E.I.R.L. </h4><p>Distrito: <span>Tacna</span><br>Dirección: <span>JR. TACNA 121, INT. 516, PUNO</span><br>Teléfono: <span>950727666 / 951960688 / (051) 363515</span><br>E-mail: <span>maribel_cabreraq@yahoo.es</span></p>',
      },
    })

    mapa_peru.addMarker({
      lat: -15.493769,
      lng: -70.135097,
      title: 'Sucursal',
      distrito: 'puno',
      icon:
        'https://s3.amazonaws.com/s.3.elcomercio.pe/f/i/icono_concesionario.png?2112.1800',
      infoWindow: {
        content:
          '<h4>PUBLIMAS COMUNICACIÓN Y MARKETING E.I.R.L. </h4><p>Distrito: <span>Tacna</span><br>Dirección: <span>JR. JAUREGUI NRO. 289 TDA. 103 (EN LA PLAZA DE ARMAS DE JULIACA) PUNO - SAN ROMAN - JULIACA</span><br>Teléfono: <span>950727666 / 951960688 / (051) 363515</span><br>E-mail: <span>maribel_cabreraq@yahoo.es</span></p>',
      },
    })
  }

  $('#seldistrito').append("<option value='0'>Seleccionar</option>")
  for (var i = 0; i <= vertodas.length - 1; i++) {
    distrito = vertodas[i]
    distritoval = distrito.replace(/\s/g, '')
    distritoval = distritoval.replace('ñ', 'n')
    $('#seldistrito').append(
      "<option value='" +
        distritoval.toLowerCase() +
        "'>" +
        distrito +
        '</option>'
    )
    window['_' + distritoval.toLowerCase()]()
  }
  $('#selprovincia option').each(function(index) {
    if (index != 0) {
      window['_' + $(this).val()]()
    }
  })

  $('#selzona').on('change', function() {
    zona = $(this).val()
    if (zona != '0') {
      $('#seldistrito')
        .find('option')
        .remove()
      $('#seldistrito').append("<option value='0'>Seleccionar</option>")
      switch (zona) {
        case 'zonanorte':
          for (var i = 0; i <= zonanorte.length - 1; i++) {
            distrito = zonanorte[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'zonacentro':
          for (var i = 0; i <= zonacentro.length - 1; i++) {
            distrito = zonacentro[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'zonaeste':
          for (var i = 0; i <= zonaeste.length - 1; i++) {
            distrito = zonaeste[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'zonaoeste':
          for (var i = 0; i <= zonaoeste.length - 1; i++) {
            distrito = zonaoeste[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'zonasur':
          for (var i = 0; i <= zonasur.length - 1; i++) {
            distrito = zonasur[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'callao':
          for (var i = 0; i <= callao.length - 1; i++) {
            distrito = callao[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
        case 'vertodas':
          for (var i = 0; i <= vertodas.length - 1; i++) {
            distrito = vertodas[i]
            distritoval = distrito.replace(/\s/g, '')
            distritoval = distritoval.replace('ñ', 'n')
            $('#seldistrito').append(
              "<option value='" +
                distritoval.toLowerCase() +
                "'>" +
                distrito +
                '</option>'
            )
          }
          break
      }
    }
  })

  $('#seldistrito').on('change', function() {
    txtzona = $('#selzona option:selected').text()
    txtdistrito = $('#seldistrito option:selected').text()
    if ($(this).val() == 0) {
      $('#titlima').text('')
    } else {
      if (txtdistrito == 'Jesus Maria') {
        txtdistrito = 'Jesús María'
      }
      if (txtzona != 'Seleccionar' && txtzona != 'Ver Todas') {
        $('#titlima').text(txtzona + ' - ' + txtdistrito)
      } else {
        $('#titlima').text(txtdistrito)
      }
      GMaps.geocode({
        address: txtdistrito + ', Lima, Perú',
        callback: function(results, status) {
          if (status == 'OK') {
            var latlng = results[0].geometry.location
            if (txtdistrito == 'San Juan de Miraflores') {
              map_lima.setCenter(-12.1558913, -76.9601941)
            } else if (txtdistrito == 'Pueblo Libre') {
              map_lima.setCenter(-12.0743753, -77.0620746)
            } else {
              map_lima.setCenter(latlng.lat(), latlng.lng())
            }
            map_lima.setZoom(13)
          }
        },
      })
      map_lima.removeMarkers()
      window['_' + $(this).val()]()
    }
  })

  $('#selprovincia').on('change', function() {
    txtprovincia = $('#selprovincia option:selected').text()
    if ($(this).val() == 0) {
      $('#titperu').text('')
    } else {
      $('#titperu').text('Provincia - ' + txtprovincia)
      GMaps.geocode({
        address: 'Peru, ' + $(this).val(),
        callback: function(results, status) {
          if (status == 'OK') {
            var latlng = results[0].geometry.location
            if (txtprovincia == 'Piura') {
              mapa_peru.setCenter(-5.189757569496268, -80.63593103459469)
            } else {
              mapa_peru.setCenter(latlng.lat(), latlng.lng())
            }
            mapa_peru.setZoom(12)
          }
        },
      })
      mapa_peru.removeMarkers()
      window['_' + $(this).val()]()
    }
  })
})
