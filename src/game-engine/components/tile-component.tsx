import { useMemo } from "react";
import Tile from "../engines/game/tile"

export type TileComponentProps = {
    tile: Tile;
}

export default function TileComponent(props: TileComponentProps): JSX.Element {
    const { tile } = props;
    const renderedTile = useMemo(() => {
        return tile.render();
    }, [tile])

    return <>
        {renderedTile}
    </>
}
