//libs
import {useMemo} from 'react';
import {ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

//typeDefs
import {typeDefs} from '@/server/graphql/schema';
import {PageProps} from '@/types/PageProps';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createIsomorphLink = (): ApolloLink => {
  const {HttpLink} = require('@apollo/client/link/http');

  return new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  }) as ApolloLink;
};

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
    typeDefs,
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps

    /* eslint-disable */
    const data: NormalizedCacheObject = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: Array<object>, sourceArray: Array<object>): Array<object> => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });
    /* eslint-enable */

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(pageProps: PageProps): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  return useMemo(() => initializeApollo(state), [state]);
}

export function addApolloState<T extends {props: object}>(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: undefined | T,
) {
  if (pageProps?.props) {
    //@ts-ignore
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
