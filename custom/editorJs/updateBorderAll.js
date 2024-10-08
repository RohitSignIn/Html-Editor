import State from "./context/sharedState.js";

function updateBorderAll(e) {
  const color = document.getElementById("border-color").value;
  const style = document.getElementById("border-style").value;

  // Get values for all sides
  const allWidth = document.getElementById("border-width-all").value;

  console.log(allWidth);

  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.border = `${allWidth}px ${style} ${color}`;
  }

  // Setting updated border width to top right bottom left
  const topWidth = (document.getElementById("border-width-top").value = Number(
    State.getState("styleTargetElem")[0].style.borderTopWidth.slice(0, -2)
  ));
  const rightWidth = (document.getElementById("border-width-right").value =
    Number(
      State.getState("styleTargetElem")[0].style.borderRightWidth.slice(0, -2)
    ));
  const bottomWidth = (document.getElementById("border-width-bottom").value =
    Number(
      State.getState("styleTargetElem")[0].style.borderBottomWidth.slice(0, -2)
    ));
  const leftWidth = (document.getElementById("border-width-left").value =
    Number(
      State.getState("styleTargetElem")[0].style.borderLeftWidth.slice(0, -2)
    ));
}

export default updateBorderAll;
