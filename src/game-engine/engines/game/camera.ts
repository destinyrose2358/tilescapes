import Tile from "./tile";

export default class Camera {
    currentTile: Tile;

    constructor(currentTile: Tile) {
        this.currentTile = currentTile;
    }
}
