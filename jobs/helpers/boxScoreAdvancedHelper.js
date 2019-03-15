createAdvancedBoxScoreHelper = (game) => {
    return `{ 
        create: {
            offensiveRating: ${game[12]},
            defensiveRating: ${game[15]},
            netRating: ${game[18]},
            assistPercentage: ${game[20]},
            assistToTurnovers: ${game[21]},
            assistRatio: ${game[22]},
            offensiveReboundPercentage: ${game[23]},
            defensiveReboundPercentage: ${game[24]},
            reboundPercentage: ${game[25]},
            effectiveFieldGoalPercentage: ${game[27]},
            trueShootingPercentage: ${game[28]},
            usagePercentage: ${game[29]},
            pace: ${game[31]},
            PIE: ${game[33]}
        }
    }`
}

module.exports = {
    createAdvancedBoxScoreHelper
}
