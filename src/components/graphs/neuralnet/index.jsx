import React from "react";
import seedrandom from "seedrandom";
import { Line, Point } from "../vector";
import { lineToPathD } from "../svg";
import theme from "../theme";

const sparseWeightsEmulator = (layers, sparsity, layerVariance, seed) => {
  console.log("sparseWeightsEmulator");
  const random = seedrandom(seed);
  const layersWeights = [];
  console.log(layers);

  for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
    layersWeights.push([]);
    const sourceActivations = layers[layerIndex];
    const targetActivations = layers[layerIndex + 1];
    const totalWeights = sourceActivations * targetActivations;
    const minDenseWeights = (1 - (sparsity + layerVariance)) * totalWeights;

    // create random weight values between 0 and 1 while setting the number of weights needed for minDensity to 2
    const weightValues = [];
    let denseCount = 0;

    for (let i = 0; i < totalWeights; i++) {
      if (denseCount < minDenseWeights) {
        weightValues.push(2);
        denseCount++;
      } else {
        weightValues.push(random());
      }
    }

    // assign random weights from the list to the connections
    for (let sourceIndex = 0; sourceIndex < sourceActivations; sourceIndex++) {
      for (
        let targetIndex = 0;
        targetIndex < targetActivations;
        targetIndex++
      ) {
        const randomIndex = Math.floor(random() * weightValues.length);
        const weight = weightValues.splice(randomIndex, 1)[0];
        layersWeights[layerIndex].push(weight);
      }
    }
  }

  // now set the weights to sparse or dense based on their values while hitting the global sparsity target
  const weightValues = layersWeights.flat();
  weightValues.sort();
  const sparsityIndex = Math.floor(weightValues.length * sparsity);
  const denseThreshold = weightValues[sparsityIndex];

  for (let layerIndex = 0; layerIndex < layersWeights.length; layerIndex++) {
    for (
      let weightIndex = 0;
      weightIndex < layersWeights[layerIndex].length;
      weightIndex++
    ) {
      layersWeights[layerIndex][weightIndex] =
        layersWeights[layerIndex][weightIndex] < denseThreshold;
    }
  }

  return layersWeights;
};

