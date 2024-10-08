import State from "./context/sharedState.js";

function handlePxChangeAfter(e) {
  if (e.key == "Backspace" && e.target.textContent.length == "") {
    e.target.textContent = 0;
  }

  let type = null;
  if (e.target.hasAttribute("type")) {
    type = e.target.getAttribute("type");
  }

  if (e.key != "Backspace" && e.target.textContent.length != "") {
    const sel = e.target.parentElement.parentElement.id;
    if (e.target.hasAttribute("top")) {
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style[`${sel}Top`] = e.target.textContent + "px";
      }
    }
    if (e.target.hasAttribute("right")) {
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style[`${sel}Right`] = e.target.textContent + "px";
      }
    }
    if (e.target.hasAttribute("bottom")) {
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style[`${sel}Bottom`] = e.target.textContent + "px";
      }
    }
    if (e.target.hasAttribute("left")) {
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style[`${sel}Left`] = e.target.textContent + "px";
      }
    }
    if (type != null && type == "font-size") {
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.fontSize = e.target.textContent + "px";
      }
    }
  }
}

export default handlePxChangeAfter;
