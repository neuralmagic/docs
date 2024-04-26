import { createText, pointsToPathD } from "./svg";
import { Point, Rectangle } from "./vector";
import { hashObjects, stringFormat, textDimensions } from "./utilities";

const createBackground = ({
  width,
  height,
  bottomHeading,
  headingMargin = 0,
  cornerRadius = 16,
  color = "white",
  borderColor = "white",
  borderWidth = 0,
  stylePulltab = false,
  pullTabGap = 12,
  pullTabInset = 32,
}) => {
  const key = hashObjects({
    width,
    height,
    bottomHeading,
    cornerRadius,
    color,
    borderColor,
    borderWidth,
    stylePulltab,
    pullTabGap,
    pullTabInset,
  });

  if (!stylePulltab) {
    const backgroundRect = (
      <rect
        key={`background_${key}`}
        x={0}
        y={0}
        width={width}
        height={height}
        rx={cornerRadius}
        ry={cornerRadius}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    );

    return {
      elements: [backgroundRect],
      dimensions: new Rectangle(0, 0, width, height),
      graphTop: bottomHeading + headingMargin,
    };
  }

  const pullTabMeasurements = {
    top: 0,
    bottom: bottomHeading + headingMargin,
    left: 0,
    leftInset: pullTabInset,
    right: width,
    rightInset: width - pullTabInset,
  };
  const graphRectMeasurements = {
    top: bottomHeading + headingMargin + pullTabGap,
    bottom: height,
    left: 0,
    right: width,
  };

  const backgroundPath = (
    <path
      key={`background_${key}`}
      d={pointsToPathD({
        points: [
          // start at graph rect top left, fully trace pull tab above
          // pulltab left
          new Point(graphRectMeasurements.left, graphRectMeasurements.top),
          new Point(pullTabMeasurements.leftInset, graphRectMeasurements.top),
          new Point(pullTabMeasurements.leftInset, pullTabMeasurements.bottom),
          new Point(pullTabMeasurements.left, pullTabMeasurements.bottom),
          new Point(pullTabMeasurements.left, pullTabMeasurements.top),
          // pull tab right
          new Point(pullTabMeasurements.right, pullTabMeasurements.top),
          new Point(pullTabMeasurements.right, pullTabMeasurements.bottom),
          new Point(pullTabMeasurements.rightInset, pullTabMeasurements.bottom),
          new Point(pullTabMeasurements.rightInset, graphRectMeasurements.top),
          new Point(graphRectMeasurements.right, graphRectMeasurements.top),
          // remaining graph rect below pull tab
          new Point(graphRectMeasurements.right, graphRectMeasurements.bottom),
          new Point(graphRectMeasurements.left, graphRectMeasurements.bottom),
        ],
        cornerRadius: [
          cornerRadius,
          pullTabGap / 2,
          pullTabGap / 2,
          cornerRadius,
          cornerRadius,
          cornerRadius,
          cornerRadius,
          pullTabGap / 2,
          pullTabGap / 2,
          cornerRadius,
          cornerRadius,
          cornerRadius,
        ],
      })}
      fill={color}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  );

  return {
    elements: [backgroundPath],
    dimensions: new Rectangle(0, 0, width, height),
    graphTop: graphRectMeasurements.top + headingMargin,
  };
};

const createGraphBackground = ({
  anchorPoint,
  width,
  height,
  color = "white",
  cornerRadius = 16,
  borderColor = "white",
  borderWidth = 0,
  verticalAxisSide = "", // "start" or "end" (left or right)
  horizontalAxisSide = "", // "start" or "end" (top or bottom)
}) => {
  const cornersRadii = [
    verticalAxisSide !== "start" && horizontalAxisSide !== "start"
      ? cornerRadius
      : 0, // top left
    verticalAxisSide !== "end" && horizontalAxisSide !== "start"
      ? cornerRadius
      : 0, // top right
    verticalAxisSide !== "end" && horizontalAxisSide !== "end"
      ? cornerRadius
      : 0, // bottom right
    verticalAxisSide !== "start" && horizontalAxisSide !== "end"
      ? cornerRadius
      : 0, // bottom left
  ];
  const elements = [
    <path
      key={`graph_background_${createHash({ width, height, color, cornerRadius, borderColor, borderWidth })}`}
      d={pointsToPathD({
        points: [
          new Point(anchorPoint.x, anchorPoint.y),
          new Point(anchorPoint.x + width, anchorPoint.y),
          new Point(anchorPoint.x + width, anchorPoint.y + height),
          new Point(anchorPoint.x, anchorPoint.y + height),
        ],
        cornerRadius: cornersRadii,
      })}
      fill={color}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />,
  ];

  return {
    elements,
    dimensions: new Rectangle(anchorPoint.x, anchorPoint.y, width, height),
  };
};

