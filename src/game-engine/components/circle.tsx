
export type CircleProps = {
    cx?: number;
    cy?: number;
    r?: number;
    startTheta?: number;
    endTheta?: number;
    color?: string;
    className?: string;
    mouseEnter?: React.MouseEventHandler<SVGPathElement>;
    mouseLeave?: React.MouseEventHandler<SVGPathElement>;
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInRadians: number) => {

    return {
        x: centerX  + (radius * Math.cos(angleInRadians)),
        y: centerY - (radius * Math.sin(angleInRadians))
    };
}

export default function Circle(props: CircleProps): JSX.Element {
    const { mouseEnter, mouseLeave, className, color = "#fff", cx = 0, cy = 0, r = 100, startTheta = 0, endTheta = 2*Math.PI } = props;

    var start = polarToCartesian(cx, cy, r, startTheta);
    var end = polarToCartesian(cx, cy, r, (startTheta / 2 + endTheta / 2 + (startTheta <= endTheta ? 0 : Math.PI)) % (2 * Math.PI));
    var secondaryEnd = polarToCartesian(cx, cy, r, endTheta);

    return <path
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className={className}
        stroke={color}
        fill="none"
        strokeWidth={10}
        d={[
            "M", start.x, start.y,
            "A", r, r, 0, 0, 0, end.x, end.y,
            "A", r, r, 0, 0, 0, secondaryEnd.x, secondaryEnd.y,
        ].join(" ")}
    />
}
