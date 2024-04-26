import React from "react";

const NeuralMagicBar = ({
  children,
  file,
  data,
  testDataType = null,
  width = "100%",
  height = "400px",
  title = null,
  titleType = "h2",
  subTitle = null,
  subTitleType = "h6",
  showLegend = true,
  valuesLabel = null,
  valuesFormat = "#",
  valueMax = null,
  valueMin = null,
  valueStepPercentage = 33.33,
  valueSteps = null,
  groupsLabel = null,
}) => {
  return <div>NeuralMagicBar</div>;

  // if (testDataType) {
  //   data = samples["bar"][testDataType];
  // }
  //
  // const dataSeries = [];
  // const dataLabels = [];
  // let colorIndex = 0;
  //
  // for (const { value, label, index = null } of data) {
  //   let series = dataSeries.find((series) => series.index === index);
  //
  //   if (!series) {
  //     series = {
  //       index,
  //       color: styling.colors[colorIndex % styling.colors.length],
  //     };
  //     dataSeries.push(series);
  //     colorIndex += 1;
  //   }
  //
  //   let dataLabel = dataLabels.find((dataLabel) => dataLabel.label === label);
  //
  //   if (!dataLabel) {
  //     dataLabel = { label, values: [] };
  //     dataLabels.push(dataLabel);
  //   }
  //
  //   dataLabel.values.push({ value, color: series.color });
  // }
  //
  // const dataValueMin = Math.min(...data.map((item) => item.value)) * 0.9;
  // const dataValueMax = Math.max(...data.map((item) => item.value)) * 1.1;
  // const verticalAxisMax = valueMax === null ? dataValueMax : valueMax;
  // const verticalAxisMin = valueMin === null ? dataValueMin : valueMin;
  // const verticalAxisStrata = [];
  //
  // if (!valueSteps) {
  //   for (
  //     let percentIncrement = 0;
  //     percentIncrement <= 100;
  //     percentIncrement += valueStepPercentage
  //   ) {
  //     verticalAxisStrata.push(
  //       verticalAxisMin +
  //         (verticalAxisMax - verticalAxisMin) * (percentIncrement / 100),
  //     );
  //   }
  // } else {
  //   verticalAxisStrata.push(...valueSteps);
  // }
  //
  // const maxBarsPerLabel = Math.max(
  //   ...dataLabels.map((label) => label.values.length),
  // );
  //
  // return (
  //   <div className={styles.barGraphContainer} style={{ width }}>
  //     {(title || subTitle) && (
  //       <div className={styles.titleContainer}>
  //         {title &&
  //           React.createElement(titleType, { className: styles.title }, title)}
  //         {subTitle &&
  //           React.createElement(
  //             subTitleType,
  //             { className: styles.subTitle },
  //             subTitle,
  //           )}
  //
  //         <div className={styles.titleBackgroundSpacer}>
  //           <div className={styles.knobLeft} />
  //           <div className={styles.knobRight} />
  //         </div>
  //       </div>
  //     )}
  //
  //     <div className={styles.barGraph}>
  //       {showLegend && (
  //         <div className={styles.legendContainer}>
  //           {dataSeries.map((series) => (
  //             <div key={series.index} className={styles.legendItem}>
  //               <div
  //                 className={styles.legendColor}
  //                 style={{ backgroundColor: series.color }}
  //               />
  //               <div className={styles.legendLabel}>{series.index}</div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //
  //       <div className={styles.graphContainer}>
  //         <div className={styles.graph} style={{ minHeight: height }}>
  //           {valuesLabel && (
  //             <div className={styles.leftAxisContainer}>
  //               <div className={styles.leftAxisLabelContainer}>
  //                 <div className={styles.leftAxisLabel}>{valuesLabel}</div>
  //               </div>
  //               <div className={styles.leftAxisValues}>
  //                 {verticalAxisStrata.map((value) => (
  //                   <div key={value} className={styles.axisValue}>
  //                     {formatValue(value, valuesFormat)}
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )}
  //
  //           <div className={styles.graphData}>
  //             {dataLabels.map((label) => (
  //               <div key={label.label} className={styles.graphLabel}>
  //                 {label.values.map((value) => (
  //                   <div
  //                     key={value.value}
  //                     className={styles.graphValue}
  //                     style={{
  //                       height: `${((value.value - verticalAxisMin) / (verticalAxisMax - verticalAxisMin)) * 100}%`,
  //                       width: `calc(${100 / maxBarsPerLabel}% - 8px * ${maxBarsPerLabel - 1})`,
  //                       backgroundColor: value.color,
  //                     }}
  //                   />
  //                 ))}
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //
  //         <div className={styles.graphLabels}>
  //           {dataLabels.map((label) => (
  //             <div key={label.label} className={styles.graphLabel}>
  //               {label.label}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //
  //       {groupsLabel && (
  //         <div className={styles.bottomAxisContainer}>
  //           <div className={styles.bottomAxisLabel}>{groupsLabel}</div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default NeuralMagicBar;
