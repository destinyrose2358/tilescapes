import Board from "./board";
import Player from "./player";

export default class Game {
    player: Player;
    board: Board;

    constructor() {
        this.board = new Board();
        this.player = new Player(this.board.getRandomTile());
    }
}
