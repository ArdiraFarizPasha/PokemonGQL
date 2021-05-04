import { useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { GET_POKEMONS, GET_POKEMONS_DETAIL } from '../graphql/Queries'
import styled from "@emotion/styled"
import PokemonListSkeleton from './Skeleton'
import GetPokemonDetail from './GetPokemonDetail'
import { useHistory } from 'react-router'
import { PokemonContext } from '../hooks/PokemonContext'
import { RootContext } from '../App'



function GetPokemons() {
  const { image, setImage } = useContext(PokemonContext)
  // console.log(image, "<<< image")

  const { error, loading, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 100,
      offset: 1
    }
  })

  const history = useHistory()

  const GetDetail = (name, image) => {
    setImage(image)
    localStorage.setItem('image', image)
    history.push(`/pokemon/detail/${name}`)
  }

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

  return (
    <CardContainer>
      {data ?
        data.pokemons.results.map((item, i) => {
          return (
            <Card>
              <img src={item.image} />
              <p>
                {item.name}
              </p>
              <Button
                onClick={() => {
                  GetDetail(item.name, item.image)
                }}
              >
                Detail
              </Button>
            </Card>
          )
        })
        : <PokemonListSkeleton />
      }
    </CardContainer>
  )
}

export default GetPokemons

