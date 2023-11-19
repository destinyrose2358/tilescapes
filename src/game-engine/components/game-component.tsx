import { useContext, useMemo, useRef, useState } from "react"
import { GameViewDataContext } from "./game-view"
import Game from "../engines/game/game";
import View from "../engines/game/view";
import Circle from "./circle";
import Point from "../engines/geometry/point";
import Line from "../engines/geometry/line";
import ThetaRange from "../engines/geometry/theta-range";

export default function GameComponent(): JSX.Element {
    const { width, height, mouseX, mouseY } = useContext(GameViewDataContext);
    const gameEngine = useMemo(() => {
        return new Game();
    }, [])
    const { player: { camera } } = gameEngine;

    const [circleView] = useState(new View(new ThetaRange(2, 1)).merge(new View(new ThetaRange(5, 4))));
    const mouseTheta = useMemo(() => {
        const closestPointOfMouse = new Point(mouseX, mouseY);
        const mouseTheta = closestPointOfMouse.theta();

        return new View(new ThetaRange(mouseTheta.theta - 1, mouseTheta.theta + 1));
    }, [mouseX, mouseY]);
    const circleMerge = circleView?.merge(mouseTheta);
    const line = new Line(new Point(mouseX, mouseY), new Point(100, -100));
    const lineView = circleView?.merge(new View(line.lineThetaRange()));

    const svgRef = useRef<SVGSVGElement>(null);

    return <svg
        ref={svgRef}
        style={{
            backgroundColor: "blue"
        }}
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
    >
        {
            mouseTheta.thetaRanges.map((thetaRange) => {
                return (
                    <Circle
                        r={90}
                        startTheta={thetaRange.startTheta.theta}
                        endTheta={thetaRange.endTheta.theta}
                    />
                )
            })
        }
        {
            circleView ? circleView.thetaRanges.map((thetaRange) => {
                return (
                    <Circle
                        color={circleView.pointInRange(mouseX, mouseY) ? "red" : "green"}
                        startTheta={thetaRange.startTheta.theta}
                        endTheta={thetaRange.endTheta.theta}
                    />
                )
            }) : null
        }
        {
            circleMerge ? circleMerge.thetaRanges.map((thetaRange) => {
                return (
                    <Circle
                        r={110}
                        startTheta={thetaRange.startTheta.theta}
                        endTheta={thetaRange.endTheta.theta}
                    />
                )
            }) : null
        }
        {
            circleView ? line.withinView(circleView).map((currentLine) => (<line
                stroke="yellow"
                x1={currentLine.controlPoint1.x}
                y1={currentLine.controlPoint1.y}
                x2={currentLine.controlPoint2.x}
                y2={currentLine.controlPoint2.y}
            />)) : null
        }
        {
            lineView ? lineView.thetaRanges.map((thetaRange) => {
                return (
                    <Circle
                        r={120}
                        color="yellow"
                        startTheta={thetaRange.startTheta.theta}
                        endTheta={thetaRange.endTheta.theta}
                    />
                )
            }) : null
        }
        {/* <circle
            cx={mouseX}
            cy={mouseY}
            r={2}
        /> */}
    </svg>
}
