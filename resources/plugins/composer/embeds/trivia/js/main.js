let data = {}
let question = '' 
let searchQuestion = '' 
let searchResqueset =''
let a = 0
window. addCancion = () => {
  a++;
  var div = document.createElement('div');
  div.setAttribute('class', 'form-inline col-md-11');
      div.innerHTML = '<label class="form-inline input-group" ><span class="input-group-text">Opción '+a+':</span> <input class="form-control" id="cancion_'+a+'" name="array[]" type="text"/>   <input class="" type="checkbox" value="0" id="has_'+a+'" name="has_'+a+'"  /> </label>';
      document.getElementById('canciones').appendChild(div);document.getElementById('canciones').appendChild(div);
}
window.removeCancion = () => {
  a--;
  var element =  document.getElementById("canciones");
  while (element.firstChild) {
    element.removeChild(element.lastChild);
    return;
  }
}

const sendMessage = function (action, data) {
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

const parseQueryString = function () {
  const params = location.search.split('?')[1] || ''
  const kv = params.split('&')
  return kv.reduce((result, item) => {
    const [key, value] = item.split('=')
    return Object.assign(result, {
      [key]: value
    })
  }, {})
}

const opcion = function () {
  var input = document.getElementsByName('array[]'); 
  var array = []
  for (var i = 0; i < input.length; i++) { 
    var a = input[i]; 
    var chek = i+1;
    var checkboxes = document.getElementById("has_"+chek).checked
    array[i] = {'name':a.value,'response':checkboxes}
  } 
  return array;
}

  // ------------------------------------------------



window. handleSearch = () => {
  question = opcion();
  const searchTerm = document.getElementById('searchID').value;
  searchQuestion = document.getElementById('searchQuestion').value;
  searchResqueset = document.getElementById('searchResqueset').value;
  

  if (searchTerm)
    superagent
      .get('/pf/api/v3/content/fetch/photo-by-id')
      .query({ query: JSON.stringify({ "_id": searchTerm }) })
      .set('Accept', 'application/json')
      .then(res => {
        data = res.body // res.body.Search
        render()
      });
}


const render = () => {
  // Show search results to user
  const template = document.getElementById('content_template').innerHTML
  document.getElementById('search_content').innerHTML = '';

  const html = template
    .replace(/%item_id%/gi, 'row-' + data._id)
    .replace(/%image_url%/gi, data.url || '')
    .replace(/%title%/gi, data.subtitle || '')
    .replace(/%alt%/gi, data.caption || '')
  const element = document.createElement('div')
  document.getElementById('search_content').appendChild(element)
  element.outerHTML = html
  document
    .getElementById('row-' + data._id)
    .addEventListener('click', handleClick())
}

window. handleClick =  event => {
    const ansCustomEmbed = {
    id: data._id,
    url: '/pf/api/v3/content/fetch/photo-by-id',
    config: {
      "name":searchQuestion,
      "response":searchResqueset,
      "question":question,
      "image": {
      "url": data.url || "",
      "title": data.subtitle || "",
      "alt": data.caption || "",
      "width": data.width,
      "height": data.height
    },
    }
  }

  sendMessage('data', ansCustomEmbed)
}

  // ------------------------------------------------

window.onload = function () {
  const parameters = Object.assign(
    {
      wait: 0
    },
    parseQueryString()
  )
  // Emulate wait time
  setTimeout(function () {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight
    })
  }, Number.parseInt(parameters.wait))

  render()
}