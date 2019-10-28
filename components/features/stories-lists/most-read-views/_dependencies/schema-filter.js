export default arcSite => {
  return `
		{
			content_elements {
				headlines { basic }
				websites {
        	${arcSite} {
          	website_url
        	}
      	}
			}
		}
	`
}
