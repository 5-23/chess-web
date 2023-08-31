/**
 * 
 * 규칙: https://www.chess.com/ko/tiesuwosuru
 * 대수기보법:
 *    1 https://ko.wikipedia.org/wiki/대수기보법 
 *    2 https://namu.wiki/w/체스/기보%20표기법
 * 
 */

/*
variable     : camel case
enum>element : pascal case
*/

const ENUM_PIECE = {
  None   : 0,
  Pawn   : 1,
  Bishop : 2,
  Knight : 3,
  Rook   : 4,
  Queen  : 5,
  King   : 6
}

const ENUM_TEAM = {
  None  : 0,
  White : 1,
  Black : 2
}

/**
 * Piece Position
 */
class Position {
  /**
   * 
   * @param {Number} x 
   * @param {Number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(pos) {
    return new Position(this.x + pos.x, this.y + pos.);
  }

  toString() {
    return `${String.fromCharCode(this.x + 64)}${this.y}`;
  }

  inRange() {
    return 1 <= this.x && this.x <= 8 && 1 <= this.y && this.y <= 8;
  }
}

class Board {
  constructor() {
    this.board = new Array(8 * 8);
    for (let i = 0; i < 8 * 8; i++)
      this.board[i] = new Piece(ENUM_PIECE.None, ENUM_TEAM.None); 
  }

  /**
   * @param {Position} position
   */
  getPiece(position) {
    return this.board[(position.x - 1) + (position.y - 1) * 8];
  }
  getStr() {
    TODO
  }
}

class FastBoard {
  constructor(mainBoard, checkTeam) {
    this.board = new Array(8 * 8);
    for (let i = 0; i < 8 * 8; i++) {
      if (mainBoard[i].team === ENUM_TEAM.None) {
        this.board[i] = 0;
        continue;
      }

      this.board[i] = (mainBoard[i].team === checkTeam) ? 8 : mainBoard[i].type; 
    }
  }

  check() {
    // 공격 가능한 곳들을 9로  체크하기

  }

  getAttack(position) {
    // 그 곳이 공격을 받을 수 있는 곳인지 체크하기

    return this.board[(position.x - 1) + (position.y - 1) * 8];
  }
}

// 체스판 배열 채우기

/**
 * 체스 보드에 들어갈 기물
 */
class Piece {
  /**
   * @param {Number} type {None: 0, Pawn: 1, Bishop: 2, Knight: 3, Rook: 4, Queen: 5, King: 6}
   * @param {Number} team {white: 0, black: 1}
   * @param {Position} pos {white: 0, black: 1}
   */
  constructor(type, team, pos) {
    if (team < 0 || team > 2 || typeof(team) != Number){ throw new Error("TEAM MATCH ERROR") }
    if (type < 0 ||type > 6 || typeof(type) != Number){ throw new Error("TEAM MATCH ERROR") }
    
    this.type = type;
    if (type) {
      this.team = team;
      this.lastMove = 0;
      this.img = `img/${this.#getTeamToChar}-${this.#getNameToChar}.svg`;
      this.pos = pos;
    }
  }
  
  /**
   * 기물을 움직임
   */
  move() {
    const movables = this.getMovables().filter(v => board.#canMove(v));

  }
  /**
   * 기물이 position으로 움직일수 있는지 확인하고 boolean을 반환함
   * @param {Position} pos 
   * @returns {Boolean}
   */
  #canMove(pos) {
    return false
  }
  
  /**
   * 기물이 움직일수 있는 곳들을 Array<Position>으로 반환함 
   * @returns {Array<Position>}
   */
  getMovables() {
    return ENUM_PIECE_CBF[this.type](this);
  }

  /**
   * @returns {String}
   */
  getNameToString() {
    return ["None", "Pown", "Bishop", "Knight", "Rook", "Queen", "King"][this.name]
  }
  
