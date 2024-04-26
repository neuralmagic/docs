import { Point, Line, Rectangle } from "./vector";
import theme from "./theme";
import { atan2 } from "mathjs";
import { hashObjects, splitText } from "./utilities";

function pointsToPathD({ points, cornerRadius = 0, closePath = true }) {
  const cornerRadii =
    typeof cornerRadius === "number"
      ? new Array(points.length).fill(cornerRadius)
      : cornerRadius;

  // First map the points to vertices taking into account any corner radius
  // veretx format is {start: Point, control: Point, end: Point, hasCorner: boolean}
  const vertices = [];
  points.forEach((point, index) => {
    const prevPoint = points[index - 1] || points[points.length - 1];
    const nextPoint = points[(index + 1) % points.length];
    const currentCornerRadius = cornerRadii[index];

    if (!currentCornerRadius || currentCornerRadius < 1) {
      vertices.push({
        start: point,
        control: point,
        end: point,
        hasCorner: false,
      });
    } else {
      const startLine = new Line(prevPoint, point);
      const endLine = new Line(point, nextPoint);

      vertices.push({
        start: startLine.pointAt(
          (startLine.length() - currentCornerRadius) / startLine.length(),
        ),
        control: point,
        end: endLine.pointAt(currentCornerRadius / endLine.length()),
        hasCorner: true,
      });
    }
  });
  vertices.push(vertices[0]);

  // Now map the vertices to SVG path d attribute format
  const d = [];
  vertices.forEach((vertex, index) => {
    if (index === 0) {
      d.push(`M ${vertex.end.x},${vertex.end.y}`);
    } else if (!vertex.hasCorner) {
      d.push(`L ${vertex.control.x},${vertex.control.y}`);
    } else {
      d.push(`L ${vertex.start.x},${vertex.start.y}`);
      d.push(
        `Q ${vertex.control.x},${vertex.control.y} ${vertex.end.x},${vertex.end.y}`,
      );
    }
  });

  if (closePath) {
    d.push("Z");
  }

  return d.join(" ");
}

function lineToPathD(line, thickness, closePath = true) {
  const offset = thickness / 2;
  let angle =
    atan2(line.end.y - line.start.y, line.end.x - line.start.x) + Math.PI / 2;

  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);

  const points = [
    new Point(line.start.x - offsetX, line.start.y - offsetY),
    new Point(line.start.x + offsetX, line.start.y + offsetY),
    new Point(line.end.x + offsetX, line.end.y + offsetY),
    new Point(line.end.x - offsetX, line.end.y - offsetY),
    new Point(line.start.x - offsetX, line.start.y - offsetY),
  ];

  let d = "";

  points.forEach((point, index) => {
    if (index === 0) {
      d += `M ${point.x},${point.y}`;
    } else {
      d += ` L ${point.x},${point.y}`;
    }
  });

  if (closePath) {
    d += " Z";
  }

  return d;
}

const validateTextInputs = ({
  text,
  style,
  anchorPoint,
  mainAlignment,
  secondaryAlignment,
}) => {
  if (theme.styles.font.properties[style] === undefined) {
    throw new Error(`Invalid style: ${style}`);
  }

  if (["start", "middle", "end"].indexOf(mainAlignment) === -1) {
    throw new Error(`Invalid mainAlignment: ${mainAlignment}`);
  }

  if (["start", "middle", "end"].indexOf(secondaryAlignment) === -1) {
    throw new Error(`Invalid secondaryAlignment: ${secondaryAlignment}`);
  }

  if (text === null || text === undefined || text === "") {
    return {
      elements: null,
      dimensions: new Rectangle(anchorPoint.x, anchorPoint.y, 0, 0),
    };
  }

  return null;
};