const createHeading = ({
  xPosition,
  yPosition,
  width,
  align = "left", // "left", "center", "right"
  title = null,
  titleType = "h2",
  titleColor = "black",
  titlesSpacing = 8,
  subTitle = null,
  subTitleType = "h6",
  subTitleColor = "grey",
}) => {
  if (xPosition === null || xPosition === undefined) {
    throw new Error("Invalid xPosition");
  }

  if (width === null || width === undefined) {
    throw new Error("Invalid width");
  }

  if (yPosition === null || yPosition === undefined) {
    throw new Error("Invalid yPosition");
  }

  if (["left", "center", "right"].indexOf(align) === -1) {
    throw new Error(`Invalid align: ${align}`);
  }

  const boundsStart = new Point(xPosition, yPosition);
  const boundsEnd = new Point(xPosition + width, yPosition);
  let textAnchor;
  let textAlignment;

  if (align === "left") {
    textAnchor = new Point(boundsStart.x, boundsStart.y);
    textAlignment = "start";
  } else if (align === "center") {
    textAnchor = new Point(boundsStart.x + width / 2, boundsStart.y);
    textAlignment = "middle";
  } else if (align === "right") {
    textAnchor = new Point(boundsEnd.x, boundsStart.y);
    textAlignment = "end";
  }

  const elements = [];

  if (title) {
    const titleText = createText({
      text: title,
      style: titleType,
      anchorPoint: textAnchor,
      color: titleColor,
      mainAlignment: textAlignment,
      maxMainAxis: width,
    });
    elements.push(...titleText.elements);
    textAnchor.y += titleText.dimensions.height() + titlesSpacing;
    boundsEnd.y +=
      titleText.dimensions.height() + (subTitle ? titlesSpacing : 0);
  }

  if (subTitle) {
    const subTitleText = createText({
      text: subTitle,
      style: subTitleType,
      anchorPoint: textAnchor,
      color: subTitleColor,
      mainAlignment: textAlignment,
      maxMainAxis: width,
    });
    elements.push(...subTitleText.elements);
    boundsEnd.y += subTitleText.dimensions.height();
  }

  return {
    elements,
    dimensions: new Rectangle(
      boundsStart.x,
      boundsStart.y,
      boundsEnd.x - boundsStart.x,
      boundsEnd.y - boundsStart.y,
    ),
  };
};

