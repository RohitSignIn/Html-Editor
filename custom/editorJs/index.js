import handlePxChangeBefore from "./pxChangeBefore.js";
import handlePxChangeAfter from "./pxChangeAfter.js";
import handleTargetClick from "./targetClick.js";
import updateBorder from "./updateBorder.js";
import updateBorderAll from "./updateBorderAll.js";
import applyBoxShadow from "./ApplyBoxShadow.js";
import handleNavCatgPos1 from "./navCatgPos1.js";
import handleNavCatgPos2 from "./navCatgPos2.js";
import State from "./context/sharedState.js";
import handleUpdateBIU from "./updateBiu.js";
import applyBorderRadius from "./applyBorderRadius.js";

const tempWrap = document.getElementById("temp-wrap");
const tempEditor = document.getElementById("temp-editor");

window.addEventListener('load', () => {
  try {
      const stylesheet = document.styleSheets[0]; // or the specific stylesheet you're targeting
      const rules = stylesheet.cssRules; // Accessing cssRules
      console.log(rules);
  } catch (e) {
      console.error('Error accessing cssRules:', e);
  }
});

// Clicking to default template by default to active it
document.getElementById("temp-a").click();

// On target Click - Handle it set all styles values
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
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.background = rgbaColor;
  }
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
  // console.log(State.getState("styleTargetElem"))
  for (const targetElem of State.getState("styleTargetElem")) {
    console.log(rgbaColor, targetElem)
    targetElem.style.color = rgbaColor;
  }
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
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.fontFamily = selectedFont;
  }
});

// Bold Italic Underline
const allFontBIU = document.querySelector(".font-biu");

let i = 0;
for (const fontBIU of allFontBIU.children) {
  if (i == 0 || i == allFontBIU.children.length - 1) {
    i++;
    continue;
  }
  i++;
  fontBIU.addEventListener("click", (e) => handleUpdateBIU(e));
}

// Add event listeners to all input elements
document.querySelectorAll("#border input, #border select").forEach((el) => {
  el.addEventListener("input", updateBorder);
});

const allBorder = document.getElementById("border-width-all");
allBorder.addEventListener("change", updateBorderAll);

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

// Add event listeners to slider inputs
horizontalInput.addEventListener("input", applyBoxShadow);
verticalInput.addEventListener("input", applyBoxShadow);
blurInput.addEventListener("input", applyBoxShadow);
spreadInput.addEventListener("input", applyBoxShadow);
colorInput.addEventListener("input", applyBoxShadow);
// Handling Box Shadow - END

// Handling Layout Start
const gapInput = document.getElementById("layout-gap");
const gapValue = document.getElementById("layout-gapValue");

document
  .getElementById("layout-direction")
  .addEventListener("change", function () {
    for (const targetElem of State.getState("styleTargetElem")) {
      targetElem.style.display = "flex";
      targetElem.style.flexWrap = "wrap";
      targetElem.style.flexDirection = this.value;
    }
  });

document
  .getElementById("layout-justify")
  .addEventListener("change", function () {
    for (const targetElem of State.getState("styleTargetElem")) {
      targetElem.style.justifyContent = this.value;
    }
  });

document.getElementById("layout-align").addEventListener("change", function () {
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.alignItems = this.value;
  }
});

gapInput.addEventListener("input", function () {
  for (const targetElem of State.getState("styleTargetElem")) {
    targetElem.style.gap = `${this.value}px`;
  }
  gapValue.textContent = this.value;
});
// Handling Layout End

function handleBackPos2(e) {
  document.getElementById("editor-nav").style.display = "block";
  e.currentTarget.parentElement.style.display = "none";
}

function handleBackPos3(e) {
  document.getElementById("nav-catg-pos-3-back").style.display = "none";
  if (document.getElementById("avlbl-temp").style.display == "flex") {
    document.getElementById("avlbl-temp").style.display = "none";
    document.getElementById("editor-nav").style.display = "block";
  } else {
    document.getElementById("style-nav").style.display = "block";
    const customStyleCon = document.getElementById("custom-style").children;
    for (const st of customStyleCon) {
      st.style.display = "none";
    }
  }
}

// First Edit Interface - having templates, form fields etc.
const navCatgPos1 = document.querySelectorAll(".nav-catg-pos-1");
for (const catg of navCatgPos1) {
  catg.addEventListener("click", handleNavCatgPos1);
}

// Second edit interface after either target Click or first Interface click
const navCatgPos2 = document.querySelectorAll(".nav-catg-pos-2");
for (const catg of navCatgPos2) {
  document
    .getElementById("nav-catg-pos-3-back")
    .addEventListener("click", handleBackPos3);
  catg.addEventListener("click", handleNavCatgPos2);
}

document
  .getElementById("nav-catg-pos-2-back")
  .addEventListener("click", handleBackPos2);
