import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_POKEMONS } from '../graphql/Queries'
import styled from "@emotion/styled"
import PokemonListSkeleton from './Skeleton'
import { useHistory } from 'react-router'

function GetMyPokemons() {

  const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    background: url("https://media.giphy.com/media/3o7aD3p4IEjnsLTNCg/giphy.gif") no-repeat fixed center;
    background-size: 30%;
  `

  const Card = styled.div`
    background-color: #f1f1f1;
    border-radius: 10px;
    width: 100px;
    margin: 10px;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
    &:hover {
      background-color: yellow;
    }
  `

  const Button = styled.button`
  border-radius: 10px;
  padding: 10px 
  background-color: white; 
  color: black; 
  &:hover {
    background-color: yellow;
    color: black;
  }
`
  const MyPokemons = JSON.parse(localStorage.getItem('mypokemon'))
  const [state, newState] = useState(MyPokemons)
  // console.log(state, "<<< state")

  const history = useHistory()
  const ReleasePokemon = (name) => {
    MyPokemons.map((item, i) => {
      if (item.name == name) {
        MyPokemons.splice(i, 1)
      }
      newState(MyPokemons)
      localStorage.setItem('mypokemon', JSON.stringify(state))
    })
    history.push('/')
  }

  useEffect(() => {
    console.log('change')
  }, [state])

  return (
    <CardContainer>
      {state ?
        state.map((item, i) => {
          return (
            <Card>
              <img src={item.image} />
              <p>
                {item.name}
              </p>
              <Button
                onClick={() => {
                  ReleasePokemon(item.name)
                }}
              >
                Release
              </Button>
            </Card>
          )
        })
        : <PokemonListSkeleton />
      }
    </CardContainer>
  )
}

export default GetMyPokemons