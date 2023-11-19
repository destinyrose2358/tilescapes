import Camera from "./camera";
import Tile from "./tile";

export default class Player {
    currentTile: Tile;
    camera: Camera;

    constructor(startingTile: Tile) {
        this.currentTile = startingTile;
        this.camera = new Camera(this.currentTile);
    }
}
