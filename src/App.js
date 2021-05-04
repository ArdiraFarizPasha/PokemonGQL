import React, { createContext, useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import GetPokemons from './components/GetPokemons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from '@emotion/styled';
import { PokemonContext } from './hooks/PokemonContext';
import GetPokemonDetail from './components/GetPokemonDetail';
import GetMyPokemons from './components/GetMyPokemons';

const MenuContainer = styled.div`
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
  cursor: pointer;
`

const Menu = styled.button`
  border-radius: 10px;
  padding: 10px 
  background-color: white; 
  color: black; 
  &:hover {
    background-color: yellow;
    color: black;
  }
`

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql' })
])

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: link
});

function App() {
  const [image, setImage] = useState('')

  return (
    <ApolloProvider client={client}>
      <Router>
        <MenuContainer>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Menu>
              Pokemon List
              </Menu>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/mypokemons">
            <Menu>
              My Pokemon
              </Menu>
          </Link>
        </MenuContainer>
        <hr />

        <Switch>
          <PokemonContext.Provider value={{ image, setImage }}>
            <Route exact path="/" component={GetPokemons} />
            <Route exact path="/pokemon/detail/:name" component={GetPokemonDetail} />
            <Route exact path="/mypokemons" component={GetMyPokemons} />
          </PokemonContext.Provider>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
export default App;