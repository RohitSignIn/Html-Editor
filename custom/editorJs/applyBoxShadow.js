import State from "./context/sharedState.js";

// Function to apply box shadow
function applyBoxShadow() {
  const horizontalInput = document.getElementById("b-r-horizontal");
  const verticalInput = document.getElementById("b-r-vertical");
  const blurInput = document.getElementById("b-r-blur");
  const spreadInput = document.getElementById("b-r-spread");
  const colorInput = document.getElementById("b-r-color");
  // Get references to the value display elements
  const horizontalValue = document.getElementById("horizontal-value");
  const verticalValue = document.getElementById("vertical-value");
  const blurValue = document.getElementById("blur-value");
  const spreadValue = document.getElementById("spread-value");
  // Get the input values
  const horizontal = horizontalInput.value;
  const vertical = verticalInput.value;
  const blur = blurInput.value;
  const spread = spreadInput.value;
  const color = colorInput.value;

  // Update the value displays
  console.log(horizontalValue);
  horizontalValue.textContent = `${horizontal}px`;
  verticalValue.textContent = `${vertical}px`;
  blurValue.textContent = `${blur}px`;
  spreadValue.textContent = `${spread}px`;

  // Construct the box-shadow property
  const boxShadow = `${horizontal}px ${vertical}px ${blur}px ${spread}px ${color}`;

  // Apply the box-shadow to the preview element
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.boxShadow = boxShadow;
  }
}

export default applyBoxShadow;
