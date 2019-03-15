var queue = require('bull')
const axios = require('axios');
const {parseMatchUpData} = require('./matchUpHelper')
const {createTradBoxScoreHelper} = require('./helpers/boxScoreTraditionalHelper')

const inputData = {
    'playerId': 201939,
    'seasonType': "Regular+Season" 
}

var boxScoreTraditionalAllSeasonsJob = async (input) => {
    data = input.data
    var url = `https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=${data.playerId}`
    var profile = await axios.get(url)
    var seasons = profile.data.resultSets[0].rowSet.map(seasonTotals => seasonTotals[1])
    console.log(seasons)
    for (const season of seasons) {
        var url = `https://stats.nba.com/stats/playergamelogs?PlayerID=${data.playerId}&Season=${season}&SeasonType=${data.seasonType}`
        try {
            var res = await axios.get(url)
            var games = res.data.resultSets[0].rowSet
            var numGames = 0;
            for(var game of games) {
                await createGame(game, numGames)
                numGames = numGames + 1
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

var createGame = async (game, num) => {
    try {
        var matchup = parseMatchUpData(game[8])
        await axios({
            url: 'http://localhost:4000',
            method: 'post',
            data: {
                query: `mutation {
                    CreateGame(
                    nbaStatsId: ${game[1]},
                    nbaGameId: "${game[6]}",
                    season: "${game[0]}", 
                    date: "${game[7]}",
                    result:"${game[9]}",
                    home: ${matchup.isHome},
                    team: "${matchup.Team}",
                    opponent: "${matchup.Opponent}",
                    box: ${createTradBoxScoreHelper(game)}
                    ) {
                        boxScoreTraditional {
                        points
                        }
                    }
                }`  
            } 
        })
        console.log(num)
    }
    catch(e) {
        console.log("error: ", e)
    }
}

var jobQueue = new queue('boxScoreTraditionalQueue', 'redis://127.0.0.1:6379')
jobQueue.on('completed', async (job, result) => {
    console.log("completed")
})

var createJob = async () => {
    await jobQueue.add('createGame', inputData)
    await jobQueue.process('createGame', boxScoreTraditionalAllSeasonsJob)
}
createJob();
