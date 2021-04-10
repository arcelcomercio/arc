// eslint-disable-next-line import/prefer-default-export
export const filterMenu = `{ 
		children {
			name
			_id
			display_name
			url
			node_type
			children {
				name
				_id
				display_name
				url
				node_type
			}
		}
	}`
