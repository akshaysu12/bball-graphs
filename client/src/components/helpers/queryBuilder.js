import {traditional} from './options'

const mapping = {
    "Pts": "points", 
    "Reb": "rebounds", 
    "Ast": "assists", 
    "Stl": "steals",
    "Blk": "blocks", 
    "TO": "turnovers", 
    "FG %": "fieldGoalPercentage", 
    "3pt %": "threePtPercentage", 
    "FT %": "freeThrowsPercentage", 
    "OReb": "offensiveRebounds", 
    "DReb": "defensiveRebounds", 
    "PlusMinus": "plusMinus", 
    "ORating": "offensiveRating", 
    "DRating": "defensiveRating", 
    "NetRating": "netRating", 
    "Ast %": "assistPercentage", 
    "Ast to TO": "assistToTurnovers", 
    "AstRatio": "assistRatio", 
    "OReb %": "offensiveReboundPercentage", 
    "DReb %": "defensiveReboundPercentage", 
    "Eff FG %": "effectiveFieldGoalPercentage", 
    "True Shooting %": "trueShootingPercentage", 
    "Usage": "usagePercentage", 
    "Pace": "pace", 
    "PIE": "PIE",
}

const build = (selections) => {
    let select = ''
    let tradSelections = [];
    let advSelections = [];
    selections.forEach(element => {
        if(traditional.includes(element)) {
            tradSelections.push(mapping[element]);
        }
        else {
            advSelections.push(mapping[element])
        }
    });

    if(tradSelections.length > 0) {
        select = `${select} boxScoreTraditional { ${tradSelections.join(' ')} }`
    }
    if(advSelections.length > 0) {
        select = `${select} boxScoreAdvanced { ${advSelections.join(' ')} }`
    }
    // tradSelections.concat(advSelections);
    return {query: select, selections: {boxScoreTraditional: tradSelections, boxScoreAdvanced: advSelections}}
}

export default build