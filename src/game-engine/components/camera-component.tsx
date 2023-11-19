import Camera from "../engines/game/camera"
import TileComponent from "./tile-component";

export type CameraComponentProps = {
    camera: Camera;
}

export default function CameraComponent(props: CameraComponentProps): JSX.Element {
    const { camera: { currentTile } } = props;

    return <>
        <TileComponent tile={currentTile} />
    </>
}
