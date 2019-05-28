const space_device = {
  desktop: {
    auspiciodt: [[625, 368]],
    auspicioluces: [[625, 368]],
    auspiciotop1: [[80, 25], [1, 1]],
    auspiciotop2: [[80, 25], [1, 1]],
    auspiciotop3: [[80, 25], [1, 1]],
    boton1: [[300, 600], [1, 1]],
    boton2: [[300, 250], [1, 1], [300, 350]],
    boton3: [[300, 250], [1, 1], [300, 350]],
    cintillo: [[980, 45], [1, 1]],
    daily: [[624, 368], [300, 350]],
    daily2: [[624, 368], [300, 350]],
    expandible: [[1, 1], [960, 35], [960, 400], [980, 90], [980, 200]],
    fotogaleria1: [[300, 250], [300, 600], [1, 1]],
    fotogaleria1: [[300, 600], [300, 250], [1, 1]],
    fotogaleria2: [[300, 250], [300, 600], [1, 1]],
    fotogaleria3: [[300, 250], [300, 600], [1, 1]],
    inline: [[1, 1], [300, 250]],
    jalador: [[141, 170], [1, 1]],
    left: [
      [468, 60],
      [1, 1],
      [520, 300],
      [336, 280],
      [300, 250],
      [520, 280],
      [520, 180],
    ],
    middle1: [[980, 330], [970, 250], [970, 90], [728, 90], [1, 1]],
    middle2: [[980, 330], [970, 250], [970, 90], [728, 90], [1, 1]],
    publirreportaje: [[300, 250], [300, 350]],
    recomendador: [
      [520, 220],
      [1, 1],
      [570, 220],
      [336, 280],
      [300, 250],
      [520, 280],
      [625, 370],
    ],
    right1: [[300, 250], [300, 600], [1, 1], [300, 300]],
    right2: [[300, 250], [300, 600], [1, 1]],
    skin: [[1, 1]],
    ticker: [[1275, 45], [980, 45], [1024, 45], [1, 1]],
    top: [
      [980, 180],
      [728, 90],
      [970, 90],
      [970, 250],
      [1, 1],
      [980, 90],
      [980, 200],
    ], // se ha quitado  [980, 400] // 18022019 se agregó 970x250
    vslider: [[1, 1]],
    zocalo1: [[160, 600], [120, 600], [150, 600], [1, 1], [150, 601], [2, 1]],
    zocalo2: [[160, 600], [120, 600], [150, 600], [1, 1], [150, 602], [2, 2]],
    wide: [[980, 120], [1, 1]],
  },
  mobile: {
    cintillo: [[300, 45], [1, 1], [300, 100], [300, 50], [300, 250]],
    movil0: [[1, 1]],
  },
}

const available_ports = [
  {
    name: 'port9',
    desktop_space: [
      'auspiciotop1',
      'auspiciotop2',
      'boton1',
      'boton2',
      'cintillo',
      'expandible',
      'skin',
      'top',
      'zocalo1',
      'zocalo2',
    ],
  },
  {
    name: 'port10',
    desktop_space: [
      'auspiciotop1',
      'auspiciotop2',
      'boton1',
      'boton2',
      'cintillo',
      'expandible',
      'skin',
    ],
  },
]

const site = 'eco'
const device = 'd'
const port = 'port9'
const type_space = `${site}_${device}_${port}`

const result = available_ports.find(el => el.name === port)
const dataDevice = device === 'd' ? result.desktop_space : result.mobile_space
const data =
  dataDevice &&
  dataDevice.map(el => {
    if (device === 'd') {
      return {
        invCode: `${type_space}_${el}`,
        sizes: space_device.desktop[el],
        allowedformats: ['video', 'banner'],
        targetId: `ads_d_${el}`,
      }
    }
    return {
      invCode: `${type_space}_${el}`,
      sizes: space_device.mobile[el],
      allowedformats: ['video', 'banner'],
      targetId: `ads_m_${el}`,
    }
  })
console.log(data)
