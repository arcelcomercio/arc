var space_device = {
  desktop: {
    top: [
      [980, 180],
      [728, 90],
      [970, 90],
      [970, 250],
      [1, 1],
      [980, 90],
      [980, 200],
    ],
  },
}

var available_ports = [
  {
    name: 'port1',
    desktop_space: ['top'],
  },
]

var ads_d_300x600_size = [300, 600]
var ads_d_300x250_size = [300, 250]
var ads_d_160x600_size = [160, 600]
var ads_d_970x250_size = [970, 250]
var ads_d_728x90_size = [728, 90]
var ads_d_970x90_size = [970, 90]
var ads_m_320x50_size = [320, 50]
var ads_m_300x250_size = [300, 250]

var port_boton1 = ['port3']
var port_zocalo1 = ['nota1', 'port1', 'port3']
var port_zocalo2 = ['port1', 'port3']
var port_top = ['nota1', 'port1', 'port3']
var port_movil = ['nota1', 'port1', 'port3']
var port_vslider = ['nota1']

var desktopRubicon = {
  zoneId: '1062130',
  siteId: '215748',
  accountId: '19186',
}

var mobileRubicon = {
  zoneId: '1062136',
  siteId: '215750',
  accountId: '19186',
}

var auction = {
  desktop: [
    {
      name: 'criteo',
      values: [
        {
          space: 'boton1',
          div_id: 'ads_d_boton1',
          size: ads_d_300x600_size,
          params: {
            zoneId: 1233567,
          },
          ports: port_boton1,
        },
        {
          space: 'top',
          div_id: 'ads_d_top',
          size: ads_d_970x90_size,
          params: {
            zoneId: 1233566,
          },
          ports: port_top,
        },
      ],
    },
    {
      name: 'pubmatic',
      values: [
        {
          space: 'zocalo1',
          div_id: 'ads_d_zocalo1',
          size: ads_d_160x600_size,
          params: {
            publisherId: '157414',
            adSlot: '1619210@160x600',
          },
          ports: port_zocalo1,
        },
      ],
    },
    {
      name: 'rubicon',
      values: [
        {
          space: 'zocalo1',
          div_id: 'ads_d_zocalo1',
          size: ads_d_160x600_size,
          params: desktopRubicon,
          ports: port_zocalo1,
        },
        {
          space: 'zocalo2',
          div_id: 'ads_d_zocalo2',
          size: ads_d_160x600_size,
          params: desktopRubicon,
          ports: port_zocalo2,
        },
      ],
    },
  ],
  mobile: [
    {
      name: 'criteo',
      values: [
        {
          space: 'movil1',
          div_id: 'ads_m_movil1',
          size: ads_m_320x50_size,
          params: {
            zoneId: 1299261,
          },
          ports: port_movil,
        },
        {
          space: 'movil2',
          div_id: 'ads_m_movil2',
          size: ads_m_300x250_size,
          params: {
            zoneId: 1299273,
          },
          ports: port_movil,
        },
      ],
    },
    {
      name: 'pubmatic',
      values: [
        {
          space: 'movil1',
          div_id: 'ads_m_movil1',
          size: ads_m_320x50_size,
          params: {
            publisherId: '157414',
            adSlot: '1619220@320x50',
          },
          ports: port_movil,
        },
        {
          space: 'vslider',
          div_id: 'ads_m_vslider',
          size: ads_m_320x50_size,
          params: {
            publisherId: '157414',
            adSlot: '1619220@320x50',
          },
          ports: port_vslider,
        },
      ],
    },
    {
      name: 'rubicon',
      values: [
        {
          space: 'movil1',
          div_id: 'ads_m_movil1',
          size: ads_m_320x50_size,
          params: mobileRubicon,
          ports: port_movil,
        },
      ],
    },
  ],
}
