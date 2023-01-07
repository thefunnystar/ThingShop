
import React from 'react'

import { Head,Foot } from '../../HeadFoot'

import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Head/>
      <Outlet />
      <Foot/>
    </>
  )
}

export default Layout
