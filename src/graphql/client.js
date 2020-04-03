import {ApolloClient} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import {onError} from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http';
import {GRAPHQL_URL, TOKEN} from "../../config";

const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
        "content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `bearer ${TOKEN}`,
    }
});
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: [
                {
                    kind: 'INTERFACE',
                    name: 'Document',
                    possibleTypes: [
                        {name: 'MyInterface1'},
                        {name: 'SomeInterface2'}
                    ]
                }
            ]
        }
    }
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({fragmentMatcher}),
    connectToDevTools: true
})

export default client