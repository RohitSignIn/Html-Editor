function convertToHex(color) {
  // Check if the input is a hex color code
  const hexMatch = color.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);

  if (hexMatch) {
    return color; // Return the hex color as-is
  }

  // Check for RGB and convert it to hex
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);

    // Convert each RGB component to a 2-digit hex string and combine them
    return `#${[r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;
  }

  return null; // Return null if the input is not in a recognized format
}

export default convertToHex;
