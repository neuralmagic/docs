import SHA256 from "crypto-js/sha256";
import theme from "./theme";

const hashObjects = (objects, length = 32) => {
  const combinedString = JSON.stringify(objects);

  return SHA256(combinedString).toString().substring(0, length);
};

const stringFormat = (value, valuesFormat) => {
  try {
    return value.toLocaleString(undefined, {
      minimumFractionDigits:
        valuesFormat === "#" ? 0 : valuesFormat.split(".")[1].length,
      maximumFractionDigits:
        valuesFormat === "#" ? 0 : valuesFormat.split(".")[1].length,
    });
  } catch (error) {
    console.error("Invalid valuesFormat:", valuesFormat);
    return value;
  }
};

const textDimensions = (text, style) => {
  const fontProperties = theme.styles.font.properties[style];
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = `${fontProperties.fontStyle} ${fontProperties.fontWeight} ${fontProperties.fontSize} ${fontProperties.fontFamily}`;
  const metrics = context.measureText(text);
  const width = metrics.width;
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  return { width, height };
};

const splitText = (text, maxWidth, style) => {
  text = text + ""; // Ensure text is a string
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const { width } = textDimensions(testLine, style);

    if (width <= maxWidth) {
      line = testLine;
    } else {
      lines.push(line);
      line = word;
    }
  }

  lines.push(line);
  const dimensions = lines.map((line) => textDimensions(line, style));

  return {
    lines,
    dimensions,
  };
};

export { hashObjects, stringFormat, textDimensions, splitText };
