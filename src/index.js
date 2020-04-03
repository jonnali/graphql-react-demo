import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from "react-apollo";
import client from './graphql/client'
import App from './App'

import './style/base.css'


ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById("root")
);