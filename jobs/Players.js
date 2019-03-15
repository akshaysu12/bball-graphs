const axios = require('axios')
var queue = require('bull')

const inputData = {
    'nbaStatsId': 201939,
    'name': "Stephen Curry"
}

var createPlayer = async (input) => {
    var data = input.data
    var url = `https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=${data.playerId}`
    try {
        var res = await axios.get(url)
        var seasons = res.data.resultSets[0].rowSet.map(seasonTotals => seasonTotals[1])
        var mut = await axios({
            url: 'http://localhost:4000',
            method: 'post',
            headers:  {'Content-Type': 'application/json'},
            data: {
                query: `mutation {
                    Player(nbaStatsId: ${data.nbaStatsId}, name: "${data.name}") {
                      name
                    }
                  }`
            } 
        })
    }
    catch(e) {
        console.log("error: ", e)
    }
}

var jobQueue = new queue('boxScoreTraditionalQueue', 'redis://127.0.0.1:6379')

var jobQueue = new queue('boxScoreTraditionalQueue', 'redis://127.0.0.1:6379')

jobQueue.on('completed', async (job, result) => {
    console.log("completed")
})

var createJob = async () => {
    await jobQueue.add('createPlayer', inputData)
    await jobQueue.process('createPlayer', createPlayer)
}
createJob();


