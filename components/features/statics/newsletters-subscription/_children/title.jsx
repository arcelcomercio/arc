import React from 'react'

function NewslettersSubscriptionTitle(props) {
  return (
    <>
      <h1 className="newsletters-subscription__title line-h-none w-full bg-gray-300 text-white text-center flex justify-center items-center bg-secondary">
        <a
          href="/newsletters/"
          className="newsletters-subscription__link primary-font font-bold uppercase text-white">
          NEWSLETTERS
        </a>
      </h1>
    </>
  )
}

export default NewslettersSubscriptionTitle
