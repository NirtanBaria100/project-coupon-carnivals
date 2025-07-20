import { Head } from '@inertiajs/react'
import React from 'react'
type MetaProps = {
    title: string,
    description : string ,
    keywords:string,
}
export default function PageMeta({title , description , keywords}:MetaProps) {
  return (
      <Head >
            <title>{title}</title>
          <meta name="description" content={description || "Find the best coupons and offers."} />
          <meta name="keywords" content={`${keywords}, coupons, discounts, deals`} />
      </Head>
  )
}
