import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class MoviesFilter extends Component {
  classes = {
    moviesFilter: 'movies-filter flex flex--justify-between',
    label: 'movies-filter__label text-uppercase',
    form: 'movies-filter__form flex ',
    options: 'movies-filter__options flex',
    button: 'movies-filter__button text-uppercase',
  }

  render() {
    return (
      <div className={this.classes.moviesFilter}>
        <h4 className={this.classes.label}>Vamos al cine</h4>
        <form
          action="/cartelera/search"
          method="post"
          className={this.classes.form}>
          <div className={this.classes.options}>
            <select name="movie">
              <option value="" selected="" disabled="">
                PELÍCULAS
              </option>
              <option data-genre="animacion:3" value="3070/parque-magico">
                Parque mágico
              </option>
              <option data-genre="drama:2" value="3071/after-aqui-empieza-todo">
                After: Aquí empieza todo
              </option>
              <option
                data-genre="comedia:5"
                value="3063/luchando-con-mi-familia">
                Luchando con mi familia
              </option>
              <option data-genre="" value="3067/la-casa-que-jack-construyo">
                La casa que Jack construyó
              </option>
              <option data-genre="" value="3064/papa-youtuber">
                Papá youtuber
              </option>
              <option data-genre="drama:2" value="3066/un-amor-inquebrantable">
                Un amor inquebrantable
              </option>
              <option data-genre="" value="3054/shazam">
                Shazam!
              </option>
              <option data-genre="" value="3055/cementerio-maldito">
                Cementerio maldito
              </option>
              <option data-genre="comedia:5" value="3056/intercambiadas">
                Intercambiadas
              </option>
              <option data-genre="animacion:3" value="3044/dumbo">
                Dumbo
              </option>
              <option data-genre="aventura:7" value="3045/verano-del-84">
                Verano del 84
              </option>
              <option data-genre="terror:1" value="3048/el-bosque-maldito">
                El bosque maldito
              </option>
              <option data-genre="" value="3016/a-dos-metros-de-ti">
                A dos metros de ti
              </option>
              <option data-genre="" value="3018/el-gran-asalto">
                El gran asalto
              </option>
              <option data-genre="" value="3020/el-mayor-regalo">
                El mayor regalo
              </option>
              <option
                data-genre="comedia:5"
                value="3005/un-amor-hasta-las-patas">
                Un amor hasta las patas
              </option>
              <option
                data-genre="ciencia-ficcion:6"
                value="2996/capitana-marvel">
                Capitana Marvel
              </option>
              <option data-genre="accion:4" value="2998/destruccion">
                Destrucción
              </option>
            </select>
            <select name="genre">
              <option value="" selected="" disabled="">
                GÉNERO
              </option>
              <option value="todas">Todas</option>
              <option value="terror">Terror</option>
              <option value="drama">Drama</option>
              <option value="animacion">Animación</option>
              <option value="accion">Acción</option>
              <option value="comedia">Comedia</option>
              <option value="aventura">Aventura</option>
              <option value="ciencia-ficcion">Ficción</option>
            </select>
            <select name="theater">
              <option value="" selected="" disabled="">
                CINES
              </option>
              <option value="335/cine-ate-vitarte-cineplanet-santa-clara-s15">
                Ate Vitarte Cineplanet Santa Clara S/15
              </option>
              <option value="117/cine-cine-star-aviacion-s-10">
                Cine Star Aviación S/ 10
              </option>
              <option value="377/cine-cine-star-benavides-s-9">
                Cine Star Benavides S/ 9
              </option>
              <option value="119/cine-cine-star-excelsior-s-750">
                Cine Star Excelsior S/ 7,50
              </option>
              <option value="293/cine-cine-star-metro-comas-s-8">
                Cine Star Metro Comas S/ 8
              </option>
              <option value="123/cine-cine-star-metro-san-juan-s-1150">
                Cine Star Metro San Juan S/ 11,50
              </option>
              <option value="297/cine-cine-star-metro-uni-s-750">
                Cine Star Metro Uni S/ 7.50
              </option>
              <option value="125/cine-cine-star-porteno-s-750">
                Cine Star Porteño S/ 7,50
              </option>
              <option value="152/cine-cine-star-premium-chorrillos-s10">
                Cine Star Premium Chorrillos S/10
              </option>
              <option value="126/cine-cine-star-sur-s-10">
                Cine Star Sur S/ 10
              </option>
              <option value="435/cine-cinemark-aventura-plaza-bellavista-s-1550">
                Cinemark Aventura Plaza Bellavista S/ 15,50
              </option>
              <option value="374/cine-cinemark-mega-plaza-s-17">
                Cinemark Mega Plaza S/ 17
              </option>
              <option value="354/cine-cinemark-peru-jockey-plaza-s26">
                Cinemark Perú Jockey Plaza S/26
              </option>
              <option value="203/cine-cinemark-plaza-lima-sur-s18">
                Cinemark Plaza Lima Sur S/18
              </option>
              <option value="434/cine-cinemark-plaza-san-miguel-s-1950">
                Cinemark Plaza San Miguel S/ 19,50
              </option>
              <option value="260/cine-cineplanet-alcazar-s-24">
                Cineplanet Alcázar S/ 24
              </option>
              <option value="416/cine-cineplanet-brasil-s-125">
                Cineplanet Brasil S/ 12,5
              </option>
              <option value="417/cine-cineplanet-centro-s-11">
                Cineplanet Centro S/ 11
              </option>
              <option value="436/cine-cineplanet-la-molina-s-185">
                Cineplanet La Molina S/ 18.5
              </option>
              <option value="275/cine-cineplanet-mall-del-sur-s-12">
                Cineplanet Mall Del Sur S/ 12
              </option>
              <option value="267/cine-cineplanet-norte-royal-plaza-s-15">
                Cineplanet Norte-royal Plaza S/ 15
              </option>
              <option value="348/cine-cineplanet-plaza-san-miguel-s-1950">
                Cineplanet Plaza San Miguel S/ 19,50
              </option>
              <option value="268/cine-cineplanet-primavera-s-21">
                Cineplanet Primavera S/ 21
              </option>
              <option value="269/cine-cineplanet-pro-s-15">
                Cineplanet Pro S/ 15
              </option>
              <option value="270/cine-cineplanet-risso-s-15">
                Cineplanet Risso S/ 15
              </option>
              <option value="273/cine-cineplanet-salaverry-s-25">
                Cineplanet Salaverry S/ 25
              </option>
              <option value="272/cine-cineplanet-san-borja-s-24">
                Cineplanet San Borja S/ 24
              </option>
              <option value="425/cine-cineplanet-ventanilla-s-145">
                Cineplanet Ventanilla S/ 14,5
              </option>
              <option value="415/cine-cineplanet-villa-el-salvador-s12">
                Cineplanet Villa El Salvador S/12
              </option>
              <option value="338/cine-cineplanet-villa-maria-s15">
                Cineplanet Villa María S/15
              </option>
              <option value="279/cine-cinepolis-norte-s-16">
                Cinépolis Norte S/ 16
              </option>
              <option value="183/cine-cinepolis-santa-anita-s-17">
                Cinépolis Santa Anita S/ 17
              </option>
              <option value="376/cine-cinerama-el-pacifico-s-10">
                Cinerama El Pacífico S/ 10
              </option>
              <option value="357/cine-cinerama-minka-s-65">
                Cinerama Minka S/ 6.5
              </option>
              <option value="422/cine-cinplanet-guardia-civil-s16">
                Cinplanet Guardia Civil S/16
              </option>
              <option value="128/cine-movietime-chorrilllos-s-10">
                Movietime Chorrilllos S/ 10
              </option>
              <option value="127/cine-movietime-megaplaza-express-villa-s-10">
                Movietime-megaplaza Express Villa S/ 10
              </option>
              <option value="286/cine-uvk-el-agustino-s-11">
                Uvk El Agustino S/ 11
              </option>
              <option value="418/cine-uvk-multicines-basadre-s-36">
                Uvk Multicines Basadre S/ 36
              </option>
              <option value="285/cine-uvk-multicines-platino-panorama-s-36">
                Uvk Multicines Platino Panorama S/ 36
              </option>
              <option value="133/cine-uvk-multicines-san-martin-centro-s-14">
                Uvk Multicines San Martín - Centro S/ 14
              </option>
            </select>
          </div>
          <button type="submit" className={this.classes.button}>
            Buscar
          </button>
        </form>
      </div>
    )
  }
}

MoviesFilter.label = 'Filtro de Películas'

export default MoviesFilter
