export const schemaFilter = `{
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
			}
	}
}
`
