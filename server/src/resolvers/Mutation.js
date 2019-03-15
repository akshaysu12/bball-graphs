async function Player(parent, args, context, info) {
    return context.prisma.mutation.createPlayer({
        data: {
            nbaStatsId: args.nbaStatsId,
            name: args.name
        }
    }, info)
}

async function CreateGame(parent, args, context, info) {

    const selectionSet = ` { id, name } `

    var teams = await context.prisma.query.teams({}, selectionSet)
    var team = teams.filter(element => {
        if(element.name === args.team) { return element }
    })
    var opponent = teams.filter(element => {
        if(element.name === args.opponent) { return element }
    })

    return await context.prisma.mutation.createGame({
        data: {
            player: { connect: {nbaStatsId: args.nbaStatsId} },
            nbaGameId: args.nbaGameId,
            season: args.season,
            date: args.date,
            result: args.result,
            home: args.home,
            team: { connect: {id: team[0].id}},
            opponent: { connect: {id: opponent[0].id}},
            boxScoreTraditional: {
                create: {
                    points: args.box.create.points,
                    minutes: args.box.create.minutes,
                    fieldGoalsMade: args.box.create.fieldGoalsMade,
                    fieldGoalsAttempted: args.box.create.fieldGoalsAttempted,
                    fieldGoalPercentage: args.box.create.fieldGoalPercentage,
                    threePtsMade: args.box.create.threePtsMade,
                    threePtsAttempted: args.box.create.threePtsAttempted,
                    threePtPercentage: args.box.create.threePtPercentage,
                    freeThrowsMade: args.box.create.freeThrowsMade,
                    freeThrowsAttempts: args.box.create.freeThrowsAttempts,
                    freeThrowsPercentage: args.box.create.freeThrowsPercentage,
                    rebounds: args.box.create.rebounds,
                    offensiveRebounds: args.box.create.offensiveRebounds,
                    defensiveRebounds: args.box.create.defensiveRebounds,
                    assists: args.box.create.assists,
                    steals: args.box.create.steals,
                    blocks: args.box.create.blocks,
                    turnovers: args.box.create.turnovers, 
                    plusMinus: args.box.create.plusMinus,
                }}
        }
    }, info)
}

async function CreateBoxScoreAdvanced(parent, args, context, info) {
    return await context.prisma.mutation.updateGame({
        where: {
            nbaGameId: args.nbaGameId
        },
        data: {
            boxScoreAdvanced: {
                create: {
                    offensiveRating: args.box.create.offensiveRating,
                    defensiveRating: args.box.create.defensiveRating,
                    netRating: args.box.create.netRating,
                    assistPercentage: args.box.create.assistPercentage,
                    assistToTurnovers: args.box.create.assistToTurnovers,
                    assistRatio: args.box.create.assistRatio,
                    offensiveReboundPercentage: args.box.create.offensiveReboundPercentage,
                    defensiveReboundPercentage: args.box.create.defensiveReboundPercentage,
                    reboundPercentage: args.box.create.reboundPercentage,
                    effectiveFieldGoalPercentage: args.box.create.effectiveFieldGoalPercentage,
                    trueShootingPercentage: args.box.create.trueShootingPercentage,
                    usagePercentage: args.box.create.usagePercentage,
                    pace: args.box.create.pace,
                    PIE: args.box.create.PIE,
                }
            }
        }
    }, info)
}

async function DeleteGames(parent, args, context, info) {
    return await context.prisma.mutation.deleteManyGames({
        where: {
            season_contains: "20",
            player: {
              name: args.filter
            }
    }, info})
}

async function DeleteBoxScoresTraditional(parent, args, context, info) {
    return await context.prisma.mutation.deleteManyBoxScoreTraditionals({
        where: {
            points_not: -1
    }, info})
}

async function DeleteBoxScoresAdvanced(parent, args, context, info) {
    return await context.prisma.mutation.deleteManyBoxScoreAdvanceds({
        where: {
            offensiveRating_not: -1.0
    }, info})
}

async function Team(parent, args, context, info) {
    return await context.prisma.mutation.createTeam({
        data : {
            nbaStatsId: args.nbaStatsId,
            name: args.name, 
            conference: args.conference
        }
    , info})
}

async function Teams(parent, args, context, info) {
    const selectionSet = ` { id, nbaStatsId, name, conference } `
    var response = [];

    for(var team of args.teams) {
        var result = await context.prisma.mutation.createTeam({
            data : {
                nbaStatsId: team.nbaStatsId,
                name: team.name, 
                conference: team.conference
            }
        , selectionSet})
    }
    return response;
}

module.exports = {
    Player,
    CreateGame,
    CreateBoxScoreAdvanced,
    DeleteGames,
    DeleteBoxScoresTraditional,
    DeleteBoxScoresAdvanced,
    Team,
    Teams,
}