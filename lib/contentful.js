import { createClient } from 'contentful';
import {
  contentfulSpaceId,
  contentfulPreviewKey,
  contentfulDeliveryKey,
} from '../config';

const client = (function() {
  let instance;

  function createInstance() {
    const useDelivery =
      process.env.NODE_ENV === 'production' && !process.env.STAGING;

    return createClient({
      host: useDelivery ? 'cdn.contentful.com' : 'cdn.contentful.com',
      // : 'preview.contentful.com',
      space: contentfulSpaceId,
      accessToken: useDelivery
        ? contentfulDeliveryKey
        : contentfulDeliveryKey,
      // : contentfulPreviewKey,
    });
  }

  return instance ? instance : createInstance();
}());

export default client;
