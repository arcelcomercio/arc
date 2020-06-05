import React from 'react'

const classes = {
  title:
    'newsletters-subscription__title primary-font font-bold uppercase line-h-none w-full bg-gray-300 text-white flex justify-center items-center',
}
function NewslettersSubscriptionTitle() {
  return (
    <>
      <h1 itemProp="name" className={classes.title}>NEWSLETTERS</h1>
    </>
  )
}

export default NewslettersSubscriptionTitle
