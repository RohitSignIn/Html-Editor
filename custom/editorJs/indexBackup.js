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

  let styleTargetElem = null;
  const borderRadiusPx = "10px";
  const tempWrap = document.getElementById("temp-wrap");
  const tempEditor = document.getElementById("temp-editor");

  document.getElementById("temp-def").click();
  tempWrap.addEventListener("click", handleTargetClick);

  // Making styling area editable
  for (const con of tempEditor.querySelectorAll(".area-edit")) {
    con.addEventListener("keydown", handlePxChangeBefore);
    con.addEventListener("keyup", handlePxChangeAfter);

    con.addEventListener("dblclick", (e) => {
      e.target.setAttribute("contenteditable", "true");

      e.target.style.border = "1px solid #e7e7e7";
      e.target.style.padding = "0.2rem 0.4rem";
      e.target.style.outline = "none";

      e.target.focus();

      e.target.addEventListener("blur", (e) =>
        e.target.removeAttribute("contenteditable")
      );
    });
  }

  function handlePxChangeBefore(e) {
    if (
      Number(e.key) ||
      e.key == "Backspace" ||
      e.key == "Enter" ||
      e.key == "ArrowLeft" ||
      e.key == "ArrowRight" ||
      e.key == "ArrowUp" ||
      e.key == "ArrowDown"
    ) {
      if (e.key == "Enter") {
        e.target.blur();
      }
      if (e.key == "ArrowUp") {
        e.target.textContent = Number(e.target.textContent) + 1;
      }
      if (e.key == "ArrowDown" && Number(e.target.textContent) > 0) {
        e.target.textContent = Number(e.target.textContent) - 1;
      }
    } else {
      e.preventDefault();
    }
  }

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
        styleTargetElem.style[`${sel}Top`] = e.target.textContent + "px";
      }
      if (e.target.hasAttribute("right")) {
        styleTargetElem.style[`${sel}Right`] = e.target.textContent + "px";
      }
      if (e.target.hasAttribute("bottom")) {
        styleTargetElem.style[`${sel}Bottom`] = e.target.textContent + "px";
      }
      if (e.target.hasAttribute("left")) {
        styleTargetElem.style[`${sel}Left`] = e.target.textContent + "px";
      }
      if (type != null && type == "font-size") {
        styleTargetElem.style.fontSize = e.target.textContent + "px";
      }
    }
  }

  function handleTargetClick(event) {
    if (styleTargetElem != null) {
      styleTargetElem.style.boxShadow = "none";
    }
    styleTargetElem = event.target;
    styleTargetElem.style.boxShadow = "0px 0px 0px 2px blue";

    document.getElementById("style-nav").style.display = "block"
    document.getElementById("editor-nav").style.display = "none"


    const targetComputedStyle = getComputedStyle(styleTargetElem);
    console.log(targetComputedStyle);
    console.log(targetComputedStyle["box-shadow"]);

    // Add Data in Padding

    // Getting Taregt Padding and Set in style
    tempEditor.querySelector(".pd-i-1 span").textContent =
      targetComputedStyle["padding-top"].slice(0, -2);

    tempEditor.querySelector(".pd-i-2 span").textContent =
      targetComputedStyle["padding-left"].slice(0, -2);

    tempEditor.querySelector(".pd-i-4 span").textContent =
      targetComputedStyle["padding-right"].slice(0, -2);

    tempEditor.querySelector(".pd-i-5 span").textContent =
      targetComputedStyle["padding-bottom"].slice(0, -2);

    // Getting Taregt Margin and Set in style
    tempEditor.querySelector(".mr-i-1 span").textContent =
      targetComputedStyle["margin-top"].slice(0, -2);

    tempEditor.querySelector(".mr-i-2 span").textContent =
      targetComputedStyle["margin-left"].slice(0, -2);

    tempEditor.querySelector(".mr-i-4 span").textContent =
      targetComputedStyle["margin-right"].slice(0, -2);

    tempEditor.querySelector(".mr-i-5 span").textContent =
      targetComputedStyle["margin-bottom"].slice(0, -2);

    // Getting Target background
    //        tempEditor.querySelectorAll;
    //      targetComputedStyle["background-color"];

    // Setting Font
    const fontSel = document.getElementById("font-select");
    fontSel.value = targetComputedStyle["fontFamily"];

    // Setting bold italic underline BIU
    allFontBiuChild = allFontBIU.children;

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
    allFontBiuChild[allFontBiuChild.length - 1].textContent =
      Math.round(Number(targetComputedStyle["font-size"].slice(0, -2)));

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

    document.getElementById("border-color").value =
      convertToHex(borderColor);

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

    const allRadiusSvgBtn = document.querySelectorAll(
      ".radius-buttons svg"
    );
    let allHaveRadius = true;
    for (let i = 0; i <= 3; i++) {
      if (borderRadius[i] == borderRadiusPx) {
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
      document.getElementById("b-r-blur").value = Number(
        blurRadius.slice(0, -2)
      );
      document.getElementById("b-r-spread").value = Number(
        spreadRadius.slice(0, -2)
      );
      document.getElementById("b-r-color").value = color;

      document.getElementById("horizontal-value").textContent = offsetX;
      document.getElementById("vertical-value").textContent = offsetY;
      document.getElementById("blur-value").textContent = blurRadius;
      document.getElementById("spread-value").textContent = spreadRadius;
    } else {
      console.log(
        "The box-shadow string did not match the expected format."
      );
    }

    // Handling Box Shadow data fill on target Click - END
  }

  // Color Picker - For Background
  const pickr = Pickr.create({
    el: "#color-picker",
    theme: "classic", // or 'monolith', 'nano'
    components: {
      preview: false,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        input: true,
        save: false,
      },
    },
  });

  // Open the color picker automatically
  pickr.on("init", () => {
    pickr.show();
  });
  pickr.on("hide", () => {
    pickr.show();
  });

  // Update the display box with the selected color
  pickr.on("change", (color) => {
    const rgbaColor = color.toRGBA().toString();
    styleTargetElem.style.background = rgbaColor;
  });

  // Color Picker - For Font
  const pickr2 = Pickr.create({
    el: "#color-picker2",
    theme: "classic", // or 'monolith', 'nano'
    components: {
      preview: false,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        input: true,
        save: false,
      },
    },
  });

  // Open the color picker automatically
  pickr2.on("init", () => {
    pickr2.show();
  });
  pickr2.on("hide", () => {
    pickr2.show();
  });

  // Update the display box with the selected color
  pickr2.on("change", (color) => {
    const rgbaColor = color.toRGBA().toString();
    styleTargetElem.style.color = rgbaColor;
  });

  document.addEventListener("DOMContentLoaded", function (event) {
    const pcrApps = document.querySelectorAll(".pcr-app");
    let i = 0;
    for (const pcrApp of pcrApps) {
      if (i == 0) {
        const colPickr = document.querySelector(".bg-i-1 .pickr");
        colPickr.append(pcrApp);
      } else {
        const colPickr = document.querySelector(".font-i-1 .pickr");
        colPickr.append(pcrApp);
      }
      i++;
    }
  });

  // Changing Font
  // Get references to the select element and sample text div
  const fontSelect = document.getElementById("font-select");
  const sampleText = document.getElementById("sample-text");

  // Event listener to update sample text font when a selection is made
  fontSelect.addEventListener("change", () => {
    // Get the selected font family value from the dropdown
    const selectedFont = fontSelect.value;

    // Apply the selected font family to the sample text
    sampleText.style.fontFamily = selectedFont;
    styleTargetElem.style.fontFamily = selectedFont;
  });

  // Bold Italic Underline
  const allFontBIU = document.querySelector(".font-biu");

  function handleUpdateBIU(e) {
    console.log(e.target.textContent);
    if (e.target.hasAttribute("active")) {
      e.target.removeAttribute("active");
      if (e.target.textContent == "B") {
        document.execCommand("bold");
        styleTargetElem.style.fontWeight = "400";
      } else if (e.target.textContent == "I") {
        document.execCommand("none");
        styleTargetElem.style.fontStyle = "normal";
      } else if (e.target.textContent == "U") {
        document.execCommand("underline");
        styleTargetElem.style.textDecoration = "none";
      }
    } else {
      e.target.setAttribute("active", "true");
      if (e.target.textContent == "B") {
        document.execCommand("bold");
        styleTargetElem.style.fontWeight = "600";
      } else if (e.target.textContent == "I") {
        document.execCommand("italic");
        styleTargetElem.style.fontStyle = "italic";
      } else if (e.target.textContent == "U") {
        document.execCommand("underline");
        styleTargetElem.style.textDecoration = "underline";
      }
    }
  }

  let i = 0;
  for (const fontBIU of allFontBIU.children) {
    if (i == 0 || i == allFontBIU.children.length - 1) {
      i++;
      continue;
    }
    i++;
    fontBIU.addEventListener("click", (e) => handleUpdateBIU(e));
  }

  // Handling Border
  // getting border lines click
  function updateBorder() {
    const color = document.getElementById("border-color").value;
    const style = document.getElementById("border-style").value;

    // Get values for all sides
    const allWidth = document.getElementById("border-width-all").value;
    const topWidth = document.getElementById("border-width-top").value;
    const rightWidth = document.getElementById("border-width-right").value;
    const bottomWidth = document.getElementById(
      "border-width-bottom"
    ).value;
    const leftWidth = document.getElementById("border-width-left").value;

    // Determine if individual values are provided;
    const borderWidthTop = topWidth ? `${topWidth}px` : `${allWidth}px`;
    const borderWidthRight = rightWidth
      ? `${rightWidth}px`
      : `${allWidth}px`;
    const borderWidthBottom = bottomWidth
      ? `${bottomWidth}px`
      : `${allWidth}px`;
    const borderWidthLeft = leftWidth ? `${leftWidth}px` : `${allWidth}px`;

    styleTargetElem.style.borderTop = `${borderWidthTop} ${style} ${color}`;
    styleTargetElem.style.borderRight = `${borderWidthRight} ${style} ${color}`;
    styleTargetElem.style.borderBottom = `${borderWidthBottom} ${style} ${color}`;
    styleTargetElem.style.borderLeft = `${borderWidthLeft} ${style} ${color}`;
  }

  function updateBorderAll(e) {
    const color = document.getElementById("border-color").value;
    const style = document.getElementById("border-style").value;

    // Get values for all sides
    const allWidth = document.getElementById("border-width-all").value;

    console.log(allWidth);

    styleTargetElem.style.border = `${allWidth}px ${style} ${color}`;

    // Setting updated border width to top right bottom left
    const topWidth = (document.getElementById("border-width-top").value =
      Number(styleTargetElem.style.borderTopWidth.slice(0, -2)));
    const rightWidth = (document.getElementById(
      "border-width-right"
    ).value = Number(styleTargetElem.style.borderRightWidth.slice(0, -2)));
    const bottomWidth = (document.getElementById(
      "border-width-bottom"
    ).value = Number(styleTargetElem.style.borderBottomWidth.slice(0, -2)));
    const leftWidth = (document.getElementById("border-width-left").value =
      Number(styleTargetElem.style.borderLeftWidth.slice(0, -2)));
  }

  // Add event listeners to all input elements
  document
    .querySelectorAll("#border input, #border select")
    .forEach((el) => {
      el.addEventListener("input", updateBorder);
    });

  const allBorder = document.getElementById("border-width-all");
  allBorder.addEventListener("change", updateBorderAll);

  // Function to apply border-radius based on button clicked
  function applyBorderRadius(radIdx) {
    const targetComputedStyle = getComputedStyle(styleTargetElem);
    const bottomLeft = targetComputedStyle["borderBottomLeftRadius"];
    const bottomRight = targetComputedStyle["borderBottomRightRadius"];
    const topLeft = targetComputedStyle["borderTopLeftRadius"];
    const topRight = targetComputedStyle["borderTopRightRadius"];

    let borderRadius = [topLeft, topRight, bottomRight, bottomLeft];
    if (radIdx != 11 && borderRadius[radIdx] == borderRadiusPx) {
      borderRadius[radIdx] = "0px";
    } else if (radIdx != 11) {
      borderRadius[radIdx] = borderRadiusPx;
    }

    if (radIdx == 11) {
      if (
        borderRadius[0] == borderRadius[1] &&
        borderRadius[0] == borderRadius[2] &&
        borderRadius[0] == borderRadius[3] &&
        borderRadius[0] == borderRadiusPx
      ) {
        borderRadius = ["0px", "0px", "0px", "0px"];
      } else {
        borderRadius = [
          borderRadiusPx,
          borderRadiusPx,
          borderRadiusPx,
          borderRadiusPx,
        ];
      }
    }

    let radStr = "";
    for (const str of borderRadius) {
      radStr += str + " ";
    }

    // Handling SVG Active on btn click
    const allRadiusSvgBtn = document.querySelectorAll(
      ".radius-buttons svg"
    );
    let allHaveRadius = true;
    for (let i = 0; i <= 3; i++) {
      if (borderRadius[i] == borderRadiusPx) {
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

    styleTargetElem.style.borderRadius = radStr;
  }

  // Event listeners for border-radius buttons
  document.getElementById("all-sides").addEventListener("click", () => {
    applyBorderRadius(11); // All sides
  });

  document.getElementById("top-left").addEventListener("click", () => {
    applyBorderRadius(0); // Top-left
  });

  document.getElementById("top-right").addEventListener("click", () => {
    applyBorderRadius(1); // Top-right
  });

  document.getElementById("bottom-right").addEventListener("click", () => {
    applyBorderRadius(2); // Bottom-right
  });

  document.getElementById("bottom-left").addEventListener("click", () => {
    applyBorderRadius(3); // Bottom-left
  });

  // Handling Box Shadow - START
  // Get references to the input elements
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

  // Function to apply box shadow
  function applyBoxShadow() {
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
    styleTargetElem.style.boxShadow = boxShadow;
  }

  // Add event listeners to slider inputs
  horizontalInput.addEventListener("input", applyBoxShadow);
  verticalInput.addEventListener("input", applyBoxShadow);
  blurInput.addEventListener("input", applyBoxShadow);
  spreadInput.addEventListener("input", applyBoxShadow);
  colorInput.addEventListener("input", applyBoxShadow);
  // Handling Box Shadow - END

  // handling Editor Navigation
  function handleNavCatgPos1(e) {
    const clickedElem = e.currentTarget.children[1].textContent;
    if (clickedElem == "Templates") {
      document.getElementById("avlbl-temp").style.display = "flex";
      document.getElementById("nav-catg-pos-3-back").style.display = "block"
      e.currentTarget.parentElement.parentElement.style.display = "none";
    } else {
      document.getElementById("nav-catg-pos-3-back").style.display = "none"
      document.getElementById("avlbl-temp").style.display = "none";
    }

    if (clickedElem != "Templates") {
      document.getElementById("style-nav").style.display = "block";
      e.currentTarget.parentElement.parentElement.style.display = "none";
    }
  }

  function handleNavCatgPos2(e) {
    const clickedElem = e.currentTarget.children[1].textContent;
    let currSel = "";
    if(clickedElem == "Layout") {
      console.log("Layout")
    currSel = "Layout"
    }
    if(clickedElem == "Padding") {
      document.getElementById("padding").style.display = "grid"
    currSel = "padding"
    }
    if(clickedElem == "Margin") {
      document.getElementById("margin").style.display = "grid"
    currSel = "margin"
    }
    if(clickedElem == "Background") {
      document.getElementById("background").style.display = "block"
    currSel = "background"
    }
    if(clickedElem == "Font") {
      document.getElementById("font").style.display = "flex"
    currSel = "font"
    }
    if(clickedElem == "Border") {
      document.getElementById("border").style.display = "block"
    currSel = "border"
    }
    if(clickedElem == "Box Shadow") {
      document.getElementById("box-shadow").style.display = "block"
    currSel = "box-shadow"
    }

    const customStyleCon = document.getElementById("custom-style").children
    
    for (const st of customStyleCon){
      if(st.id == currSel) continue
      st.style.display = "none"
    }

    document.getElementById("nav-catg-pos-3-back").style.display = "block"
    document.getElementById("style-nav").style.display = "none"
  }

  function handleBackPos2(e) {
    document.getElementById("editor-nav").style.display = "block"
    e.currentTarget.parentElement.style.display = "none"
  }

  function handleBackPos3(e) {
    document.getElementById("nav-catg-pos-3-back").style.display = "none"
    if(document.getElementById("avlbl-temp").style.display == "flex") {
      document.getElementById("avlbl-temp").style.display = "none"
      document.getElementById("editor-nav").style.display = "block"
    } else { 
      document.getElementById("style-nav").style.display = "block"
      const customStyleCon = document.getElementById("custom-style").children
      for (const st of customStyleCon){
        st.style.display = "none"
      }
    }
  }

  const navCatgPos1 = document.querySelectorAll(".nav-catg-pos-1");
  for (const catg of navCatgPos1) {
    catg.addEventListener("click", handleNavCatgPos1);
  }

  const navCatgPos2 = document.querySelectorAll(".nav-catg-pos-2");
  for (const catg of navCatgPos2) {
    document.getElementById("nav-catg-pos-3-back").addEventListener('click', handleBackPos3)
    catg.addEventListener("click", handleNavCatgPos2);
  }


  document
    .getElementById("nav-catg-pos-2-back")
    .addEventListener("click", handleBackPos2);