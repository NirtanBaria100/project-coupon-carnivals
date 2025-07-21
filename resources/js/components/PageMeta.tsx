
import React from 'react';
import { Helmet } from 'react-helmet';

type MetaProps = {
  title: string,
  description: string,
  keywords: string,
}

export default function PageMeta({ title, description, keywords }: MetaProps) {

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || 'Find the best coupons and offers.'} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

