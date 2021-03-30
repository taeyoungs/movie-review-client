import React from 'react';
import {
  ApolloClient,
  ApolloLink,
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
import Cookie from 'js-cookie';

interface IDefinition {
  kind: string;
  operation?: string;
}

const App: React.FunctionComponent = () => {
  const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = Cookie.get('token');
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    }));
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
      // console.log(kind, operation);
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

  return (
    <ApolloProvider client={client}>
      <Global styles={reset} />
      <RouterContainer />
    </ApolloProvider>
  );
};

export default App;
