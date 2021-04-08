import * as React from 'react'


const Projection = () => {

    const params = { 
        data:[
            {
                color: '#5CBE12',
                name: 'Jp',
                number: 30
            },
            {
                color: '#E51A22',
                name: 'Jean Paul',
                number: 50
            },
            {
                color: '#01ADD8',
                name: 'Jean Paul',
                number: 10
            },
            {
                color: '#561184',
                name: 'Jp',
                number: 40
            },
            {
                color: '#FA6400',
                name: 'Jp',
                number: 20
            },
            {
                color: '#8E8E8E',
                name: 'Otros',
                number: 5
            },
            {
                color: '#15934C',
                name: 'Fuerza',
                number: 8
            },
        ]
    }

    const resizeHeight = num =>{
        return ((((5 / num) + num)*2)+25) + 'px'
    }
    const znum = [10,9,8,7,6,5,4,3,2,1]
  
  return (
    <>
      <div className="box-projection">
        <div className="box-projection__title">Proyección de la composición del congreso</div>
        {params.data.sort((a, b) => b.number > a.number ? 1:-1).map((data,index) => (
            <div 
                key={data.name} 
                className="box-projection__figure"
                style={{backgroundColor: data.color, height: resizeHeight(data.number), zIndex: znum[index]}}
                >
                <span className="box-projection__figure-name">{data.name}</span>
                <span className="box-projection__figure-number">{data.number}</span>
            </div>
        ))}
      </div>
    </>
  )
}

export default Projection
