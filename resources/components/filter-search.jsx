/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class FilterSearch extends Component {
	constructor(props){
		super(props)
	}
	
	render() {
		return (
      <div className="filter-search content-layout-container">
        <div className="filter-search__box-list">
          <div className="filter-search__select">
            <p className="filter-search__select-name">
              Seleccione <span className="icon-angle-down">+</span>
            </p>
            <ul className="filter-search__list">
              <li className="filter-search__item active">
                <a href="/" className="filter-search__link">
                  Mas Recientes
                </a>
              </li>
              <li className="filter-search__item">
                <a href="/" className="filter-search__link">
                  Menos Recientes
                </a>
              </li>
              <li className="filter-search__item">
                <a href="/" className="filter-search__link">
                  Relevancia
                </a>
              </li>
              <li className="filter-search__item">
                <a href="/" className="filter-search__link">
                  Tipo de Nota
                </a>
              </li>
              <li className="filter-search__item selected">
                <a href="/" className="filter-search__link">
                  Seccion
                </a>
								<ul class="filter-search__sublist">
									<li class="filter-search__subitem">
										<a href="/" class="filter-search__sublink">Politica</a>
									</li>
									<li class="filter-search__subitem">
										<a href="/" class="filter-search__sublink">Deportes</a>
									</li>
									<li class="filter-search__subitem">
										<a href="/" class="filter-search__sublink">Mundo</a>
									</li>
								</ul>
              </li>
              <li className="filter-search__item">
                <a href="/" className="filter-search__link">
                  Periodo de tiempo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-search__box-search">
          <div className="filter-search__search">
            <span className="icon-search">Q</span>
            <input type="search" placeholder="" />
          </div>
        </div>
      </div>
    )
	}
}

export default FilterSearch;