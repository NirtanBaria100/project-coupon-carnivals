
import React, { useEffect } from 'react'

type MetaProps = {
  title: string,
  description: string,
  keywords: string,
}

export default function PageMeta({ title, description, keywords }: MetaProps) {
  useEffect(() => {
    document.title = title;

    const desc = document.createElement('meta');
    desc.name = 'description';
    desc.content = description || 'Find the best coupons and offers.';
    document.head.appendChild(desc);

    // const keyw = document.createElement('meta');
    // keyw.name = 'keywords';
    // keyw.content = `${keywords}, coupons, discounts, deals`;
    // document.head.appendChild(keyw);

    // Optional cleanup on unmount
    return () => {
      document.head.removeChild(desc);
    };
  }, [title, description]);

  return null;
}

