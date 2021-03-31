import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import RouterContainer from 'router';
import { Global } from '@emotion/react';
import reset from 'models/reset';

interface IDefinition {
  kind: string;
  operation?: string;
}

const App: React.FunctionComponent = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: { reconnect: true, timeout: 30000 },
  });

  const link = split(
    ({ query }) => {
      const { kind, operation }: IDefinition = getMainDefinition(query);
      // console.log(kind, operation);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const cache = new InMemoryCache({});

  const client = new ApolloClient({
    cache,
    link,
  });

  return (
    <ApolloProvider client={client}>
      <Global styles={reset} />
      <RouterContainer />
    </ApolloProvider>
  );
};

export default App;
