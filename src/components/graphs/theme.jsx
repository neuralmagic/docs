function decimalToHex(d, padding) {
  let hex = Number(d).toString(16);
  padding =
    typeof padding === "undefined" || padding === null
      ? (padding = 2)
      : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
}

const shadeColorHex = (color, percentage) => {
  let colorString = color.replace("#", "");

  if (colorString.length === 6) {
    colorString += "FF";
  }

  let red = parseInt(colorString.substr(0, 2), 16);
  let green = parseInt(colorString.substr(2, 2), 16);
  let blue = parseInt(colorString.substr(4, 2), 16);
  const alpha = parseInt(colorString.substr(6, 2), 16);

  if (percentage > 0) {
    // lighten where 1 is full white, 0 is no change, and close to 0 is minimal change
    red = Math.round(red + (255 - red) * percentage);
    green = Math.round(green + (255 - green) * percentage);
    blue = Math.round(blue + (255 - blue) * percentage);
  } else {
    // darken where 1 is full black, 0 is no change, and close to 0 is minimal change
    red = Math.round(red - red * -1 * percentage);
    green = Math.round(green - green * -1 * percentage);
    blue = Math.round(blue - blue * -1 * percentage);
  }

  console.log(`red: ${red}, green: ${green}, blue: ${blue}, alpha: ${alpha}`);

  return `#${decimalToHex(red)}${decimalToHex(green)}${decimalToHex(blue)}${decimalToHex(alpha)}`;
};

function setAlphaHex(color, opacity) {
  let colorString = color.replace("#", "");

  if (colorString.length > 6) {
    colorString = colorString.substring(0, 6);
  }

  const alpha = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);

  return `#${colorString}${decimalToHex(alpha)}`;
}

const fontFamily = "Space Grotesk, sans-serif";
const textFontProperties = {
  h1: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "96px",
  },
  h2: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "60px",
  },
  h3: {
    fontFamily: "Spezia",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "48px",
  },
  h4: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "32px",
  },
  h5: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
  },
  h6: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
  },
  subtitle1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "22px",
  },
  subtitle2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
  },
  body1: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "18px",
  },
  body2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
  },
  caption: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
  },
};

const colors = {
  data: {
    series: ["#2A8EFD", "#03C883", "#FFC93F", "#FF8228", "#FF2929"],
    seriesFont: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  },
  font: {
    colors: {
      light: {
        primary: "#000000",
        secondary: "#111111",
      },
      dark: {
        primary: "#FFFFFF",
        secondary: "#EEEEEE",
      },
    },
  },
  surfaces: {
    light: {
      background: "#FFFFFF",
      border: "#E0E0E0",
      graph: "#FFFFFF",
      graphBorder: "#E0E0E0",
    },
    grey: {
      background: "#F4F5F9",
      border: "#E0E0E0",
      graph: "#F4F5F9",
      graphBorder: "#E0E0E0",
    },
    dark: {
      background: "#000000",
      border: "#000000",
      graph: "#000000",
      graphBorder: "#000000",
    },
  },
};

const styles = {
  font: {
    properties: textFontProperties,
    sizes: {
      small: {
        title: "h5",
        subTitle: "caption",
        axisLabels: "body1",
        axisTicks: "body2",
      },
      normal: {
        title: "h4",
        subTitle: "body2",
        axisLabels: "body1",
        axisTicks: "body2",
      },
      large: {
        title: "h3",
        subTitle: "body1",
        axisLabels: "body1",
        axisTicks: "body2",
      },
    },
  },
  spacing: {
    outerPadding: 24,
    headingMargin: 24,
    titleSubTitleMargin: 16,
  },
};

export default {
  colors,
  styles,
  functions: {
    hexShade: (index, percent) => shadeColorHex(series[index], percent),
    hexAlpha: setAlphaHex,
    decimalToHex,
    chartSchemeColor: (scheme, type) => {
      if (type === "text" || type === "textPrimary") {
        return scheme === "light" || scheme === "grey"
          ? colors.font.colors.light.primary
          : colors.font.colors.dark.primary;
      }

      if (type === "textSecondary") {
        return scheme === "light" || scheme === "grey"
          ? colors.font.colors.light.secondary
          : colors.font.colors.dark.secondary;
      }

      if (type === "background") {
        return scheme === "light"
          ? colors.surfaces.light.background
          : scheme === "grey"
            ? colors.surfaces.grey.background
            : colors.surfaces.dark.background;
      }

      if (type === "border") {
        return scheme === "light"
          ? colors.surfaces.light.border
          : scheme === "grey"
            ? colors.surfaces.grey.border
            : colors.surfaces.dark.border;
      }

      if (type === "graph") {
        return scheme === "light"
          ? colors.surfaces.light.graph
          : scheme === "grey"
            ? colors.surfaces.grey.graph
            : colors.surfaces.dark.graph;
      }

      if (type === "graphBorder") {
        return scheme === "light"
          ? colors.surfaces.light.graphBorder
          : scheme === "grey"
            ? colors.surfaces.grey.graphBorder
            : colors.surfaces.dark.graphBorder;
      }
    },
  },
};
