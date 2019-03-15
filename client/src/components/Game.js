import React from 'react'
import { Line  } from 'react-chartjs-2'
import {colors, borderColors} from './helpers/colors'

const Game = (props) => {
    let data = [];
    Object.keys(props.selections).forEach(key => {
        props.selections[key].forEach((dataType, i) => {
            data.push({
                label: dataType,
                data: props.data.Games.map(game => game[key][dataType]),
                backgroundColor: colors[i],
                borderColor: borderColors[i],
                borderWidth: 1
            }) 
        })
    })

    const graph = { 
        labels: props.data.Games.map((game, i) =>  `Game ${i}`),
        datasets: data,
    }

    const options = {  
        scales:{  
            yAxes:[  
                {  
                    ticks: {  
                        beginAtZero:true
                    }
                }
            ]
        },
        legend: {
            display: true,
            position: 'top'
        }
    }

    return(
        <Line data={graph} options={options}/>
    )
    
}

export default Game