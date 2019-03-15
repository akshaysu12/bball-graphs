createTradBoxScoreHelper = (game) => {
    return `{ 
        create: {
            points: ${game[30]},
            minutes: ${game[10]},
            fieldGoalsMade: ${game[11]},
            fieldGoalsAttempted: ${game[12]},
            fieldGoalPercentage: ${game[13]},
            threePtsMade: ${game[14]},
            threePtsAttempted: ${game[15]},
            threePtPercentage: ${game[16]},
            freeThrowsMade: ${game[17]},
            freeThrowsAttempts: ${game[18]},
            freeThrowsPercentage: ${game[19]},
            rebounds: ${game[20]},
            offensiveRebounds: ${game[21]},
            defensiveRebounds: ${game[22]},
            assists: ${game[23]},
            steals: ${game[25]},
            blocks: ${game[26]},
            turnovers: ${game[24]},
            plusMinus: ${game[31]}
        }
    }`
}

module.exports = {
    createTradBoxScoreHelper
}
