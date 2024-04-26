const dataSamples = {
  bar: {
    sample: [
      { index: "FP16 Baseline", label: "Dense", value: 14.9 },
      { index: "INT8 Weights & Activations", label: "Dense", value: 6.7 },
      {
        index: "INT8 Weights & Activations",
        label: "50% Sparsity",
        value: 5.1,
      },
      {
        index: "INT8 Weights & Activations",
        label: "70% Sparsity",
        value: 3.9,
      },
      { index: "INT4 Weights", label: "Dense", value: 5.1 },
    ],
  },
  line: {
    sample: [
      { index: "FP16 Baseline", label: 5.6, value: 14.9 },
      { index: "INT8 Weights & Activations", label: 10.3, value: 6.7 },
      { index: "INT8 Weights & Activations", label: 8.7, value: 5.1 },
      { index: "INT8 Weights & Activations", label: 3.2, value: 3.9 },
      { index: "INT4 Weights", label: 2.1, value: 5.1 },
    ],
  },
};

const formatData = ({ data, indexColors, colorShift = 0 }) => {
  const indices = [];
  const labels = [];
  let colorIndex = 0;

  for (const { value, label, index = null } of data) {
    let dataSeries = indices.find((series) => series.index === index);
    if (!dataSeries) {
      dataSeries = {
        index,
        color: indexColors[(colorIndex + colorShift) % indexColors.length],
        data: [],
      };
      indices.push(dataSeries);
      colorIndex += 1;
    }
    dataSeries.data.push({ index, label, value, color: dataSeries.color });

    let dataLabel = labels.find((dataLabel) => dataLabel.label === label);
    if (!dataLabel) {
      dataLabel = { label, data: [] };
      labels.push(dataLabel);
    }
    dataLabel.data.push({ index, label, value, color: dataSeries.color });
  }

  return {
    data,
    indices,
    labels,
  };
};

const extractData = ({
  data,
  children,
  file,
  testDataType,
  chartType,
  indexColors,
  colorShift,
}) => {
  // format the data to use
  let extracted = data;

  if (children) {
    throw new Error("Children are not supported for this component.");
  }

  if (file) {
    throw new Error("File is not supported for this component.");
  }

  if (testDataType) {
    extracted = dataSamples[chartType][testDataType];
  }

  return formatData({ data: extracted, indexColors, colorShift });
};

export { dataSamples, formatData, extractData };
