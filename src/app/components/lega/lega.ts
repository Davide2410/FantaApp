export interface Lega {
    nomeLega: string,
    passwordLega: string,
    user_id: number,
    gol: [number],
    autogol: [number],
    assist: [number],
    ammonizione: [number],
    espulsione: [number],
    rigoreSegnato: [number],
    rigoreSbagliato: [number],
    rigoreParato: [number],
    golSubito: [number],
    golVittoria: [number],
    golPareggio: [number],
    cleanSheet: [number],
    fascia_1: [number],
    fascia_2: [number],
    fascia_3: [number],
    fascia_4: [number],
    fascia_5: [number],
    fascia_6: [number],
    fascia_7: [number],
    fascia_8: [number],
    fascia_9: [number],
    fascia_10: [number]
}

export interface LegaInfo{
    nomeLega: string,
    passwordLega: string,
    user_id: number,
}

export interface LegaTeam {
    user_id: number,
    nome_team: string,
    budget: [number],
    idLega: number,
    nomeLega: string,
    user_admin:boolean
}

export interface Partecipanti{
    user_id: number,
    nome_team: string,
    budget: [number],
    idLega: number,
    nomeLega: string,
    user_admin:boolean,
    controlloPsw:boolean
}