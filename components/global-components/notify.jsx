import React from 'react'

const Notify = ({ message }) => {
  return (
    <div className="notify">
      {message &&
        message.map(el => {
          return <p className="notify__text">{el}</p>
        })}
      <button
        type="button"
        onClick={e => (e.target.parentNode.style.display = 'none')}
        className="notify__icon icon-close"
      />
    </div>
  )
}

export default Notify
