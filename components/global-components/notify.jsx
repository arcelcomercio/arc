import React from 'react'

const Notify = ({ message }) => {
  return (
    <div className="notify">
      <p className="notify__text">{message}</p>
      <button
        type="button"
        onClick={e => (e.target.parentNode.style.display = 'none')}
        className="notify__icon icon-close"
      />
    </div>
  )
}

export default Notify
