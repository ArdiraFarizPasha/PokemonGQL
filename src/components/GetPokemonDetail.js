import { useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { GET_POKEMONS, GET_POKEMONS_DETAIL } from '../graphql/Queries'
import styled from "@emotion/styled"
import PokemonListSkeleton from './Skeleton'
import { useParams } from 'react-router'
import { PokemonContext } from '../hooks/PokemonContext'
import { Skeleton } from '@material-ui/lab'
import Swal from 'sweetalert2'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


function GetPokemonDetail() {

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();

  const { name } = useParams()

  const { error, loading, data } = useQuery(GET_POKEMONS_DETAIL, {
    variables: {
      name: name
    }
  })

  console.log(data, "<< data query")

  const { image } = useContext(PokemonContext)

  const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    background: url("https://media.giphy.com/media/3o7aD3p4IEjnsLTNCg/giphy.gif") no-repeat fixed center;
    background-size: 30%;
  `

  const Card = styled.div`
    overflow-x:auto;
    background-color: #f1f1f1;
    justify-content: center;
    border-radius: 10px;
    width: 1000px;
    height: 1000px;
    margin: 10px;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
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


  const AddPokemon = (image) => {
    const MyPokemon = localStorage.getItem('mypokemon') || localStorage.setItem('mypokemon', '[]')
    const chance = Math.floor(Math.random() * 2);
    if (chance == 1) {
      const obj = {
        name: '',
        image: ''
      }
      Swal.fire({
        icon: 'success',
        title: `Congratulation! You are a great Pokémon Poacher! Here, you can change your pokemon's name if you want to`,
        html: `<input type="text" id="pokemonNewName" class="swal2-input" placeholder="New Name">`,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          obj.name = Swal.getPopup().querySelector('#pokemonNewName').value
          obj.image = image
          let oldData = JSON.parse(MyPokemon)
          oldData.push(obj)
          localStorage.setItem('mypokemon', JSON.stringify(oldData))
        },
        allowOutsideClick: () => Swal.isLoading()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: `Oh No! ${name} is runaway!`,
        text: 'Better luck next time, Try Again!',
      })
    }
  }

  return (
    <CardContainer>
      <Card>
        <img src={localStorage.getItem('image')} />
        <h1>
          {name}
        </h1>
        <Button
          onClick={() => { AddPokemon(localStorage.getItem('image')) }}
        >
          catch
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Moves
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {data ? data.pokemon.moves.map((item, i) => {
                  return (
                  <TableCell>
                    {item.move.name}
                  </TableCell>)
                }) : <Skeleton />}
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>
                  Types
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {data ? data.pokemon.types.map((item, i) => {
                  return (
                  <TableCell>
                    {item.type.name}
                  </TableCell>)
                }) : <Skeleton />}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </CardContainer>
  )
}

export default GetPokemonDetail