const createLegend = ({
  series = [],
  xPosition,
  yPosition,
  width,
  align = "center",
  colorSquareSize = 16,
  gap = 16,
  labelMargin = 8,
  textType = "body1",
  textColor = "grey",
}) => {
  if (xPosition === null || xPosition === undefined) {
    throw new Error("Invalid xPosition");
  }

  if (width === null || width === undefined) {
    throw new Error("Invalid width");
  }

  if (yPosition === null || yPosition === undefined) {
    throw new Error("Invalid yPosition");
  }

  if (["left", "center", "right"].indexOf(align) === -1) {
    throw new Error(`Invalid align: ${align}`);
  }

  const key = hashObjects({
    series,
    xPosition,
    yPosition,
    width,
    align,
    colorSquareSize,
    gap,
    textType,
    textColor,
  });

  // figure out the dimensions of each series and map them into rows
  const seriesDimensionsByRow = [
    {
      width: 0,
      height: 0,
      values: [],
    },
  ];
  let currentRow = 0;
  series.forEach((series) => {
    const remainingRowWidth =
      width -
      seriesDimensionsByRow[currentRow].width -
      (seriesDimensionsByRow[currentRow].values.length > 0 ? gap : 0);
    const seriesTextDimensions = textDimensions(series.index, textType);
    const seriesWidth =
      colorSquareSize + labelMargin + seriesTextDimensions.width;

    if (seriesWidth <= remainingRowWidth) {
      seriesDimensionsByRow[currentRow].width +=
        seriesWidth +
        (seriesDimensionsByRow[currentRow].values.length > 0 ? gap : 0);
      seriesDimensionsByRow[currentRow].height = Math.max(
        seriesDimensionsByRow[currentRow].height,
        seriesTextDimensions.height,
        colorSquareSize,
      );
      seriesDimensionsByRow[currentRow].values.push(series);
    } else {
      seriesDimensionsByRow.push({
        width: seriesWidth <= width ? seriesWidth : width,
        height: Math.max(seriesTextDimensions.height, colorSquareSize),
        values: [series],
      });
      currentRow += 1;
    }
  });

  // now create the SVG elements by row based on alignment
  const elements = [];
  let currentY = yPosition;

  seriesDimensionsByRow.forEach((row, rowIndex) => {
    let rowLeftX =
      align === "left"
        ? xPosition
        : align === "center"
          ? xPosition + (width - row.width) / 2
          : xPosition + width - row.width;
    let rowCenterY = currentY + row.height / 2;

    row.values.forEach((series, seriesIndex) => {
      // create the SVG elements for the series: [color square - gap - text]

      const squareYStart = rowCenterY - colorSquareSize / 2;
      const colorSquare = (
        <path
          key={`legend_${key}_${rowIndex}_${seriesIndex}`}
          d={pointsToPathD({
            points: [
              new Point(rowLeftX, squareYStart),
              new Point(rowLeftX + colorSquareSize, squareYStart),
              new Point(
                rowLeftX + colorSquareSize,
                squareYStart + colorSquareSize,
              ),
              new Point(rowLeftX, squareYStart + colorSquareSize),
            ],
            cornerRadius: 4,
          })}
          fill={series.color}
        />
      );
      elements.push(colorSquare);
      rowLeftX += colorSquareSize + labelMargin;

      // get the height of the rendered text first
      const tmpSeriesText = createText({
        text: series.index,
        style: textType,
        anchorPoint: new Point(0, 0),
        maxMainAxis: width - rowLeftX,
      });
      const seriesText = createText({
        text: series.index,
        style: textType,
        anchorPoint: new Point(rowLeftX, currentY),
        color: textColor,
        maxMainAxis: width - rowLeftX,
      });

      elements.push(...seriesText.elements);
      rowLeftX += seriesText.dimensions.width() + gap;
    });

    currentY += row.height + labelMargin;
  });

  currentY -= labelMargin; // remove the last spacing

  return {
    elements,
    dimensions: new Rectangle(
      xPosition,
      yPosition,
      width,
      currentY - yPosition,
    ),
  };
};

