import App from '../App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    // useQuery,
    // gql
} from "@apollo/client";
import {BrowserRouter} from 'react-router-dom';

const client = new ApolloClient({
    uri:'http:localhost:5000',
    cache: new InMemoryCache()
})

export default (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>
)
