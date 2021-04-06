import React from 'react'
import ResultGraph from './_children/graph'
import ResultPaginator from './_children/paginator'

const PresidentialElection = props => {
  const params = {
    data: [
      {
        color: 'red',
        name: 'Lescano',
        votes: '50',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: '#f0f',
        name: 'Señora k',
        votes: '40',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'blue',
        name: 'Rafael',
        votes: '45',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'green',
        name: 'Veronica mendoza',
        votes: '30',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/02-10-feos-logotipos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: 'yellow',
        name: 'Ollanta Humala',
        votes: '5',
        urlImg:
          'https://www.staffdigital.pe/blog/wp-content/uploads/01-10-feos-logos-de-partidos-pol%C3%ADticos-peruanos.jpg',
      },
      {
        color: '#000',
        name: 'En blanco / viciado',
        votes: '2',
        urlImg: null,
      },
    ],
    description:
      'ante ac ultrices dignissim, arcu libero pretium quam, vit libero pretium quam, vitae placerat',
    maxVote: 50,
    showTitle: true,
  }
  return (
    <div>
      <ResultPaginator urlPrev="1/" urlNext="2/" title="Acción Popular" />
      <ResultGraph {...params} />
    </div>
  )
}

PresidentialElection.label = 'Elecciones presidenciales y congresales'
PresidentialElection.static = true

export default PresidentialElection
