import './App.css';
import GameView from './game-engine/components/game-view';

function App() {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [gameEngine, setGameEngine] = useState<Game>();
  // useEffect(() => {
  //   if (canvasRef.current !== null) {
  //     const newGame = new Game(canvasRef.current);
  //     setGameEngine(newGame)
  //   }
  // }, [
  // ]);
  // const gameLoop = useCallback(() => {
  //   if (gameEngine) {
  //     requestAnimationFrame(gameLoop);
  //     gameEngine.update();
  //     gameEngine.render();
  //   }
  // }, [
  //   gameEngine
  // ]);
  // useEffect(() => {
  //   gameLoop();
  // }, [gameLoop]);

  return (
    <div className="App" style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "green",
      overflow: "hidden"
    }}>
      <GameView />
      {/* <canvas
        ref={canvasRef}
        id="game-screen"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "blue",
        }}
      /> */}
    </div>
  );
}

export default App;