const createVerticalAxis = ({
  xPosition,
  yPosition,
  height,
  steps = null,
  stepsMargin = 8,
  format = null,
  label = null,
  labelType = "body1",
  labelColor = "grey",
  labelMargin = 8,
}) => {
  if (xPosition === null || xPosition === undefined) {
    throw new Error("Invalid xPosition");
  }

  if (height === null || height === undefined) {
    throw new Error("Invalid width");
  }

  if (yPosition === null || yPosition === undefined) {
    throw new Error("Invalid yPosition");
  }

  const key = hashObjects({
    xPosition,
    yPosition,
    height,
    steps,
    stepsMargin,
    format,
    label,
    labelType,
    labelColor,
    labelMargin,
  });
  const elements = [];
  const boundsStart = new Point(xPosition, yPosition);
  const boundsEnd = new Point(xPosition, yPosition + height);

  // create the label, if it exists
  if (label) {
    const labelText = createText({
      text: label,
      style: labelType,
      anchorPoint: new Point(xPosition, yPosition + height / 2),
      color: labelColor,
      mainAlignment: "middle",
      maxMainAxis: height,
      rotation: 270,
    });
    elements.push(...labelText.elements);
    boundsEnd.x += labelText.dimensions.width() + labelMargin;
    elements.push((
        <rect
            x={boundsStart.x}
            y={boundsStart.y}
            width={labelText.dimensions.width()}
            height={boundsEnd.y - boundsStart.y}
            fill="none"
            stroke="red"
            strokeWidth="1"
            />
    ))
  }

    // create the steps, if they exist
  if (steps) {
    // calculate anchors for each step
    // index 0 is top aligned, last index is bottom aligned, all others are equally spaced and centered
    const stepsSpacing = height / (steps.length - 1);
    const stepsX = xPosition + stepsMargin;

    steps.forEach((step, index) => {
      let anchorPoint;
      let secondaryAlignment;

      if (index === 0) {
        anchorPoint = new Point(stepsX, yPosition + height);
        secondaryAlignment = "end";
      } else if (index === steps.length - 1) {
        anchorPoint = new Point(stepsX, yPosition);
        secondaryAlignment = "start";
      } else {
        anchorPoint = new Point(stepsX, (yPosition + height) - stepsSpacing * index);
        secondaryAlignment = "middle";
      }

      const stepText = createText({
        text: format ? stringFormat(step, format) : step,
        style: labelType,
        anchorPoint,
        color: labelColor,
        mainAlignment: "start",
        secondaryAlignment,
        maxMainAxis: stepsSpacing / 2,
      });
      elements.push(...stepText.elements);

      const stepRight = stepText.dimensions.x + stepText.dimensions.width();
      boundsEnd.x = Math.max(boundsEnd.x, stepRight);
    });
  }

  const debugRect = (
    <rect
        x={boundsStart.x}
        y={boundsStart.y}
        width={boundsEnd.x - boundsStart.x}
        height={boundsEnd.y - boundsStart.y}
        fill="none"
        stroke="red"
        strokeWidth="1"
        />
  );
    elements.push(debugRect);

  return {
    elements,
    dimensions: new Rectangle(
      boundsStart.x,
      boundsStart.y,
      boundsEnd.x - boundsStart.x,
      boundsEnd.y - boundsStart.y,
    ),
  };

  // // determine all dimensions needed
  // let labelBounds = new Rectangle(0, 0, 0, height);
  // let stepsContainerBounds = new Rectangle(0, 0, 0, height);
  // const stepBounds = [];
  //
  // if (label) {
  //   const { bounds } = createText({
  //     text: label,
  //     style: labelType,
  //     anchorPoint: new Point(0, 0),
  //     color: labelColor,
  //     maxMainAxis: height,
  //     orientation: "vertical",
  //     mainAlignment: "middle",
  //   });
  //   labelBounds = new Rectangle(0, 0, bounds.width, height);
  // }
  //
  // if (steps) {
  //   const maxStepWidth = steps
  //     .map((step) => {
  //       const { bounds } = createText({
  //         text: format ? stringFormat(step, format) : step,
  //         style: labelType,
  //         anchorPoint: new Point(0, 0),
  //         color: labelColor,
  //       });
  //       stepBounds.push(bounds);
  //
  //       return bounds.width;
  //     })
  //     .reduce((a, b) => Math.max(a, b), 0);
  //   stepsContainerBounds = new Rectangle(0, 0, maxStepWidth, height);
  // }
  //
  // const elements = [];
  // const totalStepsHeight = stepBounds
  //   .map((bounds) => bounds.height)
  //   .reduce((a, b) => a + b, 0);
  // const middleStepsHeight =
  //   totalStepsHeight -
  //   stepBounds[0].height -
  //   stepBounds[stepBounds.length - 1].height;
  // const middleStepsPadding = (height - totalStepsHeight) / (steps.length - 1);
  // let currentX = anchorPoint.x;
  //
  // if (position === "left") {
  //   // create the label, if it exists
  //   if (label) {
  //     const { svgText, height } = createText({
  //       text: label,
  //       style: labelType,
  //       anchorPoint: new Point(currentX, anchorPoint.y),
  //       color: labelColor,
  //       maxMainAxis: height,
  //       orientation: "vertical",
  //     });
  //     elements.push(svgText);
  //     currentX += labelBounds.width + labelPadding;
  //   }
  //
  //   // create the steps, if they exist
  //   let currentY = anchorPoint.y;
  //
  //   if (steps) {
  //     for (let i = 0; i < steps.length; i++) {
  //       const { svgText, height } = createText({
  //         text: format ? stringFormat(steps[i], format) : steps[i],
  //         style: labelType,
  //         anchorPoint: new Point(currentX, currentY),
  //         color: labelColor,
  //       });
  //       elements.push(svgText);
  //       currentY += height + (i === 0 ? middleStepsPadding : 0);
  //     }
  //
  //     currentX += stepsContainerBounds.width + stepsPadding;
  //   }
  // } else if (position === "right") {
  //   let currentY = anchorPoint.y;
  //
  //   // on the right side, create the steps first
  //   if (steps) {
  //     currentX += stepsPadding;
  //
  //     for (let i = 0; i < steps.length; i++) {
  //       const { svgText, height } = createText({
  //         text: format ? stringFormat(steps[i], format) : steps[i],
  //         style: labelType,
  //         anchorPoint: new Point(currentX, currentY),
  //         color: labelColor,
  //       });
  //       elements.push(svgText);
  //       currentY += height + (i === 0 ? middleStepsPadding : 0);
  //     }
  //   }
  //
  //   // create the label, if it exists
  //   if (label) {
  //     currentX += labelPadding;
  //
  //     const { svgText, height } = createText({
  //       text: label,
  //       style: labelType,
  //       anchorPoint: new Point(currentX, anchorPoint.y),
  //       color: labelColor,
  //       maxMainAxis: height,
  //       orientation: "vertical_180",
  //     });
  //     elements.push(svgText);
  //   }
  // }
  //
  // return {
  //   elements,
  //   dimensions: new Rectangle(
  //     anchorPoint.x,
  //     anchorPoint.y,
  //     currentX - anchorPoint.x,
  //     height,
  //   ),
  // };
};

