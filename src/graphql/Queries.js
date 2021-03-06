import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query pokemons ($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

export const GET_POKEMONS_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
    }
  }
`