  /**
   * @returns {String}
   */
  #getNameToChar() {
    return ['\0', 'p', 'b', 'n', 'r', 'q', 'k'][this.name]
  }

  /**
   * @returns {String}
   */
  getTeamToString() {
    return ["white", "Black"][this.team]
  }
  
  /**
   * @returns {String}
   */
  #getTeamToChar() {
    return ['\0', 'w', 'b'][this.team]
  }
}

// 캐슬링
// 앙파상
// 프로모션


// 1 이동할 곳이 None 이면
// 2 적이면 이동
// 3 아군이 아니고 적일 때까지 지속
// 4 아군 아니면 그냥 이동

const ENUM_PIECE_CBF = [
  p => { // None : 0
    return [];
  },
  
  p => { // Pawn : 0 
    const arr = [];

    if (p.team === ENUM_TEAM.Black) {
      if (p.pos.y === 2) return arr;

      move_2(p.team, p.pos, new Position(1, -1), arr);
      move_2(p.team, p.pos, new Position(-1, -1), arr);
      move_1(p.team, p.pos, new Position(0, -1), arr);
      
      if (p.lastMove === 0)
        move_1(p.team, p.pos, new Position(0, -2), arr);
    }

    if (p.team === ENUM_TEAM.White) {
      if (p.pos.y === 7) return arr;
      
      move_2(p.team, p.pos, new Position(1, 1), arr);
      move_2(p.team, p.pos, new Position(-1, 1), arr);
      move_1(p.team, p.pos, new Position(0, 1), arr);

      if (p.lastMove === 0)
        move_1(p.team, p.pos, new Position(0, 2), arr);
    }

    return arr;
  },
  
  p => { // Bishop : 2
    const arr = [];

    move_3(p.team, p.pos, new Position( 1,  1), arr);
    move_3(p.team, p.pos, new Position(-1, -1), arr);
    move_3(p.team, p.pos, new Position(-1,  1), arr);
    move_3(p.team, p.pos, new Position( 1, -1), arr);

    return arr;
  },  

  p => { // Knight : 3
    const arr = [];

    move_4(p.team, p.pos, new Position(-1,  2), arr);
    move_4(p.team, p.pos, new Position( 1,  2), arr);
    move_4(p.team, p.pos, new Position( 2, -1), arr);
    move_4(p.team, p.pos, new Position( 2,  1), arr);
    move_4(p.team, p.pos, new Position(-1, -2), arr);
    move_4(p.team, p.pos, new Position( 1, -2), arr);
    move_4(p.team, p.pos, new Position(-2, -1), arr);
    move_4(p.team, p.pos, new Position(-2,  1), arr);

    return arr;
  },

  p => { // Rook : 4
    const arr = [];
    // move_3rk 뭐하는건가ㅕ?
    move_3(p.team, p.pos, new Position( 1,  0), arr);
    move_3(p.team, p.pos, new Position( 0,  1), arr);
    move_3(p.team, p.pos, new Position(-1,  0), arr);
    move_3(p.team, p.pos, new Position( 0, -1), arr);

    return arr;
  },

  p => { // Queen : 5
    const arr = [];

    move_3(p.team, p.pos, new Position( 1,  1), arr);
    move_3(p.team, p.pos, new Position(-1, -1), arr);
    move_3(p.team, p.pos, new Position(-1,  1), arr);
    move_3(p.team, p.pos, new Position( 1, -1), arr);
    move_3(p.team, p.pos, new Position( 1,  0), arr);
    move_3(p.team, p.pos, new Position( 0,  1), arr);
    move_3(p.team, p.pos, new Position(-1,  0), arr);
    move_3(p.team, p.pos, new Position( 0, -1), arr);

    return arr;
  },

  p => { // King : 6
    const arr = [];

    move_4(p.team, p.pos, new Position(-1,  1), arr);
    move_4(p.team, p.pos, new Position( 1,  1), arr);
    move_4(p.team, p.pos, new Position( 1, -1), arr);
    move_4(p.team, p.pos, new Position( 1,  1), arr);
    move_4(p.team, p.pos, new Position(-1, -1), arr);
    move_4(p.team, p.pos, new Position( 1, -1), arr);
    move_4(p.team, p.pos, new Position(-1, -1), arr);
    move_4(p.team, p.pos, new Position(-1,  1), arr);

    return arr;
  },
];

