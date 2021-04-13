function data() {
  return {
    init() {
      const parameters = Object.assign(
        {
          wait: 0,
        },
        this.parseQueryString()
      )
      // Emulate wait time
      setTimeout(() => {
        this.sendMessage('ready', {
          height: document.documentElement.scrollHeight,
        })
      }, Number.parseInt(parameters.wait))

      const jsonData = JSON.parse(
        decodeURIComponent(parameters.p).replace(/\+/g, " ")
      );
      this.page = jsonData.config.block;
      this[this.page] = jsonData.config.data;

      if (this.page === 'image_ratio') {
          this.fetchGallery()
      }
    },
    calcRatio(w, h) {
      let ratio = 'auto'
      if (
        Math.round((w / h) * 100) / 100 ===
        Math.round((16 / 9) * 100) / 100
      ) {
        ratio = '16:9'
      }
      if (
        Math.round((w / h) * 100) / 100 ===
        Math.round((4 / 3) * 100) / 100
      ) {
        ratio = '4:3'
      }
      if (h > w) {
        ratio = '2:3'
      }
      if (w / h === 1 / 1) {
        ratio = '1:1'
      }
      return ratio
    },
    fetchGallery() {
      fetch(
        `/pf/api/v3/content/fetch/gallery-by-id?query={%22_id%22:%22${this.image_ratio.gallery_id}%22}&_website=elcomercio`
      )
        .then(response => response.json())
        .then(data => {
          const content = data.content_elements || []
          this.image_ratio_prev = content.map(
            ({ url, caption, height, width }) => ({
              url,
              caption,
              ratio: this.calcRatio(width, height),
            })
          )
        })
    },
    sendMessage(action, data) {
      window.parent.postMessage(
        JSON.stringify({
          source: 'custom_embed',
          action,
          data,
          key: this.parseQueryString()['k'],
        }),
        '*'
      )
    },
    parseQueryString() {
      const params = location.search.split('?')[1] || ''
      const kv = params.split('&')
      return kv.reduce((result, item) => {
        const [key, value] = item.split('=')
        return Object.assign(result, {
          [key]: value,
        })
      }, {})
    },
    page: '',
    image: {
      title: 'LOS GOBIERNOS AYUDARON A LA CREACIÓN DE LAS VACUNAS',
      url:
        'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/AYTOJWDJZ5DC5GRFZ45WRCU2WI.jpg',
      url_mobile:
        'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/AYTOJWDJZ5DC5GRFZ45WRCU2WI.jpg',
      color: '#FFFFFF',
    },
    featured: {
      type: 'image',
      html:
        '<div style="height:100%;width:100%;background-color: #000"><h1 style="color:#fff">Hola mundo</h1></div>',
      url:
        'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/JMQ47A4R6FCXPOYJVOXQTTY4SQ.jpg',
      url_mobile:
        'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/JMQ47A4R6FCXPOYJVOXQTTY4SQ.jpg',
      url_logo:
        'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/66WDMGHJJRHTBJGEGGL7K6HN24.png',
      color: '#777777',
      bg_color: '#000000',
    },
    author: {
      name: '',
      url: '',
      text: 'TEXTO',
      author_type: 'default', // default | custom
      text_type: 'date', // date | custom
    },
    credits: {
      html: `TEXTOS / <b>Dormilón.</b> PRODUCCIÓN / <b>Feliz.</b> EDITOR / <b>Tímido.</b>
<br> 
DESARROLLO / <b>Gruñón.</b> EDICIÓN DE FOTOGRAFÍA / <b>Estornudo.</b> 
<br> 
INFOGRAFÍA / <b>Sabio.</b> ILUSTRACION / <b>Tontín.</b> 
<br> 
EDITOR DE PROYECTOS VISUALES / <b>Blanca Nieves</b> 
<br>
EDITOR DE CONTENIDOS ORIGINALES / <b>Leñador</b>`,
    },
    image_ratio: {
      gallery_id: '',
    },
    scroll_gallery: {
      gallery_id: '',
    },
    image_ratio_prev: [],
    sendData() {
      this.sendMessage('data', {
        id: 'no-fetch',
        url: '/',
        config: {
          block: this.page,
          data: this[this.page],
        },
      })
    },
    getSizesByRatio(ratio) {
      let sizes = {
        width: '860px',
        height: 'auto',
      }
      switch (ratio) {
        case '1:1':
          sizes.width = '580px'
          sizes.height = '580px'
          break

        case '4:3':
          sizes.width = '640px'
          sizes.height = '360px'
          break

        case '2:3':
          sizes.width = '320px'
          sizes.height = '480px'
          break
        case '16:9':
          sizes.width = '860px'
          sizes.height = '484px'
        default:
          break
      }
      return sizes
    },
    arrayMove: function(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
      return arr // for testing
    },
    getImageBg() {
      return "background-image: url("+this.image.url+")"
    }
  }
}