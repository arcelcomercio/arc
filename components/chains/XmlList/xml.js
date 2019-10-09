const XmlList = ({ children }) => {
  // Remove null results
  return children.filter(child => !!child)
}

export default XmlList
