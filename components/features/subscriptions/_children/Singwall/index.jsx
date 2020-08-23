/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Login from './_children/login'
import Register from './_children/register'
import Forgot from './_children/forgot'
import { NavigateConsumer } from '../../_context/navigate'

const renderTemplate = (template, site, env) => {
  const templates = {
    login: <Login arcSite={site} arcEnv={env} />,
    register: <Register arcSite={site} arcEnv={env} />,
    forgot: <Forgot />,
  }
  return templates[template] || templates.login
}

const Singwall = ({ arcSite, arcEnv }) => {
  return (
    <NavigateConsumer>
      {({ selectedTemplate }) => (
        <>{renderTemplate(selectedTemplate, arcSite, arcEnv)}</>
      )}
    </NavigateConsumer>
  )
}

export default Singwall