const NeuralMagicNeuralNet = ({
  layers = [3, 4, 4, 2],
  activationSize = 96,
  weightSize = 20,
  activationSpacing = 64,
  activationStrokeWidth = 4,
  layerSpacing = null,
  colorIndex = 3,
  sparsity = 0.7,
  sparsityRandomSeed = 9,
  weightCompression = 4,
  activationCompression = 2,
}) => {
  // if (!activationSpacing) {
  //   activationSpacing = activationSize * 0.5;
  // }
  //
  // if (!layerSpacing) {
  //   layerSpacing = activationSpacing;
  // }
  //
  // const maxLayerSize = Math.max(...layers);
  // const layerCount = layers.length;
  // const activationRadius = activationSize / 2;
  // const quantizedActivationRadius = activationRadius / activationCompression;
  // const weightWidth = weightSize;
  // const quantizedWeightWidth = weightSize / weightCompression;
  //
  // const totalHeight =
  //   maxLayerSize * activationSize +
  //   (maxLayerSize - 1) * activationSpacing +
  //   2 * activationStrokeWidth;
  // const totalWidth =
  //   layerCount * activationSize +
  //   (layerCount - 1) * layerSpacing +
  //   2 * activationStrokeWidth;
  //
  // const layersActivations = [];
  //
  // for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
  //   const activations = [];
  //   const layerSize = layers[layerIndex];
  //   const layerWidth = activationSize + 2 * activationStrokeWidth;
  //   const layerHeight =
  //     layerSize * activationSize + (layerSize - 1) * activationSpacing;
  //   const layerX =
  //     layerIndex * (activationSize + layerSpacing) + activationStrokeWidth;
  //   const layerY = (totalHeight - layerHeight) / 2;
  //
  //   for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
  //     const centerX = layerX + activationRadius;
  //     const centerY =
  //       layerY +
  //       activationRadius +
  //       nodeIndex * (activationSize + activationSpacing);
  //     activations.push({
  //       base: new Point(centerX, centerY),
  //       quantized: activationCompression > 1,
  //     });
  //   }
  //
  //   layersActivations.push(activations);
  // }
  //
  // const activationsList = layersActivations.flat();
  // const weights = [];
  // const sparseWeights = sparseWeightsEmulator(
  //   layers,
  //   sparsity,
  //   0,
  //   sparsityRandomSeed,
  // );
  //
  // for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
  //   const sourceLayer = layersActivations[layerIndex];
  //   const targetLayer = layersActivations[layerIndex + 1];
  //
  //   for (
  //     let sourceNodeIndex = 0;
  //     sourceNodeIndex < sourceLayer.length;
  //     sourceNodeIndex++
  //   ) {
  //     const source = sourceLayer[sourceNodeIndex].base;
  //
  //     for (
  //       let targetNodeIndex = 0;
  //       targetNodeIndex < targetLayer.length;
  //       targetNodeIndex++
  //     ) {
  //       const target = targetLayer[targetNodeIndex].base;
  //       const weight = {
  //         base: new Line(
  //           new Point(source.x, source.y),
  //           new Point(target.x, target.y),
  //         ),
  //         quantized: weightCompression > 1,
  //         sparse:
  //           sparsity > 0 &&
  //           sparseWeights[layerIndex][
  //             sourceNodeIndex * targetLayer.length + targetNodeIndex
  //           ],
  //       };
  //
  //       weights.push(weight);
  //     }
  //   }
  // }
  //
  // const weightColor = "#848990";
  // const weightStrokeColor = colors.shadeColorHex(weightColor, -0.15);
  // const sparseWeightColor = colors.setAlphaHex(weightColor, 0.25);
  // const activationColor = colors.series[colorIndex % colors.series.length];
  // const uncompressedActivationColor = colors.setAlphaHex(activationColor, 0.25);
  // const activationStrokeColor = colors.shadeColorHex(
  //   colors.series[colorIndex % colors.series.length],
  //   -0.15,
  // );
  //
  // return (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     viewBox={`0 0 ${totalWidth} ${totalHeight}`}
  //     width={totalWidth}
  //     height={totalHeight}
  //   >
  //     {weights.map((weight, index) => {
  //       // base weights
  //       return (
  //         <path
  //           key={`weight_base_${index}`}
  //           d={lineToPathD(weight.base, weightWidth)}
  //           fill={
  //             weight.sparse || weight.quantized
  //               ? sparseWeightColor
  //               : weightColor
  //           }
  //           stroke={
  //             !weight.sparse && !weight.quantized ? weightStrokeColor : null
  //           }
  //           strokeWidth={!weight.sparse && !weight.quantized ? 2 : null}
  //         />
  //       );
  //     })}
  //     {weights.map((weight, index) => {
  //       // quantized weights
  //       if (weight.sparse || !weight.quantized) {
  //         return null;
  //       }
  //
  //       return (
  //         <path
  //           key={`weight_base_${index}`}
  //           d={lineToPathD(weight.base, quantizedWeightWidth)}
  //           fill={weightColor}
  //         />
  //       );
  //     })}
  //     {activationsList.map((activation, layerIndex) => {
  //       return (
  //         <circle
  //           key={`activation_base_${layerIndex}`}
  //           cx={activation.base.x}
  //           cy={activation.base.y}
  //           r={activationRadius}
  //           fill={
  //             activation.quantized
  //               ? uncompressedActivationColor
  //               : activationColor
  //           }
  //           stroke={!activation.quantized ? activationStrokeColor : null}
  //           strokeWidth={!activation.quantized ? activationStrokeWidth : null}
  //         />
  //       );
  //     })}
  //     {activationsList.map((activation, layerIndex) => {
  //       // quantized activations
  //       if (!activation.quantized) {
  //         return null;
  //       }
  //
  //       return (
  //         <circle
  //           key={`activation_quantized_${layerIndex}`}
  //           cx={activation.base.x}
  //           cy={activation.base.y}
  //           r={quantizedActivationRadius}
  //           fill={activationColor}
  //           stroke={activationStrokeColor}
  //           strokeWidth={activationStrokeWidth}
  //         />
  //       );
  //     })}
  //   </svg>
  // );
};

export default NeuralMagicNeuralNet;
