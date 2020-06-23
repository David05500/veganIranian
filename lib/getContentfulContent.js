import contentfulClient from './contentful';

async function getContentfulContent(contentType, slug) {
  // TODO add error catching e.g. network connection
  if (slug) {
    const res = await contentfulClient.getEntries({
      content_type: contentType,
      'fields.slug': slug,
    });
    if (res.items.length > 0) {
      return { [contentType]: res.items[0].fields };
    }
    // if post/whitepaper/etc not found, return 404
    res.statusCode = 404;
    return { error: 'NOT_FOUND' };
  }
  throw new Error('no slug');
}

export default getContentfulContent;
