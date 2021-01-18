import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { usePersistCache } from './hooks/usePersistCache';

interface IDefinition {
  kind: string;
  operation?: string;
}

const App = (): JSX.Element => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [loaded, setLoaded] = useState(false);
  const { cb } = usePersistCache();
  useEffect(() => {
    const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: localStorage.getItem('token') || null,
        },
      });
      return forward(operation);
    });

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: { reconnect: true, timeout: 30000 },
    });

    const httpAuthLink = authMiddleware.concat(httpLink);
    const link = split(
      ({ query }) => {
        const { kind, operation }: IDefinition = getMainDefinition(query);
        console.log(kind, operation);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpAuthLink
    );

    const cache = new InMemoryCache({});

    const client = new ApolloClient({
      cache,
      link,
    });
    cb(cache);
    setClient(client);
    setLoaded(true);
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <div>가나다라마바사</div>
    </ApolloProvider>
  ) : (
    <div>⏰</div>
  );
};

export default App;
