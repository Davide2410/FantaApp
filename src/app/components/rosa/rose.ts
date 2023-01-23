export interface Rose {
    // PLAYER SQUAD
    "response": [
        {

            "team": {
                id: number,
                name: string,
                logo: string
            },
            "players": [
                {
                    id: number,
                    name: string,
                    age: number,
                    number: number,
                    position: string,
                    photo: string
                }
            ]
        }
    ]
}
export interface RoseTeam {
    id: number,
    name: string,
    age: number,
    number: number,
    position: string,
    photo: string
}

export interface Club {
    id: number,
    name: string,
    logo: string
}

export interface Search {
    search: string
}

export interface SearchData {
    response: [
        {
            "player": {
                "id": number,
                "name": string,
                "firstname": string,
                "lastname": string,
                "age": number,
                "birth": {
                    "date": string,
                    "place": string,
                    "country": string
                },
                "nationality": string,
                "height": string,
                "weight": string,
                "injured": false,
                "photo": string
            },
            "statistics": [
                {
                    "team": {
                        "id": number,
                        "name": string,
                        "logo": string
                    },
                    "league": {
                        "id": number,
                        "name": string,
                        "country": string,
                        "logo": string,
                        "flag": string,
                        "season": number
                    },
                    "games": {
                        "appearences": number,
                        "lineups": number,
                        "minutes": number,
                        "number": null,
                        "position": string,
                        "rating": string,
                        "captain": false
                    },
                    "substitutes": {
                        "in": number,
                        "out": number,
                        "bench": number
                    },
                    "shots": {
                        "total": number,
                        "on": number
                    },
                    "goals": {
                        "total": number,
                        "conceded": number,
                        "assists": number,
                        "saves": null
                    },
                    "passes": {
                        "total": number,
                        "key": number,
                        "accuracy": number
                    },
                    "tackles": {
                        "total": number,
                        "blocks": null,
                        "interceptions": number
                    },
                    "duels": {
                        "total": number,
                        "won": number
                    },
                    "dribbles": {
                        "attempts": number,
                        "success": number,
                        "past": null
                    },
                    "fouls": {
                        "drawn": number,
                        "committed": number
                    },
                    "cards": {
                        "yellow": number,
                        "yellowred": number,
                        "red": 1
                    },
                    "penalty": {
                        "won": null,
                        "commited": null,
                        "scored": number,
                        "missed": number,
                        "saved": null
                    }
                },
                {
                    "team": {
                        "id": number,
                        "name": string,
                        "logo": string
                    },
                    "league": {
                        "id": number,
                        "name": string,
                        "country": string,
                        "logo": string,
                        "flag": string,
                        "season": number
                    },
                    "games": {
                        "appearences": number,
                        "lineups": number,
                        "minutes": number,
                        "number": null,
                        "position": string,
                        "rating": string,
                        "captain": false
                    },
                    "substitutes": {
                        "in": number,
                        "out": number,
                        "bench": number
                    },
                    "shots": {
                        "total": number,
                        "on": number
                    },
                    "goals": {
                        "total": number,
                        "conceded": null,
                        "assists": number,
                        "saves": null
                    },
                    "passes": {
                        "total": number,
                        "key": number,
                        "accuracy": number
                    },
                    "tackles": {
                        "total": number,
                        "blocks": number,
                        "interceptions": number
                    },
                    "duels": {
                        "total": null,
                        "won": null
                    },
                    "dribbles": {
                        "attempts": number,
                        "success": number,
                        "past": null
                    },
                    "fouls": {
                        "drawn": number,
                        "committed": number
                    },
                    "cards": {
                        "yellow": number,
                        "yellowred": number,
                        "red": number
                    },
                    "penalty": {
                        "won": number,
                        "commited": null,
                        "scored": number,
                        "missed": number,
                        "saved": null
                    }
                },
                {
                    "team": {
                        "id": number,
                        "name": string,
                        "logo": string
                    },
                    "league": {
                        "id": 61,
                        "name": string
                        "country": string,
                        "logo": string,
                        "flag": string,
                        "season": number
                    },
                    "games": {
                        "appearences": number,
                        "lineups": number,
                        "minutes": number,
                        "number": null,
                        "position": string,
                        "rating": string,
                        "captain": false
                    },
                    "substitutes": {
                        "in": number,
                        "out": number,
                        "bench": number
                    },
                    "shots": {
                        "total": number,
                        "on": number
                    },
                    "goals": {
                        "total": number,
                        "conceded": null,
                        "assists": number,
                        "saves": null
                    },
                    "passes": {
                        "total": number,
                        "key": number,
                        "accuracy": number
                    },
                    "tackles": {
                        "total": number,
                        "blocks": number,
                        "interceptions": number
                    },
                    "duels": {
                        "total": number,
                        "won": number
                    },
                    "dribbles": {
                        "attempts": number,
                        "success": number,
                        "past": null
                    },
                    "fouls": {
                        "drawn": number,
                        "committed": number
                    },
                    "cards": {
                        "yellow": number,
                        "yellowred": number,
                        "red": number
                    },
                    "penalty": {
                        "won": number,
                        "commited": null,
                        "scored": number,
                        "missed": number,
                        "saved": null
                    }
                },
                {
                    "team": {
                        "id": number,
                        "name": string,
                        "logo": string
                    },
                    "league": {
                        "id": 61,
                        "name": string,
                        "country": string,
                        "logo": string,
                        "flag": string,
                        "season": number
                    },
                    "games": {
                        "appearences": number,
                        "lineups": number,
                        "minutes": number,
                        "number": null,
                        "position": string,
                        "rating": string,
                        "captain": false
                    },
                    "substitutes": {
                        "in": number,
                        "out": number,
                        "bench": number
                    },
                    "shots": {
                        "total": number,
                        "on": number
                    },
                    "goals": {
                        "total": number,
                        "conceded": null,
                        "assists": number,
                        "saves": null
                    },
                    "passes": {
                        "total": number,
                        "key": number,
                        "accuracy": number
                    },
                    "tackles": {
                        "total": null,
                        "blocks": null,
                        "interceptions": number
                    },
                    "duels": {
                        "total": number,
                        "won": number
                    },
                    "dribbles": {
                        "attempts": number,
                        "success": number,
                        "past": null
                    },
                    "fouls": {
                        "drawn": number,
                        "committed": number
                    },
                    "cards": {
                        "yellow": number,
                        "yellowred": number,
                        "red": number
                    },
                    "penalty": {
                        "won": number,
                        "commited": null,
                        "scored": number,
                        "missed": number,
                        "saved": null
                    }
                }
            ]
        }
    ]
}

