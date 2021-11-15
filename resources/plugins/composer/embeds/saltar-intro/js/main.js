const renderForEditAndView = (dataParams) => {
    const {id, config:{title='', score=0, chapter='', year='', plataform='', director = [], cast = [], genre = [], duration, clasification, interviewed = '', career_interviewed = '', release_date = '', premiere_image = '', is_premiere = 0 }} = dataParams

    const html = renderViewEdit({id, title, score, chapter, year, plataform, director, cast, genre, duration, clasification, interviewed, career_interviewed, release_date, premiere_image, is_premiere});

    const element = document.createElement('div');
    document.getElementById('content_holder').innerHTML = '<br>';
    document.getElementById('content_holder').appendChild(element);
    element.outerHTML = html

    // Update form state
    //document.getElementById('video_key').value = (key || "")
}

const renderViewEdit = (data) => {
  const {id, title='', chapter='', score=0, year='', plataform='', director = [], cast = [], genre = [], duration, clasification, interviewed, career_interviewed, release_date, premiere_image, is_premiere } = data;
  const template = document.getElementById('content_template').innerHTML;
  const directors = director.map((v,i) => {
    return v.name != '' && v.url != '' ? `<div class="card-text text-muted"><b>Director ${(i) === 0 ? '': (i+1)} :</b> ${v.name} (${v.url})</div>`: '';
  });
  const casts = cast.map((v,i) => {
    return v.name != '' && v.url != '' ? `<div class="card-text text-muted"><b>Elenco ${(i) === 0 ? '': (i+1)} :</b> ${v.name} (${v.url})</div>`: '';
  });
  const genres = genre.map((v,i) => {
    return v.name != '' && v.url != '' ? `<div class="card-text text-muted"><b>Género ${(i) === 0 ? '': (i+1)} :</b> ${v.name} (${v.url})</div>`: '';
  });

  const directorsEdit = /*director*/[0,1].map((val,i) => {
    const v = director[i] || {name:'', url:''};
    return `<label class="w-50" for="director[${i}]">Director ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="director[${i}]" name="director" value="${v?.name}" />
      </label>
      <label class="w-50" for="director_url[${i}]">Url de director ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="director_url[${i}]" name="director_url" value="${v?.url}" />
      </label>`;
  });
  const castsEdit = /*cast*/[0,1,2,3,4].map((val,i) => {
    const v = cast[i] || {name:'', url:''};
    return `<label class="w-50" for="cast[${i}]">Elenco ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="cast[${i}]" name="cast" value="${v.name}" />
      </label>
      <label class="w-50" for="cast_url[${i}]">Url de elenco ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="cast_url[${i}]" name="cast_url" value="${v.url}" />
      </label>`;
  });
  const genresEdit = /*genre*/[0,1,2].map((val,i) => {
    const v = genre[i] || {name:'', url:''};
    return `<label class="w-50" for="genre[${i}]">Género ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="genre[${i}]" name="genre" value="${v.name}" />
      </label>
      <label class="w-50" for="genre_url[${i}]">Url de género ${(i) === 0 ? '': (i+1)}:
        <input class="w-50" type="textfield" id="genre_url[${i}]" name="genre_url" value="${v.url}" />
      </label>`;
  });
  const isPremiere = is_premiere == 1 ? 'Si': 'No'
  const isPremiereChecked = is_premiere == 1 ? 'checked': ''
  return template
      .replace(/%item_id%/gi, 'row-' + id)
      .replace(/%title%/gi, title)
      .replace(/%score%/gi, score)
      .replace(/%year%/gi, year)
      .replace(/%plataform%/gi, plataform)
      .replace(/%directors%/gi, directors.join(''))
      .replace(/%casts%/gi, casts.join(''))
      .replace(/%genres%/gi, genres.join(''))
      .replace(/%duration%/gi, duration)
      .replace(/%clasification%/gi, clasification)
      .replace(/%chapter%/gi, chapter)
      .replace(/%interviewed%/gi, interviewed)
      .replace(/%career_interviewed%/gi, career_interviewed)
      .replace(/%release_date%/gi, release_date)
      .replace(/%premiere_image%/gi, premiere_image)
      .replace(/%is_premiere%/gi, isPremiere)
      .replace(/%is_premiere_checked%/gi, isPremiereChecked)
      .replace(/%director_edit%/gi, directorsEdit.join(''))
      .replace(/%cast_edit%/gi, castsEdit.join(''))
      .replace(/%genre_edit%/gi, genresEdit.join(''))
      //.replace(/%data%/gi, JSON.stringify(dataParams, null, 2))
}

