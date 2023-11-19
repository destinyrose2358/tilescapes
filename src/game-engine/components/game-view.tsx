import { createContext, useEffect, useRef, useState } from "react";
import GameComponent from "./game-component";

type GameViewData = {
    width: number;
    height: number;
    mouseX: number;
    mouseY: number;
}

export const GameViewDataContext = createContext<GameViewData>({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0
});

export default function GameView(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const [gameViewDims, setGameViewData] = useState<GameViewData>({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0
    });
    useEffect(() => {
        const handleResize = () => {
            setGameViewData((prevGameViewData) => ({
                ...prevGameViewData,
                width: containerRef.current?.offsetWidth || 0,
                height: containerRef.current?.offsetHeight || 0
            }))
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [

    ]);

    return <div ref={containerRef} onMouseMove={(e) => {
        setGameViewData((prevGameViewData) => ({
            ...prevGameViewData,
            mouseX: e.clientX - (prevGameViewData.width / 2),
            mouseY: e.clientY - (prevGameViewData.height / 2)
        }));
    }} style={{ width: "100%", height: "100%"}}>
        <GameViewDataContext.Provider value={gameViewDims}>
            <GameComponent />
        </GameViewDataContext.Provider>
    </div>
}
