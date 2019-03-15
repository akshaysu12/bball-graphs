 const teams = {
         "ATL": "Atlanta Hawks",
         "BOS": "Boston Celtics",
         "BKN": "Brooklyn Nets",
         "CHA": "Charlotte Hornets",
         "CHI": "Chicago Bulls",
         "CLE": "Cleveland Cavaliers", 
         "DAL": "Dallas Mavericks",
         "DEN": "Denver Nuggets",
         "DET": "Detroit Pistons",
         "GSW": "Golden State Warriors",
         "HOU": "Houston Rockets",
         "IND": "Indiana Pacers",
         "LAC": "Los Angeles Clippers",
         "LAL": "Los Angeles Lakers",
         "MEM": "Memphis Grizzlies",
         "MIA": "Miami Heat",
         "MIL": "Milwaukee Bucks",
         "MIN": "Minnesota Timberwolves",
         "NOP": "New Orleans Pelicans",
         "NYK": "New York Knicks",
         "OKC": "Oklahoma City Thunder",
         "ORL": "Orlando Magic", 
         "PHI": "Philadelphia 76ers",
         "PHX": "Phoenix Suns",
         "POR": "Portland Trail Blazers",   
         "SAC": "Sacramento Kings",
         "SAS": "San Antonio Spurs",
         "TOR": "Toronto Raptors",
         "UTA": "Utah Jazz",
         "WAS": "Washington Wizards"
}   

class matchUpModel {
    constructor(isHome, opponent, team) {
        this.isHome = isHome
        this.Opponent = opponent
        this.Team = team
    }
}

parseMatchUpData = (match) => {
    var home = match[4]
    var opponent = home === "@" ? (match[6] + match[7] + match[8]) : (match[8] + match[9] + match[10]) 
    var team = match[0] + match[1] + match[2]
    return new matchUpModel(home === "vs." ? true : false, teams[opponent], teams[team])
}

module.exports = {
    parseMatchUpData
} 
