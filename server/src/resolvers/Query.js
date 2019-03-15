async function Players(parent, args, context, info) {
    
    return queriedGames = await context.prisma.query.players({ 
        where: {
            name: args.filter
        },
    }, info)
}

async function Teams(parent, args, context, info) {
    return await context.prisma.query.teams({}, info)
}

module.exports = {
    Players,
    Teams
}