import Tile from "./tile";

export default class Board {
    tiles: Set<Tile>;

    constructor() {
        const tile1 = new Tile();
        const leftNeighbor = new Tile("#4400ff");
        const rightNeighbor = new Tile("ff0000");
        const forwardNeighbor = new Tile("#00ff00");
        const backwardNeighbor = new Tile("0000ff");
        tile1.addNeighbor(leftNeighbor, "left", "right");
        tile1.addNeighbor(rightNeighbor, "right", "left");
        tile1.addNeighbor(forwardNeighbor, "forward", "backward");
        tile1.addNeighbor(backwardNeighbor, "backward", "forward");
        this.tiles = new Set([tile1, leftNeighbor, rightNeighbor, forwardNeighbor, backwardNeighbor]);
    }

    getRandomTile(): Tile {
        return Array.from(this.tiles)[Math.floor(Math.random() * this.tiles.size)];
    }
}
