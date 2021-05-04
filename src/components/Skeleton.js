import React from 'react'
import styled from "@emotion/styled"
import { Skeleton } from "@material-ui/lab"

export default function PokemonListSkeleton () {
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
  let skeleton = [0,0,0,0,0]
  return (
    <>
      {skeleton.map(() => {
        return (
          <Card>
            <Skeleton variant="rect" height={118} />
            <Skeleton />
            <Skeleton />
          </Card>
        )
      })}
    </>
  )
}