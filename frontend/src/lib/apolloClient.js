import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql',  // GraphQL endpoint'inizi buraya yazın
  }),
  cache: new InMemoryCache(),
});

export default client;