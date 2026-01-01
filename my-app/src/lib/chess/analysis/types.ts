export interface GameHighlight {
    opponent: string;
    moves: number;
    result: string;
    date: string;
    url: string;
}

export interface UpsetHighlight {
    opponent: string;
    ratingDiff: number;
    myElo: number;
    opponentElo: number;
    date: string;
    url: string;
}

export interface SpeedHighlight {
    opponent: string;
    moves: number;
    date: string;
    url: string;
}

export interface CastlingStats {
    kingside: number;
    queenside: number;
    noCastle: number;
}

export interface MethodCount {
    name: string;
    count: number;
}

export interface CheckmateByPiece {
    piece: string;
    count: number;
}
