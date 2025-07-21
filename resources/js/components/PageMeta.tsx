
import React, { useEffect } from 'react';

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
    desc.content = description || '';
    document.head.appendChild(desc);



    // Optional cleanup on unmount
    return () => {
      document.head.removeChild(desc);
    };
  }, [title, description, keywords]);

  return null;
}

