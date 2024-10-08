import State from "./context/sharedState.js";

// Function to apply border-radius based on button clicked
function applyBorderRadius(radIdx) {
  const targetComputedStyle = getComputedStyle(State.getState("styleTargetElem")[0]);
  const bottomLeft = targetComputedStyle["borderBottomLeftRadius"];
  const bottomRight = targetComputedStyle["borderBottomRightRadius"];
  const topLeft = targetComputedStyle["borderTopLeftRadius"];
  const topRight = targetComputedStyle["borderTopRightRadius"];

  let borderRadius = [topLeft, topRight, bottomRight, bottomLeft];
  if (radIdx != 11 && borderRadius[radIdx] == State.getState("borderRadiusPx")) {
    borderRadius[radIdx] = "0px";
  } else if (radIdx != 11) {
    borderRadius[radIdx] = State.getState("borderRadiusPx");
  }

  if (radIdx == 11) {
    if (
      borderRadius[0] == borderRadius[1] &&
      borderRadius[0] == borderRadius[2] &&
      borderRadius[0] == borderRadius[3] &&
      borderRadius[0] == State.getState("borderRadiusPx")
    ) {
      borderRadius = ["0px", "0px", "0px", "0px"];
    } else {
      borderRadius = [
        State.getState("borderRadiusPx"),
        State.getState("borderRadiusPx"),
        State.getState("borderRadiusPx"),
        State.getState("borderRadiusPx"),
      ];
    }
  }

  let radStr = "";
  for (const str of borderRadius) {
    radStr += str + " ";
  }

  // Handling SVG Active on btn click
  const allRadiusSvgBtn = document.querySelectorAll(".radius-buttons svg");
  let allHaveRadius = true;
  for (let i = 0; i <= 3; i++) {
    if (borderRadius[i] == State.getState("borderRadiusPx")) {
      allRadiusSvgBtn[i + 1].setAttribute("type", "active");
    } else {
      allHaveRadius = false;
      allRadiusSvgBtn[i + 1].removeAttribute("type");
    }
  }
  // If All Active handling all radius  svg
  if (allHaveRadius) {
    allRadiusSvgBtn[0].setAttribute("type", "active");
  } else {
    allRadiusSvgBtn[0].removeAttribute("type");
  }

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.borderRadius = radStr;
  }
}

export default applyBorderRadius;
