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
/* fn main { */
  
  let board = new Board()
  console.log(board.getStr())

/*} */


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
 * [A, B] 형태로 작성
 * A = [상하좌우 갈수있는곳 시작 , 상하좌우 갈수있는곳 끝]
 * B = [대각선 갈수있는곳 시작   , 대각선 갈수있는곳 끝]
 */
const moveSystem = {  
  None   : [[0, 0], [0, 0]],
  Pawn   : [[1, 2], [0, 0]],
  Bishop : [[0, 0], [1, 8]],
  Knight : [[1, 1], [1, 1]],
  Rook   : [[1, 8], [0, 0]],
  Queen  : [[1, 8], [1, 8]],
  King   : [[1, 1], [1, 1]],
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
    return new Position(this.x + pos.x, this.y + pos.y);
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
    /** @type {Array<Array<Piece>>} */
    this.board = new Array(8);
    for (let i = 0; i < 8 * 8; i++) this.board[i] = new Piece(ENUM_PIECE.None, ENUM_TEAM.None); 
    
    this.putPiece(new Piece(ENUM_PIECE.Rook, ENUM_TEAM.White, new Position(1, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Knight, ENUM_TEAM.White, new Position(2, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.White, new Position(3, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Queen, ENUM_TEAM.White, new Position(4, 1)));
    this.putPiece(new Piece(ENUM_PIECE.King, ENUM_TEAM.White, new Position(5, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.White, new Position(6, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Knight, ENUM_TEAM.White, new Position(7, 1)));
    this.putPiece(new Piece(ENUM_PIECE.Rook, ENUM_TEAM.White, new Position(8, 1)));

    this.putPiece(new Piece(ENUM_PIECE.Rook, ENUM_TEAM.Black, new Position(1, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Knight, ENUM_TEAM.Black, new Position(2, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.Black, new Position(3, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Queen, ENUM_TEAM.Black, new Position(4, 8)));
    this.putPiece(new Piece(ENUM_PIECE.King, ENUM_TEAM.Black, new Position(5, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.Black, new Position(6, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Knight, ENUM_TEAM.Black, new Position(7, 8)));
    this.putPiece(new Piece(ENUM_PIECE.Rook, ENUM_TEAM.Black, new Position(8, 8)));

    
    this.board[7*8 + 0] = new Piece(ENUM_PIECE.Rook, ENUM_TEAM.White)
    this.board[7*8 + 7] = new Piece(ENUM_PIECE.Rook, ENUM_TEAM.White)
    
    this.board[7*8 + 1] = new Piece(ENUM_PIECE.Knight, ENUM_TEAM.White)
    this.board[7*8 + 6] = new Piece(ENUM_PIECE.Knight, ENUM_TEAM.White)
    
    this.board[7*8 + 2] = new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.White)
    this.board[7*8 + 5] = new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.White)
    
    this.board[7*8 + 3] = new Piece(ENUM_PIECE.Queen, ENUM_TEAM.White)
    this.board[7*8 + 4] = new Piece(ENUM_PIECE.King, ENUM_TEAM.White)

    
    this.board[0*8 + 0] = new Piece(ENUM_PIECE.Rook, ENUM_TEAM.Black)
    this.board[0*8 + 7] = new Piece(ENUM_PIECE.Rook, ENUM_TEAM.Black)

    this.board[0*8 + 1] = new Piece(ENUM_PIECE.Knight, ENUM_TEAM.Black)
    this.board[0*8 + 6] = new Piece(ENUM_PIECE.Knight, ENUM_TEAM.Black)
    
    this.board[0*8 + 2] = new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.Black)
    this.board[0*8 + 5] = new Piece(ENUM_PIECE.Bishop, ENUM_TEAM.Black)
    
    this.board[0*8 + 3] = new Piece(ENUM_PIECE.Queen, ENUM_TEAM.Black)
    this.board[0*8 + 4] = new Piece(ENUM_PIECE.King, ENUM_TEAM.Black)

    
    
    let i = 0;
    while (i++ < 8){
      this.board[i + 6*8 - 1] = new Piece(ENUM_PIECE.Pawn, ENUM_TEAM.White)
      this.board[i + 1*8 - 1] = new Piece(ENUM_PIECE.Pawn, ENUM_TEAM.Black)
    }
  }
  /**
   * @returns {Number} ENUM_TEAM
   */
  isCheck(){
    return 
  }

  /**
   * @param {Position} position
   */
  getPiece(position) {
    return this.board[(position.x - 1) + (position.y - 1) * 8];
  }

  putPiece(piece) {
    this.board[(piece.position.x - 1) + (piece.position.y - 1) * 8] = piece;
  }

  getStr() {
    let str = ""
    for (let i in this.board){
      str += this.board[i].type + " ";
      if ((Number(i)+1)%8 == 0){
        str += '\n'
      }
    }
    return str;
  }
}
/**
 * 
 */
class FastBoard {
  /**
   * @param {Board} mainBoard 
   * @param {Board} checkTeam 
   */
  constructor(mainBoard, checkTeam) {
    this.board = new Array(8 * 8);
    this.team = checkTeam;
    this.opponentTeam = checkTeam === ENUM_TEAM.Black ? ENUM_TEAM.White : ENUM_TEAM.Black;

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

    for (let x = 1; x <= 8; x++) {
      for (let y = 1; y <= 8; y++) {
        let i = (x - 1) + (y - 1) * 8;

        if (this.board[i] === 0 || this.board[i] === 8) continue;

        const pos = new Position(x, y);
        const movable = ENUM_PIECE_CBF[this.board[i]](opponentTeam, pos);
        
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            
          }
        }
      }
    }
  }

  getStr() {
    let str = ""
    for (let i in this.board){
      str += 
      str += this.board[i].type + " ";
      if ((Number(i)+1)%8 == 0){
        str += '\n'
      }
    }
    console.log(str)
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
   * @param {Board} board
   */
  constructor(type, team, pos, board) {
    if (team < 0 || team > 2 || typeof(team) != "number"){ throw new Error("TEAM MATCH ERROR") }
    if (type < 0 || type > 6 || typeof(type) != "number"){ throw new Error("TYPE MATCH ERROR") }
    
    this.type = type;
    if (type) {
      this.team = team;
      this.lastMove = 0;
      this.img = `img/${this.#getTeamToChar}-${this.#getNameToChar}.svg`;
      this.pos = pos;
      this.board = board;
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
    // this.board.board.
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

const ENUM_PIECE_CBF = [
  (team, pos) => { // None : 0
    return [];
  },
  
  (team, pos) => { // Pawn : 0 
    const arr = [];

    if (team === ENUM_TEAM.Black) {
      if (pos.y === 2) return arr;

      move_2(team, pos, new Position(1, -1), arr);
      move_2(team, pos, new Position(-1, -1), arr);
      move_1(team, pos, new Position(0, -1), arr);
      
      if (pos.y === 7)
        move_1(team, pos, new Position(0, -2), arr);
    }

    if (team === ENUM_TEAM.White) {
      if (pos.y === 7) return arr;
      
      move_2(team, pos, new Position(1, 1), arr);
      move_2(team, pos, new Position(-1, 1), arr);
      move_1(team, pos, new Position(0, 1), arr);

      if (pos.y === 2)
        move_1(team, pos, new Position(0, 2), arr);
    }

    return arr;
  },
  
  (team, pos) => { // Bishop : 2
    const arr = [];

    move_3(team, pos, new Position( 1,  1), arr);
    move_3(team, pos, new Position(-1, -1), arr);
    move_3(team, pos, new Position(-1,  1), arr);
    move_3(team, pos, new Position( 1, -1), arr);

    return arr;
  },  

  (team, pos) => { // Knight : 3
    const arr = [];

    move_4(team, pos, new Position(-1,  2), arr);
    move_4(team, pos, new Position( 1,  2), arr);
    move_4(team, pos, new Position( 2, -1), arr);
    move_4(team, pos, new Position( 2,  1), arr);
    move_4(team, pos, new Position(-1, -2), arr);
    move_4(team, pos, new Position( 1, -2), arr);
    move_4(team, pos, new Position(-2, -1), arr);
    move_4(team, pos, new Position(-2,  1), arr);

    return arr;
  },

  (team, pos) => { // Rook : 4
    const arr = [];
    // move_3rk 뭐하는건가ㅕ?
    move_3(team, pos, new Position( 1,  0), arr);
    move_3(team, pos, new Position( 0,  1), arr);
    move_3(team, pos, new Position(-1,  0), arr);
    move_3(team, pos, new Position( 0, -1), arr);

    return arr;
  },

  (team, pos) => { // Queen : 5
    const arr = [];

    move_3(team, pos, new Position( 1,  1), arr);
    move_3(team, pos, new Position(-1, -1), arr);
    move_3(team, pos, new Position(-1,  1), arr);
    move_3(team, pos, new Position( 1, -1), arr);
    move_3(team, pos, new Position( 1,  0), arr);
    move_3(team, pos, new Position( 0,  1), arr);
    move_3(team, pos, new Position(-1,  0), arr);
    move_3(team, pos, new Position( 0, -1), arr);

    return arr;
  },

  (team, pos) => { // King : 6
    const arr = [];

    move_4(team, pos, new Position(-1,  1), arr);
    move_4(team, pos, new Position( 1,  1), arr);
    move_4(team, pos, new Position( 1, -1), arr);
    move_4(team, pos, new Position( 1,  1), arr);
    move_4(team, pos, new Position(-1, -1), arr);
    move_4(team, pos, new Position( 1, -1), arr);
    move_4(team, pos, new Position(-1, -1), arr);
    move_4(team, pos, new Position(-1,  1), arr);

    return arr;
  },
];

const ENUM_SPECIAL_MOVE = {
  Enpassant: 0, 
  Promotion: 1,
  Castling:  2, 
}

const ENUM_PIECE_CBF_SPECIAL = [
  (team, pos) => { // Enpassant 0
    const arr = [];

    if (team === ENUM_TEAM.Black) {


      move_2(team, pos, new Position(1, -1), arr);
      move_2(team, pos, new Position(-1, -1), arr);
    }

    if (team === ENUM_TEAM.White) {
      move_2(team, pos, new Position(1, 1), arr);
      move_2(team, pos, new Position(-1, 1), arr);
    }

    return arr;
  },

  (team, pos) => { // Promotion 1 
    const arr = [];

    if (team === ENUM_TEAM.Black && pos.y === 2) {
      move_2(team, pos, new Position(1, -1), arr);
      move_2(team, pos, new Position(-1, -1), arr);
      move_1(team, pos, new Position(0, -1), arr);
    }

    if (team === ENUM_TEAM.White && pos.y === 7) {
      move_2(team, pos, new Position(1, 1), arr);
      move_2(team, pos, new Position(-1, 1), arr);
      move_1(team, pos, new Position(0, 1), arr);
    }

    return arr;
  },

  1,// 프로모션
  2,// 캐슬링

  
]




// 3 아군이 아니고 적일 때까지 지속
// 4 아군 아니면 그냥 이동

/**
 * 이동할 곳이 기물이 없을 때
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
 * 이동할 곳에 적이 있을 때
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
 * 아군이 아니고 있을 때까지
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


/**
 * 아군 아니면 그냥 이동
 * @param {Number} team 
 * @param {Position} currentPos 
 * @param {Position} movePos 
 * @param {Array<Position>} inArr 
 */
const move_4 = (team, currentPos, movePos, inArr) => {
  const pos = currentPos.add(movePos);
  
  if (!pos.inRange()) return;
  if (board.getPiece(pos).team !== team) inArr.push(movePos); 
}

/**
 * 앙파상
 * @param {Number} team 
 * @param {Position} currentPos 
 * @param {Position} movePos 
 * @param {Array<Position>} inArr 
 */
const move_5 = (team, currentPos, movePos, inArr) => {
  const y = team === ENUM_TEAM.Black ? 4: 5;

  if (currentPos.y !== y) return ;

  const opponentTeam = team === ENUM_TEAM.Black ? ENUM_TEAM.White : ENUM_TEAM.Black;
  const pos = currentPos.add(new Position(movePos.x, 0));

  if (!pos.inRange()) return ;

  const piece = board.getPiece(pos);

  if (piece.team === opponentTeam && piece.lastMove === board.turn && piece.type === ENUM_PIECE.Pawn) inArr.push(movePos);
}
