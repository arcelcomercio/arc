const c = (classList = []) => {
  const classes = classList.reduce((prev, claz = [], index) => {
    const type = Array.isArray(claz) ? 'array' : typeof claz

    switch (type) {
      case 'array':
        // eslint-disable-next-line no-case-declarations
        const [name, status] = claz
        if (status) prev.push(name)
        break
      case 'string':
        prev.push(claz)
        break
      default:
    }
    return prev
  }, [])
  return classes.join(' ')
}

export default c
