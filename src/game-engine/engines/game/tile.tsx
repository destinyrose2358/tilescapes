import "./tile.css";

export type Offsets = {
    x: number;
    y: number;
}

const OFFSETS: {
    [p in TileConnectionDirections]: Offsets
} = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    forward: {
        x: 0,
        y: -1
    },
    backward: {
        x: 0,
        y: 1
    }
}
const DEFAULTS = {
    size: 50
}

type TileConnectionDirections = "left" | "right" | "forward" | "backward";

type TileConnections = {
    [p in TileConnectionDirections]?: Tile;
};

export default class Tile {
    color: string;
    neighbors: TileConnections = {};

    constructor(color: string = "#aaaaaa") {
        this.color = color
    }

    generatePath(offsets: Offsets = {x: 0, y: 0}) {
        return `M ${offsets.x * DEFAULTS.size - (DEFAULTS.size / 2)} ${- (DEFAULTS.size / 2)} L ${offsets.x * DEFAULTS.size - (DEFAULTS.size / 2)} ${DEFAULTS.size / 2} L ${(offsets.x + 1) * DEFAULTS.size - (DEFAULTS.size / 2)} ${DEFAULTS.size / 2} L ${(offsets.x + 1) * DEFAULTS.size - (DEFAULTS.size / 2)} ${- (DEFAULTS.size / 2) } Z`
    }

    addNeighbor(newNeighbor: Tile, selfOrientation: TileConnectionDirections, neighborOrientation: TileConnectionDirections) {
        this.neighbors[selfOrientation] = newNeighbor;
        newNeighbor.neighbors[neighborOrientation] = this;
    }

    getOffsetNeighbors() {
        return Object.entries(this.neighbors).map(([orientation, neighbor]) => ({neighbor, offsets: OFFSETS[orientation as TileConnectionDirections]}));
    }

    render(offsets: Offsets = { x: 0, y: 0 }) {
        return <>
            <path
                className="tile"
                fill={this.color}
                d={this.generatePath(offsets)}
            />
        </>
    }
}