const createText = ({
  text,
  style,
  anchorPoint,
  color = "black",
  mainAlignment = "start",
  secondaryAlignment = "start",
  maxMainAxis = null,
  lineSpacing = 0.1,
  rotation = 0,
}) => {
  const nullResponse = validateTextInputs({
    text,
    style,
    anchorPoint,
    mainAlignment,
    secondaryAlignment,
  });

  if (nullResponse !== null) {
    return nullResponse;
  }

  const key = hashObjects([
    text,
    style,
    color,
    mainAlignment,
    maxMainAxis,
    lineSpacing,
  ]);

  // Split text into lines and determine dimensions
  const { lines, dimensions } = splitText(text, maxMainAxis, style);
  let maxLineHeight = Math.max(...dimensions.map((dim) => dim.height));
  let lineDeltaY = maxLineHeight * lineSpacing + maxLineHeight;
  let maxLineWidth = Math.max(...dimensions.map((dim) => dim.width));
  let totalHeight = lineDeltaY * (lines.length - 1) + maxLineHeight;

  let textAnchorX;
  let textAnchorY;
  let boundAnchorX;
  let boundAnchorY;

  if (mainAlignment === "start") {
    textAnchorX = anchorPoint.x;
    boundAnchorX = anchorPoint.x;
  } else if (mainAlignment === "middle") {
    textAnchorX = anchorPoint.x;
    boundAnchorX = anchorPoint.x - maxLineWidth / 2;
  } else if (mainAlignment === "end") {
    textAnchorX = anchorPoint.x;
    boundAnchorX = anchorPoint.x - maxLineWidth;
  }

  if (secondaryAlignment === "start") {
    textAnchorY = anchorPoint.y;
    boundAnchorY = anchorPoint.y;
  } else if (secondaryAlignment === "middle") {
    textAnchorY = anchorPoint.y - totalHeight / 2;
    boundAnchorY = anchorPoint.y - totalHeight / 2;
  } else if (secondaryAlignment === "end") {
    textAnchorY = anchorPoint.y - totalHeight;
    boundAnchorY = anchorPoint.y - totalHeight;
  }

  // Rotation calculations
  const textLineSettings = [];

  if (rotation === 0) {
    lines.forEach((line, index) => {
      textLineSettings.push({
        line,
        x: textAnchorX,
        y: textAnchorY + index * lineDeltaY,
        textAnchor: mainAlignment,
        alignmentBaseline: "hanging",
        transform: "",
      });
    });
  } else if (rotation === 270) {
    maxLineWidth = lineDeltaY * (lines.length - 1) + maxLineHeight;
    totalHeight = Math.max(...dimensions.map((dim) => dim.width));

    // Reorient the text lines with the given rotation while matching alignment to the original desired anchor
    lines.forEach((line, index) => {
      // first find rotated center point for each line
      const orignalX = textAnchorX;
      const originalY = textAnchorY + index * lineDeltaY;
      const orignalDims = dimensions[index];

      // now change out all text for center anchors and alignment for easy rotation and translation
      let originalCenterX;
      let originalCenterY;

      if (mainAlignment === "start") {
        originalCenterX = orignalX + orignalDims.width / 2;
      } else if (mainAlignment === "middle") {
        originalCenterX = orignalX;
      } else if (mainAlignment === "end") {
        originalCenterX = orignalX - orignalDims.width / 2;
      }

      if (secondaryAlignment === "start") {
        originalCenterY = originalY;
      } else if (secondaryAlignment === "middle") {
        originalCenterY = originalY + orignalDims.height / 2;
      } else if (secondaryAlignment === "end") {
        originalCenterY = originalY + orignalDims.height;
      }

      // convert into line settings and correct offsets
      textLineSettings.push({
        line,
        x: originalCenterX,
        y: originalCenterY + orignalDims.height / 2 + index * lineDeltaY,
        textAnchor: "middle",
        alignmentBaseline: "middle",
        transform: `rotate(${rotation} ${originalCenterX} ${originalCenterY})`,
      });
    });
  }

  // Convert lines settings into SVG elements
  const elements = textLineSettings.map((settings, index) => {
    return (
      <text
        key={`text-${index}-${key}`}
        x={settings.x}
        y={settings.y}
        textAnchor={settings.textAnchor}
        alignmentBaseline={settings.alignmentBaseline}
        style={theme.styles.font.properties[style]}
        fill={color}
        transform={settings.transform}
      >
        {settings.line}
      </text>
    );
  });

  return {
    elements,
    dimensions: new Rectangle(
      boundAnchorX,
      boundAnchorY,
      maxLineWidth,
      totalHeight,
    ),
  };
};

export { pointsToPathD, lineToPathD, createText };
