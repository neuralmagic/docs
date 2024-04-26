import React from "react";

import { Point, Line, Triangle, Polygon, Rectangle } from "../vector";
import { pointsToPathD, lineToPathD, createText, stringFormat } from "../svg";
import {
  createHeading,
  createLegend,
  createVerticalAxis,
  createHorizontalAxis,
  createBackground,
  createGraphBackground,
} from "../graphs.svg";
import { extractData } from "../data";
import theme from "../theme";
import { splitText } from "../utilities";

const createLineGraph = ({
  series,
  verticalAxisBounds,
  horizontalAxisBounds,
  anchorPoint,
  width,
  height,
  lineStrokeWidth = 4,
  pointRadius = 8,
}) => {
  const bounds = new Rectangle(anchorPoint.x, anchorPoint.y, width, height);
  const elements = [];

  // convert each series data into markers for each point and lines between each point
  series.forEach((series, seriesIndex) => {
    const color = series.color;
    const lines = [];
    const markers = [];
    let previousPoint = null;

    series.values.forEach(({ value, label }, index) => {
      const percentX =
        (value - horizontalAxisBounds.min) /
        (horizontalAxisBounds.max - horizontalAxisBounds.min);
      const percentY =
        (value - verticalAxisBounds.min) /
        (verticalAxisBounds.max - verticalAxisBounds.min);
      const point = new Point(
        anchorPoint.x + width * percentX,
        anchorPoint.y + height * percentY,
      );

      if (previousPoint && lineStrokeWidth && lineStrokeWidth > 0) {
        lines.push(
          <path
            d={lineToPathD(new Line(previousPoint, point), lineStrokeWidth)}
            fill={color}
          />,
        );
      }

      if (pointRadius && pointRadius > 0) {
        markers.push(
          <circle cx={point.x} cy={point.y} r={pointRadius} fill={color} />,
        );
      }
    });

    elements.push(...lines);
    elements.push(...markers);
  });

  return {
    elements,
    dimensions: bounds,
  };
};

