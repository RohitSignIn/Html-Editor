import convertToHex from "./convertToHex.js";
import State from "./context/sharedState.js";

function handleTargetClick(event) {
  // display none to all styles element first
  const customStyle = document.getElementById("custom-style").children;
  document.getElementById("nav-catg-pos-3-back").style.display = "none"
  for (const child of customStyle) {
    child.style.display = "none"
  }

  const tempEditor = document.getElementById("temp-editor");

  if (State.getState("styleTargetElem").length != 0) {
    for (const targetElem of State.getState("styleTargetElem")) {
      targetElem.style.boxShadow = "none";
    }
  }

  State.setState("styleTargetElem", event.target);
  
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.boxShadow = "0px 0px 0px 2px blue";
  }

  document.getElementById("style-nav").style.display = "block";
  document.getElementById("editor-nav").style.display = "none";

  const targetComputedStyle = getComputedStyle(
    State.getState("styleTargetElem")[0]
  );
  console.log(targetComputedStyle);
  console.log(targetComputedStyle["box-shadow"]);

  // Add Data in Padding

  // Getting Taregt Padding and Set in style
  tempEditor.querySelector(".pd-i-1 span").textContent = targetComputedStyle[
    "padding-top"
  ].slice(0, -2);

  tempEditor.querySelector(".pd-i-2 span").textContent = targetComputedStyle[
    "padding-left"
  ].slice(0, -2);

  tempEditor.querySelector(".pd-i-4 span").textContent = targetComputedStyle[
    "padding-right"
  ].slice(0, -2);

  tempEditor.querySelector(".pd-i-5 span").textContent = targetComputedStyle[
    "padding-bottom"
  ].slice(0, -2);

  // Getting Taregt Margin and Set in style
  tempEditor.querySelector(".mr-i-1 span").textContent = targetComputedStyle[
    "margin-top"
  ].slice(0, -2);

  tempEditor.querySelector(".mr-i-2 span").textContent = targetComputedStyle[
    "margin-left"
  ].slice(0, -2);

  tempEditor.querySelector(".mr-i-4 span").textContent = targetComputedStyle[
    "margin-right"
  ].slice(0, -2);

  tempEditor.querySelector(".mr-i-5 span").textContent = targetComputedStyle[
    "margin-bottom"
  ].slice(0, -2);

  // Getting Target background
  //        tempEditor.querySelectorAll;
  //      targetComputedStyle["background-color"];

  // Setting Font
  const fontSel = document.getElementById("font-select");
  fontSel.value = targetComputedStyle["fontFamily"];

  // Setting bold italic underline BIU
  const allFontBIU = document.querySelector(".font-biu");
  let allFontBiuChild = allFontBIU.children;

  let i = 0;
  for (const fontBIU of allFontBiuChild) {
    if (i == 0 || i == allFontBiuChild.length - 1) {
      i++;
      continue;
    }
    i++;

    if (
      (targetComputedStyle["font-weight"].search("600") != -1 ||
        targetComputedStyle["font-weight"].search("bold") != -1) &&
      fontBIU.textContent == "B"
    ) {
      fontBIU.setAttribute("active", "true");
    } else if (
      targetComputedStyle["font-style"].search("italic") != -1 &&
      fontBIU.textContent == "I"
    ) {
      fontBIU.setAttribute("active", "true");
    } else if (
      targetComputedStyle["text-decoration"].search("underline") != -1 &&
      fontBIU.textContent == "U"
    ) {
      fontBIU.setAttribute("active", "true");
    } else {
      fontBIU.removeAttribute("active");
    }
  }

  // Changing font editor value to the taregt font size
  allFontBiuChild[allFontBiuChild.length - 1].textContent = Math.round(
    Number(targetComputedStyle["font-size"].slice(0, -2))
  );

  // Handling Border enternig border value in border style editor
  const borderLineCon = document.querySelectorAll("[type=border-line]");

  let borderColor = null;

  if (
    targetComputedStyle["border-top-color"] != "" &&
    targetComputedStyle["border-top-color"] != "none"
  ) {
    borderColor = targetComputedStyle["border-top-color"];
  } else if (
    targetComputedStyle["border-right-color"] != "" &&
    targetComputedStyle["border-right-color"] != "none"
  ) {
    borderColor = targetComputedStyle["border-right-color"];
  } else if (
    targetComputedStyle["border-bottom-color"] != "" &&
    targetComputedStyle["border-bottom-color"] != "none"
  ) {
    borderColor = targetComputedStyle["border-bottom-color"];
  } else if (
    targetComputedStyle["border-left-color"] != "" &&
    targetComputedStyle["border-left-color"] != "none"
  ) {
    borderColor = targetComputedStyle["border-left-color"];
  }

  document.getElementById("border-color").value = convertToHex(borderColor);

  for (const bLine of borderLineCon) {
    const bInputCon = bLine.querySelector("input");
    if (
      bInputCon.id == "border-width-all" &&
      Number(targetComputedStyle["border-top-width"].slice(0, -2)) != 0 &&
      ((targetComputedStyle["border-top-width"] ==
        targetComputedStyle["border-right-width"]) ==
        targetComputedStyle["border-bottom-width"]) ==
        targetComputedStyle["border-left-width"]
    ) {
      bInputCon.value = Number(
        targetComputedStyle["border-top-width"].slice(0, -2)
      );
    } else if (
      bInputCon.id == "border-width-top" &&
      Number(targetComputedStyle["border-top-width"].slice(0, -2)) != 0
    ) {
      bInputCon.value = Number(
        targetComputedStyle["border-top-width"].slice(0, -2)
      );
    } else if (
      bInputCon.id == "border-width-right" &&
      Number(targetComputedStyle["border-right-width"].slice(0, -2)) != 0
    ) {
      bInputCon.value = Number(
        targetComputedStyle["border-right-width"].slice(0, -2)
      );
    } else if (
      bInputCon.id == "border-width-bottom" &&
      Number(targetComputedStyle["border-bottom-width"].slice(0, -2)) != 0
    ) {
      bInputCon.value = Number(
        targetComputedStyle["border-bottom-width"].slice(0, -2)
      );
    } else if (
      bInputCon.id == "border-width-left" &&
      Number(targetComputedStyle["border-left-width"].slice(0, -2)) != 0
    ) {
      bInputCon.value = Number(
        targetComputedStyle["border-left-width"].slice(0, -2)
      );
    } else {
      bInputCon.value = 0;
    }
  }

  // Handling SVG Active on Target Click
  const bottomLeft = targetComputedStyle["borderBottomLeftRadius"];
  const bottomRight = targetComputedStyle["borderBottomRightRadius"];
  const topLeft = targetComputedStyle["borderTopLeftRadius"];
  const topRight = targetComputedStyle["borderTopRightRadius"];

  let borderRadius = [topLeft, topRight, bottomRight, bottomLeft];

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

  // Handling Box Shadow data fill on target Click - START
  const boxShadowStr = targetComputedStyle["box-shadow"];

  // Regular expression to match the parts of the box-shadow string
  const regex =
    /^((?:rgb|rgba|hsl|hsla|#(?:[0-9a-fA-F]{3}){1,2}|[a-zA-Z]+)\([^\)]*\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\s*(-?\d+px)\s*(-?\d+px)\s*(-?\d+px)\s*(-?\d+px)$/i;

  // Apply regex to the box-shadow string
  const match = boxShadowStr.match(regex);

  if (match) {
    // Extracted values from the match array
    const offsetX = match[2];
    const offsetY = match[3];
    const blurRadius = match[4];
    const spreadRadius = match[5];
    const color = convertToHex(match[1]);

    document.getElementById("b-r-horizontal").value = Number(
      offsetX.slice(0, -2)
    );
    document.getElementById("b-r-vertical").value = Number(
      offsetY.slice(0, -2)
    );
    document.getElementById("b-r-blur").value = Number(blurRadius.slice(0, -2));
    document.getElementById("b-r-spread").value = Number(
      spreadRadius.slice(0, -2)
    );
    document.getElementById("b-r-color").value = color;

    document.getElementById("horizontal-value").textContent = offsetX;
    document.getElementById("vertical-value").textContent = offsetY;
    document.getElementById("blur-value").textContent = blurRadius;
    document.getElementById("spread-value").textContent = spreadRadius;
  } else {
    console.log("The box-shadow string did not match the expected format.");
  }
  // Handling Box Shadow data fill on target Click - END


  // Handling Layout - START
    const flexD = targetComputedStyle["flex-direction"]
    const flexJc = targetComputedStyle["justify-content"]
    const flexAi = targetComputedStyle["align-items"]
    const flexG = targetComputedStyle["gap"]

    if(State.getState("styleTargetElem")[0].style.display == "flex"){
      console.log(" I am IN")
      document.getElementById("layout-direction").value = flexD
      document.getElementById("layout-justify").value = flexJc
      document.getElementById("layout-align").value = flexAi
      document.getElementById("layout-gap").value = flexG == "normal" ? 0 : Math.round(Number(flexG.slice(0, -2)))
      document.getElementById("layout-gapValue").textContent = flexG == "normal" ? 0 : `${Math.round(Number(flexG.slice(0, -2)))}`
    }else{
      console.log(" I am IN Else")
      document.getElementById("layout-direction").value = 'normal'
      document.getElementById("layout-justify").value = 'normal'
      document.getElementById("layout-align").value = 'normal'
      document.getElementById("layout-gap").value = 0
      document.getElementById("layout-gapValue").textContent = "0"
    }
    console.log(flexD, flexJc, flexAi, flexG, 'mic Check')
  // Handling Layout - END
}

export default handleTargetClick;
