import React from 'react';

export function useSEO(title, description, image, url) {
  const updateMetaTags = () => {
    // Title
    document.title = title;
    
    // Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = 'description';
      document.head.appendChild(descTag);
    }
    descTag.content = description;

    // OG Tags
    const tags = [
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      { name: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    tags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (name.startsWith('og:')) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  };

  React.useEffect(() => {
    updateMetaTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, url]);
}

export function getStructuredData(type, data) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  return JSON.stringify(baseStructure);
}

export function addStructuredData(type, data) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = getStructuredData(type, data);
  document.head.appendChild(script);
  return () => document.head.removeChild(script);
}