const NeuralMagicLineChart = ({
  // data
  children,
  file,
  data,
  testDataType = null,

  // general graph properties
  width = 560,
  height = 480,
  chartStyle = "rectangular",
  chartColorScheme = "light",
  textScale = "normal",
  seriesColorShift = 0,
  markersSize = 8,
  linesSize = 4,

  // heading properties
  alignHeading = "left",
  title = null,
  subTitle = null,

  // legend properties
  enableLegend = true,
  legendAlign = "center",

  // x axis properties
  showXAxis = true,
  xAxisLabel = "Test X Axis Label",
  xAxisValues = null,
  xAxisValuesTotalSteps = 4,
  xAxisValuesFormat = "#.#",

  // y axis properties
  showYAxis = true,
  yAxisLabel = "Test Y Axis Label",
  yAxisValues = null,
  yAxisValuesTotalSteps = 4,
  yAxisValuesFormat = "#.#",
}) => {
  // get the data
  const extracted = extractData({
    data,
    children,
    file,
    testDataType,
    chartType: "line",
    indexColors: theme.colors.data.series,
    colorShift: seriesColorShift,
  });
  if (!xAxisValues || xAxisValues.length === 0 || xAxisValues.length < 3) {
    let min =
      xAxisValues && xAxisValues.length > 0
        ? xAxisValues[0]
        : Math.min(extracted.data.map((item) => item.label));
    let max =
      xAxisValues && xAxisValues.length > 1
        ? xAxisValues[1]
        : Math.max(extracted.data.map((item) => item.label));
    let distance = max - min;
    min = min - distance * 0.1;
    max = max + distance * 0.1;
    const stepDistance = (max - min) / xAxisValuesTotalSteps;
    xAxisValues = [];
    for (let i = 0; i <= xAxisValuesTotalSteps; i++) {
      xAxisValues.push(min + stepDistance * i);
    }
  }
  if (!yAxisValues || yAxisValues.length === 0 || yAxisValues.length < 3) {
    let min =
      yAxisValues && yAxisValues.length > 0
        ? yAxisValues[0]
        : Math.min(extracted.data.map((item) => item.value));
    let max =
      yAxisValues && yAxisValues.length > 1
        ? yAxisValues[1]
        : Math.max(extracted.data.map((item) => item.value));
    let distance = max - min;
    min = min - distance * 0.1;
    max = max + distance * 0.1;
    const stepDistance = (max - min) / yAxisValuesTotalSteps;
    yAxisValues = [];
    for (let i = 0; i <= yAxisValuesTotalSteps; i++) {
      yAxisValues.push(min + stepDistance * i);
    }
  }

  // start creating the graph
  const layeredElements = {
    backgrounds: [],
    headings: [],
    legends: [],
    axis: [],
    graphs: [],
  };
  const currentPoint = new Point(
    theme.styles.spacing.outerPadding,
    theme.styles.spacing.outerPadding,
  );

  // create the heading first to enable background creation for the pull tab setup
  const heading = createHeading({
    xPosition: currentPoint.x,
    width: width - 2 * theme.styles.spacing.outerPadding,
    yPosition: currentPoint.y,
    align: alignHeading,
    title,
    titleType: theme.styles.font.sizes[textScale].title,
    titleColor: theme.functions.chartSchemeColor(
      chartColorScheme,
      "textPrimary",
    ),
    titlesSpacing: theme.styles.spacing.titleSubTitleMargin,
    subTitle,
    subTitleType: theme.styles.font.sizes[textScale].subTitle,
    subTitleColor: theme.functions.chartSchemeColor(
      chartColorScheme,
      "textSecondary",
    ),
  });
  layeredElements.headings.push(...heading.elements);
  currentPoint.y = heading.dimensions.y + heading.dimensions.height();

  // create the background next (needs the heading height) to figure out where the graph will fit
  const background = createBackground({
    width,
    height,
    bottomHeading: currentPoint.y,
    headingMargin: theme.styles.spacing.headingMargin,
    color: theme.functions.chartSchemeColor(chartColorScheme, "background"),
    borderColor: theme.functions.chartSchemeColor(chartColorScheme, "border"),
    borderWidth: 1,
    stylePulltab: chartStyle === "pulltab",
  });
  layeredElements.backgrounds.push(...background.elements);
  currentPoint.y = background.graphTop;

  // start creating the graph

  // create the legend first, legend is always above the graph if included
  let legend = null;

  if (enableLegend) {
    legend = createLegend({
      series: extracted.indices,
      xPosition: currentPoint.x,
      yPosition: currentPoint.y,
      width: width - 2 * theme.styles.spacing.outerPadding,
      align: "center",
      gap: 16,
      textType: theme.styles.font.sizes[textScale].axisLabels,
      textColor:
        chartColorScheme === "light" || chartColorScheme === "grey"
          ? theme.colors.font.colors.light.primary
          : theme.colors.font.colors.dark.primary,
    });
    layeredElements.legends.push(...legend.elements);
    currentPoint.y = legend.dimensions.y + legend.dimensions.height();
  }

  // determine the height of the horizontal axis to subtract from vertical axis and graph to fit everything
  let horizontalAxisProjectedHeight = 0;
  if (showXAxis) {
    const tmpHorizontal = createHorizontalAxis({
      xPosition: currentPoint.x,
      yPosition: currentPoint.y,
      width: width - theme.styles.spacing.outerPadding * 2,
      steps: xAxisValues,
      stepsMargin: 8,
      format: xAxisValuesFormat,
      label: xAxisLabel,
      labelType: theme.styles.font.sizes[textScale].axisLabels,
      labelColor:
        chartColorScheme === "light" || chartColorScheme === "grey"
          ? theme.colors.font.colors.light.secondary
          : theme.colors.font.colors.dark.secondary,
      labelMargin: 8,
    });
    horizontalAxisProjectedHeight = tmpHorizontal.dimensions.height();
  }

  const graphHeight =
    height -
    currentPoint.y -
    theme.styles.spacing.outerPadding -
    horizontalAxisProjectedHeight;

  // create the vertical axis
  if (showYAxis) {
    const verticalAxis = createVerticalAxis({
      xPosition: currentPoint.x,
      yPosition: currentPoint.y,
      height: graphHeight,
      steps: yAxisValues,
      stepsMargin: 8,
      format: yAxisValuesFormat,
      label: yAxisLabel,
      labelType: theme.styles.font.sizes[textScale].axisLabels,
      labelColor:
        chartColorScheme === "light" || chartColorScheme === "grey"
          ? theme.colors.font.colors.light.secondary
          : theme.colors.font.colors.dark.secondary,
      labelMargin: 8,
    });
    layeredElements.axis.push(...verticalAxis.elements);
    currentPoint.x += verticalAxis.dimensions.width();
  }

  return (
    <svg width={width} height={height}>
      {layeredElements.backgrounds}
      {layeredElements.headings}
      {layeredElements.legends}
      {layeredElements.axis}
      {layeredElements.graphs}
    </svg>
  );
};

