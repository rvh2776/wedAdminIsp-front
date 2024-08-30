import { Navbar } from '@/components/LandinPage/Navbar'
import Login from '@/components/Login/Login'

import React from 'react'

const page = ({ params }: { params: { slug: number } }) => {
  return (
    <>
        <Navbar />
        <Login page={params.slug} />
    </>

  )
}

export default page