const ENUM_SPECIAL_MOVE = {
  Enpassant: 0, 
  Promotion: 1,
  Castling:  2, 
}

const ENUM_PIECE_CBF_SPECIAL = [
  p => { // Enpassant 0
    const arr = [];

    if (p.team === ENUM_TEAM.Black) {


      move_2(p.team, p.pos, new Position(1, -1), arr);
      move_2(p.team, p.pos, new Position(-1, -1), arr);
    }

    if (p.team === ENUM_TEAM.White) {
      move_2(p.team, p.pos, new Position(1, 1), arr);
      move_2(p.team, p.pos, new Position(-1, 1), arr);
    }

    return arr;
  }

  p => { // Promotion 1 
    const arr = [];

    if (p.team === ENUM_TEAM.Black && p.pos.y === 2) {
      move_2(p.team, p.pos, new Position(1, -1), arr);
      move_2(p.team, p.pos, new Position(-1, -1), arr);
      move_1(p.team, p.pos, new Position(0, -1), arr);
    }

    if (p.team === ENUM_TEAM.White && p.pos.y === 7) {
      move_2(p.team, p.pos, new Position(1, 1), arr);
      move_2(p.team, p.pos, new Position(-1, 1), arr);
      move_1(p.team, p.pos, new Position(0, 1), arr);
    }

    return arr;
  },

  1,// 프로모션
  2,// 캐슬링

  
]



/**
 * 이동할 곳이 None 이면
 * @param {Number} team 
 * @param {Position} currentPos 
 * @param {Position} movePos 
 * @param {Array<Position>} inArr 
 */
const move_1 = (team, currentPos, movePos, inArr) => {
  const pos = currentPos.add(movePos);
  
  if (!pos.inRange()) return;
  if (board.getPiece(pos).team === ENUM_TEAM.None) inArr.push(movePos); 
}

/**
 * 
 * @param {Number} team 
 * @param {Position} currentPos 
 * @param {Position} movePos 
 * @param {Array<Position>} inArr 
 */
const move_2 = (team, currentPos, movePos, inArr) => {
  const opponentTeam = team === ENUM_TEAM.Black ? ENUM_TEAM.White : ENUM_TEAM.Black;
  const pos = currentPos.add(movePos);

  if (!pos.inRange()) return;
  if (board.getPiece(pos).team === ENUM_TEAM.opponentTeam) inArr.push(movePos);
}

/**
 * 
 * @param {Number} team 
 * @param {Position} currentPos 
 * @param {Position} movePos 
 * @param {Array<Position>} inArr 
 */
const move_3 = (team, currenPos, movePos, inArr) => {
  const opponentTeam = team === ENUM_TEAM.Black ? ENUM_TEAM.White : ENUM_TEAM.Black;
  const pos = currentPos.add(movePos);

  while (pos.inRange() && board.getPiece(pos) !== team) {
    inArr.push(pos);
    
    if (board.getPiece(pos) === opponentTeam) break;

    pos = pos.add(movePos);
  }  
}

const move_4 = (team, currentPos, movePos, inArr) => {
  const pos = currentPos.add(movePos);
  
  if (!pos.inRange()) return;
  if (board.getPiece(pos).team !== team) inArr.push(movePos); 
}

const move_5 = (team, currentPos, movePos, inArr) => {
  const y = team === ENUM_TEAM.Black ? 4 : 5;

  if (currentPos.y !== y) return ;

  const opponentTeam = team === ENUM_TEAM.Black ? ENUM_TEAM.White : ENUM_TEAM.Black;
  const pos = currentPos.add(new Position(movePos.x, 0));

  if (!pos.inRange()) return ;

  const piece = board.getPiece(pos);

  if (piece.team === opponentTeam && piece.lastMove === board.turn && piece.type === ENUM_PIECE.Pawn) inArr.push(movePos);
}