export default NeuralMagicLineChart;

const func = () => {
  // // create the legend
  // let legend = null;
  //
  // if (enableLegend) {
  //   legend = createLegend({
  //     series,
  //     anchorPoint: currentPoint,
  //     maxWidth: width - padding * 2,
  //     align: legendAlign,
  //     colorSquareSize: markersSize,
  //     gap: 8,
  //     textType: textStyleMappings[textScale].axisLabels,
  //     textColor:
  //         chartColorScheme === "light" || chartColorScheme === "grey"
  //             ? colors.lightTextPrimary
  //             : colors.darkTextPrimary,
  //   });
  //
  //   elements.legends.push(...legend.elements);
  //   currentPoint.y += legend.dimensions.height;
  // }
  //
  // if (!yAxisValues) {
  //   const min = Math.min(
  //       ...series.map((series) =>
  //           Math.min(...series.values.map((value) => value.value)),
  //       ),
  //   );
  //   const max = Math.max(
  //       ...series.map((series) =>
  //           Math.max(...series.values.map((value) => value.value)),
  //       ),
  //   );
  //   const step = (max - min) / yAxisValuesTotalSteps;
  //   yAxisValues = Array.from(
  //       { length: yAxisValuesTotalSteps + 1 },
  //       (_, i) => min + step * i,
  //   );
  // } else if (yAxisValues.length === 2) {
  //   const min = yAxisValues[0];
  //   const max = yAxisValues[1];
  //   const step = (max - min) / yAxisValuesTotalSteps;
  //   yAxisValues = Array.from(
  //       { length: yAxisValuesTotalSteps + 1 },
  //       (_, i) => min + step * i,
  //   );
  // }
  //
  // if (!xAxisValues) {
  //   const min = Math.min(
  //       ...series.map((series) =>
  //           Math.min(...series.values.map((value) => value.label)),
  //       ),
  //   );
  //   const max = Math.max(
  //       ...series.map((series) =>
  //           Math.max(...series.values.map((value) => value.label)),
  //       ),
  //   );
  //   const step = (max - min) / xAxisValuesTotalSteps;
  //   xAxisValues = Array.from(
  //       { length: xAxisValuesTotalSteps + 1 },
  //       (_, i) => min + step * i,
  //   );
  // } else if (xAxisValues.length === 2) {
  //   const min = xAxisValues[0];
  //   const max = xAxisValues[1];
  //   const step = (max - min) / xAxisValuesTotalSteps;
  //   xAxisValues = Array.from(
  //       { length: xAxisValuesTotalSteps + 1 },
  //       (_, i) => min + step * i,
  //   );
  // }
  //
  // // check the height of the horizontal axis to subtract from vertical axis and graph to fit everything
  // let horizontalAxisProjectedHeight = 0;
  //
  // if (showXAxis) {
  //   const tmpHorizontal = createHorizontalAxis({
  //     anchorPoint: currentPoint,
  //     width: width - padding * 2,
  //     steps: xAxisValues,
  //     stepsPadding: 8,
  //     format: xAxisValuesFormat,
  //     position: "bottom",
  //     label: xAxisLabel,
  //     labelType: textStyleMappings[textScale].axisLabels,
  //     labelColor:
  //         chartColorScheme === "light" || chartColorScheme === "grey"
  //             ? colors.lightTextSecondary
  //             : colors.darkTextSecondary,
  //     labelPadding: 8,
  //   });
  //   horizontalAxisProjectedHeight = tmpHorizontal.dimensions.height;
  // }
  //
  // // create the vertical axis
  // if (showYAxis) {
  //   const verticalAxis = createVerticalAxis({
  //     anchorPoint: currentPoint,
  //     height: height - currentPoint.y - padding - horizontalAxisProjectedHeight,
  //     steps: yAxisValues,
  //     stepsPadding: 8,
  //     format: yAxisValuesFormat,
  //     position: "left",
  //     label: yAxisLabel,
  //     labelType: textStyleMappings[textScale].axisLabels,
  //     labelColor:
  //         chartColorScheme === "light" || chartColorScheme === "grey"
  //             ? colors.lightTextSecondary
  //             : colors.darkTextSecondary,
  //     labelPadding: 8,
  //   });
  //   elements.axis.push(...verticalAxis.elements);
  //   currentPoint.x += verticalAxis.dimensions.width;
  // }
  //
  // // create the graph
  // const graph = createLineGraph({
  //   series,
  //   verticalAxisBounds: {
  //     min: yAxisValues[0],
  //     max: yAxisValues[yAxisValues.length - 1],
  //   },
  //   horizontalAxisBounds: {
  //     min: xAxisValues[0],
  //     max: xAxisValues[xAxisValues.length - 1],
  //   },
  //   anchorPoint: currentPoint,
  //   width: width - currentPoint.x - padding,
  //   height: height - currentPoint.y - padding - horizontalAxisProjectedHeight,
  //   lineStrokeWidth: linesSize,
  //   pointRadius: markersSize,
  // });
  // elements.graphs.push(...graph.elements);
  // currentPoint.y += graph.dimensions.height;
  //
  // // create the horizontal axis
  // if (showXAxis) {
  //   const horizontalAxis = createHorizontalAxis({
  //     anchorPoint: currentPoint,
  //     width: width - currentPoint.x - padding,
  //     steps: xAxisValues,
  //     stepsPadding: 8,
  //     format: xAxisValuesFormat,
  //     position: "bottom",
  //     label: xAxisLabel,
  //     labelType: textStyleMappings[textScale].axisLabels,
  //     labelColor:
  //         chartColorScheme === "light" || chartColorScheme === "grey"
  //             ? colors.lightTextSecondary
  //             : colors.darkTextSecondary,
  //     labelPadding: 8,
  //   });
  //   elements.axis.push(...horizontalAxis.elements);
  //   currentPoint.y += horizontalAxis.dimensions.height;
  // }
  //
  // // create the background
  // const background = createBackground({
  //   width,
  //   height,
  //   headingHeight: heading.dimensions.height,
  //   cornerRadius: 16,
  //   color:
  //       chartColorScheme === "light"
  //           ? colors.lightBackground
  //           : chartColorScheme === "grey"
  //               ? colors.greyBackground
  //               : colors.darkBackground,
  //   borderColor:
  //       chartColorScheme === "light"
  //           ? colors.lightBorder
  //           : chartColorScheme === "grey"
  //               ? colors.greyBorder
  //               : colors.darkBorder,
  //   borderWidth: 1,
  //   stylePulltab: chartStyle === "pulltab",
  //   pullTabGap: 16,
  //   pullTabInset: 48,
  // });
  // elements.backgrounds.push(background);
  // const graphBackground = createGraphBackground({
  //   anchorPoint: graph.dimensions.points[0],
  //   width: graph.dimensions.width(),
  //   height: graph.dimensions.height(),
  //   color:
  //       chartColorScheme === "light"
  //           ? colors.lightGraphBackground
  //           : chartColorScheme === "grey"
  //               ? colors.greyGraphBackground
  //               : colors.darkGraphBackground,
  //   cornerRadius: 16,
  //   borderColor:
  //       chartColorScheme === "light"
  //           ? colors.lightBorder
  //           : chartColorScheme === "grey"
  //               ? colors.greyBorder
  //               : colors.darkBorder,
  //   borderWidth: 1,
  //   verticalAxisSide: showYAxis ? "start" : "",
  //   horizontalAxisSide: showXAxis ? "end" : "",
  // });
};
