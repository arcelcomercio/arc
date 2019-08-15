import React from 'react';


const Notify = ({ message}) => {
	return (
		<div style={{position: 'fixed',
			top: '0px',
			left: '0px',
			width: '100%',
			display: 'flex',
			padding: '20px',
			backgroundColor: 'tomato'}}>
			<p style={{color: 'white',}}>{message}</p>
		</div>
	)
}

export default Notify