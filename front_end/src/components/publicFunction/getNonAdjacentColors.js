// export default function getNonAdjacentColors(data, colors) {
//   let colorAssignments = [];
//   let lastColorIndex = -1;

//   for (let i = 0; i < data.length; i++) {
//     let colorIndex;
//     do {
//       // Math.random() generates a floating-point number in the range [0, 1),
//       //      which means it includes 0 but is always less than 1
//       colorIndex = Math.floor(Math.random() * colors.length);
//     } while (colorIndex === lastColorIndex);
//     colorAssignments.push(colors[colorIndex]);
//     lastColorIndex = colorIndex;
//   }

//   return colorAssignments;
// }

export default function getNonAdjacentColors(data, colors) {
  let colorAssignments = [];

  // Assign colors using modulo operation
  for (let i = 0; i < data.length; i++) {
    colorAssignments[i] = colors[i % colors.length];
  }

  // Ensure the first and last segments do not have the same color
  if (colorAssignments[data.length - 1] === colorAssignments[0]) {
    // Find a suitable color for the last segment
    for (let j = 1; j < colors.length; j++) {
      if (
        colors[j] !== colorAssignments[0] &&
        colors[j] !== colorAssignments[data.length - 2]
      ) {
        colorAssignments[data.length - 1] = colors[j];
        break;
      }
    }
  }

  return colorAssignments;
}