export interface SearchPlayer {
    player: {
        id: number,
        name: string,
        firstname: string,
        lastname: string,
        age: number,
        birth: {
            date: string,
            place: string,
            country: string
        },
        nationality: string,
        height: string,
        weight: string,
        injured: false,
        photo: string
    }
}

export interface SearchStatistics {
    team: {
        id: number,
        name: string,
        logo: string
    },
    league: {
        id: number,
        name: string,
        country: string,
        logo: string,
        flag: string,
        season: number
    },
    games: {
        appearences: number,
        lineups: number,
        minutes: number,
        number: null,
        position: string,
        rating: string,
        captain: false
    },
    substitutes: {
        in: number,
        out: number,
        bench: number
    },
    shots: {
        total: number,
        on: number
    },
    goals: {
        total: number,
        conceded: number,
        assists: number,
        saves: null
    },
    passes: {
        total: number,
        key: number,
        accuracy: number
    },
    tackles: {
        total: number,
        blocks: null,
        interceptions: number
    },
    duels: {
        total: number,
        won: number
    },
    dribbles: {
        attempts: number,
        success: number,
        past: null
    },
    fouls: {
        drawn: number,
        committed: number
    },
    cards: {
        yellow: number,
        yellowred: number,
        red: 1
    },
    penalty: {
        won: null,
        commited: null,
        scored: number,
        missed: number,
        saved: null
    }
}

export interface AggiungiPlayer {
    id?:number,
    playerId: number,
    userId: number,
    legaId: number,
    paid: number
}
