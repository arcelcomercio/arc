import React from 'react'

const getFiveDays = (comingDate) => {
	let fecha;
	if (comingDate) {
		const arrDate = comingDate.split('-')
		fecha = arrDate
			.map(el => el.startsWith('0') ? el.slice(1) : el)
			.map(el => Number(el))
			.map((el, index) => index === 1 ? (el - 1) : el)
	}

	const date = fecha ? new Date(...fecha) : new Date()
	// const daysInThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	const daysInPastMonth = new Date(date.getFullYear(), (date.getMonth() + 1) - 1, 0).getDate()
	const pastMonth = new Date(date.getFullYear(), (date.getMonth() + 1) - 1, 0).getMonth() + 1
	const formarPastMonth = pastMonth < 10 ? `0${pastMonth}` : pastMonth
	const today = date.getDate()
	const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)
	// const year = date.getFullYear()
	const fiveDays = []
	let ciclo = 0

	for (let i = today; i > (today - 5); i--) {
		if (i < 1) {
			fiveDays.push(`${daysInPastMonth - ciclo}/${formarPastMonth}`)
			ciclo += 1
		} else {
			const formatDay = i < 10 ? `0${i}` : i
			fiveDays.push(`${formatDay}/${month}`)
		}
	}

	return fiveDays.reverse()
}


const evalDate = () => {
	const dateTest = ''
	return dateTest && dateTest !== '' ? getFiveDays(dateTest) : getFiveDays()
}

const dateIterator = evalDate()

const renderPagination = () => {
	return(
		<div className="pagination-file">
			<ul className="pagination-file__list">
				<li className="pagination-file__item">
					<a className="pagination-file__link" href="/">Anterior</a>
				</li>
				{dateIterator.map((el, index) => {
					return <li key={index} className={`pagination-file__item ${index === dateIterator.length - 1 ? 'active' : ''}`}>
									{
										index === dateIterator.length - 1 
										? <p className="pagination-file__link">{el}</p>
										: <a className="pagination-file__link" href="/">{el}</a>
									}
									
								</li>
				})}
				<li className="pagination-file__item">
					<a className="pagination-file__link" href="/">Siguiente</a>
				</li>
			</ul>
		</div>
	)
}

export default renderPagination