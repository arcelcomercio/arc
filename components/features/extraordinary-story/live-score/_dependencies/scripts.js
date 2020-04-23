/* const getFetch = () => {
    const  time = new Date().getTime()
    fetch('https://w.ecodigital.pe/data/depor/<<id>>_xalok.js?_='+time)
    .then(function (response) {
        return response.text();
      })
      .then(function (dataRes={}) {
        const {data:{equipos:[colum1, colum2]=[]}={}} = JSON.parse(dataRes)
        document.getElementById("score").innerHTML = colum1.score + '-' + colum2.score
        document.getElementById("firstName").innerHTML = colum1.nombre 
        document.getElementById("secondName").innerHTML = colum2.nombre 
      })
      .catch(function (err) {
        console.error(err);
      });
}
getFetch()
setInterval(function() {
    getFetch()
  }, 5000) */
// eslint-disable-next-line import/prefer-default-export
export const fetchLive = `const getFetch=()=>{const time=new Date().getTime();fetch('https://w.ecodigital.pe/data/depor/<<id>>_xalok.js?_='+time).then(function(response){return response.text()}).then(function(dataRes={}){const{data:{equipos:[colum1,colum2]=[]}={}}=JSON.parse(dataRes);document.getElementById("score").innerHTML=colum1.score+'-'+colum2.score;document.getElementById("firstName").innerHTML=colum1.nombre;document.getElementById("secondName").innerHTML=colum2.nombre}).catch(function(err){console.error(err)})};getFetch();setInterval(function(){getFetch()},5000)
`
