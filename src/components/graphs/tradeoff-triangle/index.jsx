import React from "react";

import theme from "../theme";
import { Point, Line, Triangle, Polygon } from "../vector";
import { pointsToPathD, createText } from "../svg";

const NeuralMagicTradeoffTriangle = ({
  width = null,
  height = 480,
  spacing = 4,
  colorsStartIndex = 2,
  firstLabel = "Tradeoff One",
  secondLabel = "Tradeoff Two",
  thirdLabel = "Tradeoff Three",
  labelSize = 32,
}) => {
  // if (width && !height) {
  //   height = 0.5 * Math.sqrt(3) * width;
  // } else if (!width && height) {
  //   width = 2 * (1 / Math.sqrt(3)) * height;
  // } else if (!width && !height) {
  //   console.error(
  //     "Either height or width must be given for NeuralMagicTradeoffTriangle",
  //   );
  //   return <div />;
  // }
  //
  // const triangle = new Triangle(
  //   new Point(0, height),
  //   new Point(width / 2, 0),
  //   new Point(width, height),
  // );
  // const tradeoffTop = new Polygon([
  //   triangle.pointB.clone(), // Top of triangle
  //   triangle.edgeBC.pointAt(
  //     (triangle.edgeBC.length() * 0.5 - spacing / 2) / triangle.edgeBC.length(),
  //   ), // Right side midpoint
  //   new Line(triangle.centroid, triangle.pointB).pointAt(
  //     spacing / 2 / triangle.centroid.distance(triangle.pointB),
  //   ), // Centroid
  //   triangle.edgeAB.pointAt(
  //     (triangle.edgeAB.length() * 0.5 + spacing / 2) / triangle.edgeAB.length(),
  //   ), // Left side midpoint
  // ]);
  // const tradeoffRight = new Polygon([
  //   triangle.edgeBC.pointAt(
  //     (triangle.edgeBC.length() * 0.5 + spacing / 2) / triangle.edgeBC.length(),
  //   ), // Right side midpoint
  //   triangle.pointC.clone(), // Right corner
  //   triangle.edgeCA.pointAt(
  //     (triangle.edgeCA.length() * 0.5 - spacing / 2) / triangle.edgeCA.length(),
  //   ), // Bottom side midpoint
  //   new Line(triangle.centroid, triangle.pointC).pointAt(
  //     spacing / 2 / triangle.centroid.distance(triangle.pointC),
  //   ), // Centroid
  // ]);
  // const tradeoffLeft = new Polygon([
  //   triangle.edgeCA.pointAt(
  //     (triangle.edgeCA.length() * 0.5 + spacing / 2) / triangle.edgeCA.length(),
  //   ), // Bottom side midpoint
  //   triangle.pointA.clone(), // Left corner
  //   triangle.edgeAB.pointAt(
  //     (triangle.edgeAB.length() * 0.5 - spacing / 2) / triangle.edgeAB.length(),
  //   ), // Left side midpoint
  //   new Line(triangle.centroid, triangle.pointA).pointAt(
  //     spacing / 2 / triangle.centroid.distance(triangle.pointA),
  //   ), // Centroid
  // ]);
  //
  // console.log(tradeoffTop);
  //
  // return (
  //   <svg width={width} height={height}>
  //     <path
  //       d={pointsToPathD(tradeoffTop.points, [16, 0, 0, 0])}
  //       fill={colors.series[colorsStartIndex % colors.series.length]}
  //     />
  //     <path
  //       d={pointsToPathD(tradeoffRight.points, [0, 16, 0, 0])}
  //       fill={colors.series[(colorsStartIndex + 1) % colors.series.length]}
  //     />
  //     <path
  //       d={pointsToPathD(tradeoffLeft.points, [0, 16, 0, 0])}
  //       fill={colors.series[(colorsStartIndex + 2) % colors.series.length]}
  //     />
  //
  //     {createText(
  //       firstLabel,
  //       tradeoffTop.center.x,
  //       tradeoffTop.center.y,
  //       0.7 * tradeoffTop.width(),
  //       "middle",
  //       labelSize,
  //       "body",
  //       colors.seriesText[colorsStartIndex % colors.seriesText.length],
  //     )}
  //     {createText(
  //       secondLabel,
  //       tradeoffRight.center.x,
  //       tradeoffRight.center.y,
  //       0.7 * tradeoffRight.width(),
  //       "middle",
  //       labelSize,
  //       "body",
  //       colors.seriesText[(colorsStartIndex + 1) % colors.seriesText.length],
  //     )}
  //     {createText(
  //       thirdLabel,
  //       tradeoffLeft.center.x,
  //       tradeoffLeft.center.y,
  //       0.7 * tradeoffLeft.width(),
  //       "middle",
  //       labelSize,
  //       "body",
  //       colors.seriesText[(colorsStartIndex + 2) % colors.seriesText.length],
  //     )}
  //   </svg>
  // );
};

export default NeuralMagicTradeoffTriangle;
