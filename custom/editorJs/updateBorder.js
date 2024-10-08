// Handling Border

import State from "./context/sharedState.js";

// getting border lines click
function updateBorder() {
  const color = document.getElementById("border-color").value;
  const style = document.getElementById("border-style").value;

  // Get values for all sides
  const allWidth = document.getElementById("border-width-all").value;
  const topWidth = document.getElementById("border-width-top").value;
  const rightWidth = document.getElementById("border-width-right").value;
  const bottomWidth = document.getElementById("border-width-bottom").value;
  const leftWidth = document.getElementById("border-width-left").value;

  // Determine if individual values are provided;
  const borderWidthTop = topWidth ? `${topWidth}px` : `${allWidth}px`;
  const borderWidthRight = rightWidth ? `${rightWidth}px` : `${allWidth}px`;
  const borderWidthBottom = bottomWidth ? `${bottomWidth}px` : `${allWidth}px`;
  const borderWidthLeft = leftWidth ? `${leftWidth}px` : `${allWidth}px`;

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.borderTop = `${borderWidthTop} ${style} ${color}`;
  }

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.borderRight = `${borderWidthRight} ${style} ${color}`;
  }

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.borderBottom = `${borderWidthBottom} ${style} ${color}`;
  }

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.borderLeft = `${borderWidthLeft} ${style} ${color}`;
  }
}

export default updateBorder;
