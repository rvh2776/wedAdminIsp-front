
import Dashboard from '@/components/Dashboard/Dashboard'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
    <Dashboard page={params.slug} />
    </>
  )
}

export default page;