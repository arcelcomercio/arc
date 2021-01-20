window. addOpcion = (name='',check='', disabled='') => {
  a++;
  var div = document.createElement('div');
  div.setAttribute('class', 'form-inline col-md-11');
      div.innerHTML = '<label class="form-inline input-group" ><span class="input-group-text">Opción '+a+':</span> <input class="form-control" id="cancion_'+a+'" name="array[]" type="text" value="'+name+'"  '+disabled+'/>   <input class="" type="checkbox" value="0" id="has_'+a+'" name="has_'+a+'"  '+check+' '+disabled+' /> </label>';
      document.getElementById('opciones').appendChild(div);document.getElementById('opciones').appendChild(div);
}

window.removeOpcion = () => {
  a--;
  var element =  document.getElementById("opciones");
  while (element.firstChild) {
    element.removeChild(element.lastChild);
    return;
  }
}

window. sendMessage = function(action, data) {
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

  window. parseQueryString = function() {
    const params = location.search.split('?')[1] || ''
    const kv = params.split('&')
    return kv.reduce((result, item) => {
      const [key, value] = item.split('=')
      return Object.assign(result, {
        [key]: value
      })
    }, {})
  }

  window.opcion = function () {
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