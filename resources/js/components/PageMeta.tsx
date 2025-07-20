import { Head } from '@inertiajs/react'
import React from 'react'
type MetaProps = {
    title: string,
    description : string ,
    keywords:string,
}
export default function PageMeta({title , description , keywords}:MetaProps) {
  return (
      <Head 
      >
          <title   />
          <meta name="description" content={description || ""} />
      </Head>
  )
}