//todo: implementar edición de valores
const applyChanges = () => {
    data.config.url = document.getElementById('video_key').value
    data.config.url_img = document.getElementById('url_img').value
    // Update Composer and re-render form
    sendMessage('data', data)
    renderForEditAndView(data)
  }

window.onlyNumber = (ev) => {
  const chars = /[0-9-]$/;
  if(!ev.key.match(chars) && ev.key !== 'Backspace'){
    return false
  }
  return true
}

window.handleSave = (formElement) => {
  const dataForm = new FormData(formElement);
  const data = Object.fromEntries(dataForm.entries());
  data.director = dataForm.getAll("director");
  data.director_url = dataForm.getAll("director_url");
  data.cast = dataForm.getAll("cast");
  data.cast_url = dataForm.getAll("cast_url");
  data.genre = dataForm.getAll("genre");
  data.genre_url = dataForm.getAll("genre_url");
  buildMessage(generateId(), buildDataAns(data));
}


const generateId = () =>  Date.now() + '-' + Math.floor(Math.random() * 1000000);

const buildDataAns = (data) => {
  const director = [];
  data.director.forEach((val, index) => {
    director.push({name: val, url: data.director_url[index]});
  });
  const cast = [];
  data.cast.forEach((val, index) => {
    cast.push({name: val, url: data.cast_url[index]});
  });
  const genre = [];
  data.genre.forEach((val, index) => {
    genre.push({name: val, url: data.genre_url[index]});
  });
  const {title, score, chapter, year, plataform, duration, clasification, interviewed, career_interviewed, release_date, premiere_image, is_premiere = 0} = data || {};
  return {
      title, 
      score,
      chapter,
      year, 
      plataform, 
      duration,
      clasification,
      interviewed, 
      career_interviewed,
      release_date,
      premiere_image,
      is_premiere,
      director, 
      cast, 
      genre,
  }
}



const buildMessage = (id, data) => {
  const ansCustomEmbed = {
      id,
      url: '/pf/api/v3/content/fetch/photo-by-id',
      config: data
  }
  console.log('ansCustomEmbed');
  console.dir(ansCustomEmbed);
  // console.log('string', JSON.stringify(ansCustomEmbed, null, 2));
  sendMessage('data', ansCustomEmbed);
}

//////// don't touch
const sendMessage = function(action, data) {
    window.parent.postMessage(
      JSON.stringify({
        source: 'custom_embed',
        action,
        data,
        key: parseQueryString()['k']
      }),
      '*'
    )
}

const parseQueryString = function() {
    const params = location.search.split('?')[1] || ''
    const kv = params.split('&')
    return kv.reduce((result, item) => {
      const [key, value] = item.split('=')
      return Object.assign(result, {
        [key]: value
      })
    }, {})
}

const dismissEditor = () => {
    sendMessage('cancel')
}

window.onload = function() {
    const parameters = Object.assign(
      {
        wait: 0
      },
      parseQueryString()
    )
    // Emulate wait time
    setTimeout(function() {
      sendMessage('ready', {
        height: document.documentElement.scrollHeight
      })
    }, Number.parseInt(parameters.wait))

    
    // data = JSON.parse(decodeURIComponent(parameters.p))
    if(parameters.p !== undefined){
        const data = JSON.parse(decodeURIComponent(parameters.p));
        renderForEditAndView(data)
        // document.getElementById('btn_apply').onclick = applyChanges
        if(document.getElementById('btn_cancel') != null) {
            document.getElementById('btn_cancel').onclick = dismissEditor;
        }
    }
}
////////////////////////