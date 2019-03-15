var queue = require('bull')
const axios = require('axios');
const {createAdvancedBoxScoreHelper} = require('./helpers/boxScoreAdvancedHelper')

const inputData = {
    'playerId': 2544,
    'season': "2017-18",
    'seasonType': "Regular+Season" 
}

var boxScoreAdvancedJob = async (input) => {
    data = input.data
    var url = `https://stats.nba.com/stats/playergamelogs?MeasureType=Advanced&PlayerID=${data.playerId}&Season=${data.season}&SeasonType=${data.seasonType}`
    try {
        var res = await axios.get(url)
        var games = res.data.resultSets[0].rowSet
        createGame(games[0], 0)
        // var numGames = 0;
        // for(var game of games) {
        //     await createGame(game, numGames)
        //     numGames = numGames + 1
        // }
    }
    catch(e) {
        console.log(e)
    }
}

var createGame = async (game, num) => {
    try {
        await axios({
            url: 'http://localhost:4000',
            method: 'post',
            data: {
                query: `mutation {
                    CreateBoxScoreAdvanced(
                    nbaStatsId: "${game[1]}",
                    nbaGameId: "${game[6]}",
                    box: ${createAdvancedBoxScoreHelper(game)}
                    ) {
                        boxScoreAdvanced {
                        PIE
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

var jobQueue = new queue('boxScoreAdvancedQueue', 'redis://127.0.0.1:6379')
jobQueue.on('completed', async (job, result) => {
    console.log("completed")
})

var createJob = async () => {
    await jobQueue.add('createGame', inputData)
    await jobQueue.process('createGame', boxScoreAdvancedJob)
}
createJob();
