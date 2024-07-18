// conect the sanity client withn react app

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// all of the configuration will be getted from sanity manager use sanity manage cmmand
// now u can use sanity client to fetch real data from sanity dashboard
export const client = createClient({
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-09-18',
    useCdn: true,
    token: import.meta.env.VITE_APP_SANITY_CLIENT
});
// useful for our images
const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);