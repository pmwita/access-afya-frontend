import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
        }),
        cache: new InMemoryCache(),
    });
};
