import React, { Component } from 'react'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Movielist from './components/Movielist'
import NewMovieForm from './components/NewMovieForm'
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
            <Movielist/>
            <NewMovieForm/>
        </div>
      </ApolloProvider>
    )
  }
}
