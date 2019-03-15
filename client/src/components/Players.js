import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
    query GetAllPlayers{
        Players {
            name
        }
    }`

function Player ({
    data: {Players, loading},
    inputValue,
    selectedItem,
    highlightedIndex,
    getItemProps,
  }) {
    if (loading) {
        return <div>Loading...</div>
      }
      return (
        <div>
          {Players.filter(player => player.name.includes(inputValue))
                            .map( (item, index) => (
                                <li {...getItemProps({
                                    key: item.name,
                                    index,
                                    item,
                                    style: {
                                        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                    },
                                })}>
                                    {item.name}
                                </li>
                            ))}
        </div>
      )
}

const Players = graphql(query)(Player);


export default Players