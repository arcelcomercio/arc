const appendScript = (code, position = 'body') => {
	const script = document.createElement('script')
	script.type = 'text/javascript'
	script.textContent = code
	if(position === 'head') return document.head.append(script)
	return document.body.append(script)
}

export default appendScript