const createHorizontalAxis = ({
  xPosition,
  yPosition,
  width,
  steps = null,
  stepsMargin = 8,
  format = null,
  label = null,
  labelType = "body1",
  labelColor = "grey",
  labelMargin = 8,
}) => {
  if (xPosition === null || xPosition === undefined) {
    throw new Error("Invalid xPosition");
  }

  if (width === null || width === undefined) {
    throw new Error("Invalid width");
  }

  if (yPosition === null || yPosition === undefined) {
    throw new Error("Invalid yPosition");
  }

  const key = hashObjects({
    xPosition,
    yPosition,
    width,
    steps,
    stepsMargin,
    format,
    label,
    labelType,
    labelColor,
    labelMargin,
  });
  const elements = [];
  const boundsStart = new Point(xPosition, yPosition);
  const boundsEnd = new Point(xPosition + width, yPosition);

  // create the steps, if they exist
  if (steps) {
    // calculate anchors for each step
    // index 0 is left aligned, last index is right aligned, all others are equally spaced and centered
    const stepsSpacing = width / (steps.length - 1);
    const stepsY = yPosition + stepsMargin;

    steps.forEach((step, index) => {
      let anchorPoint;
      let mainAlignment;

      if (index === 0) {
        anchorPoint = new Point(xPosition, stepsY);
        mainAlignment = "start";
      } else if (index === steps.length - 1) {
        anchorPoint = new Point(xPosition + width, stepsY);
        mainAlignment = "end";
      } else {
        anchorPoint = new Point(xPosition + stepsSpacing * index, stepsY);
        mainAlignment = "middle";
      }

      const stepText = createText({
        text: format ? stringFormat(step, format) : step,
        style: labelType,
        anchorPoint,
        color: labelColor,
        mainAlignment,
        maxMainAxis: stepsSpacing / 2,
      });
      elements.push(...stepText.elements);

      const stepBottom = stepText.dimensions.y + stepText.dimensions.height();
      boundsEnd.y = Math.max(boundsEnd.y, stepBottom);
    });
  }

  // create the label if it exists
  if (label) {
    const labelText = createText({
      text: label,
      style: labelType,
      anchorPoint: new Point(xPosition + width / 2, boundsEnd.y + labelMargin),
      color: labelColor,
      mainAlignment: "middle",
      maxMainAxis: width,
    });
    elements.push(...labelText.elements);
    boundsEnd.y += labelText.dimensions.height() + labelMargin;
  }

  return {
    elements,
    dimensions: new Rectangle(
      boundsStart.x,
      boundsStart.y,
      boundsEnd.x - boundsStart.x,
      boundsEnd.y - boundsStart.y,
    ),
  };
};

export {
  createBackground,
  createGraphBackground,
  createHeading,
  createLegend,
  createVerticalAxis,
  createHorizontalAxis,
};
