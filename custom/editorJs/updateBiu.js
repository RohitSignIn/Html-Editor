import State from "./context/sharedState.js";

function handleUpdateBIU(e) {
  if (e.target.hasAttribute("active")) {
    e.target.removeAttribute("active");
    if (e.target.textContent == "B") {
      document.execCommand("bold");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.fontWeight = "400";
      }
    } else if (e.target.textContent == "I") {
      document.execCommand("none");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.fontStyle = "normal";
      }
    } else if (e.target.textContent == "U") {
      document.execCommand("underline");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.textDecoration = "none";
      }
    }
  } else {
    e.target.setAttribute("active", "true");
    if (e.target.textContent == "B") {
      document.execCommand("bold");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.fontWeight = "600";
      }
    } else if (e.target.textContent == "I") {
      document.execCommand("italic");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.fontStyle = "italic";
      }
    } else if (e.target.textContent == "U") {
      document.execCommand("underline");
      for (const targetElem of State.getState("styleTargetElem")) {
        targetElem.style.textDecoration = "underline";
      }
    }
  }
}

export default handleUpdateBIU;
