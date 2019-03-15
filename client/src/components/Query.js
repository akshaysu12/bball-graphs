import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Game from './Game'
import build from './helpers/queryBuilder'

const Player = ({playerName, selections, last, first}) => {

    const select = build(selections);
    const GAME_QUERY = gql`
    query data($playerName: String, $last: Int, $first: Int){
        Players(filter: $playerName) {
            name
            Games(orderBy: date_ASC last:$last first: $first) {
                ${select.query}
            }
        }
    }`
        return(
            <Query query={GAME_QUERY} variables={{playerName, last, first}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
        
              return (
                <div>
                    <Game data={data.Players[0]} selections={select.selections}/>
                </div>
              )
            }}
          </Query>
        )
}

export default Player