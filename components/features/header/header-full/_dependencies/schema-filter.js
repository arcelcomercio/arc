export const filterHeader = `{ 
		children {
			name
			_id
			display_name
			url
			node_type
		}
	}`

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
