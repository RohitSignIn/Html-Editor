function tempC() {
  const tempColorPlt = {
    bodyBg: "#FAF7F0",
    formBg: "#ffffff",
    textColor: "#6C4E31",
    
    sectionBg: "#FAF7F0",
    sectionText: "#212529",
    
    inputBg: "#ffffff",
    inputText: "#212529",
    
    sectionBorderRad: "5px",
    inputBorderRad: "5px",
    formBorderRad: "5px",

    fontFamily: "sans-serif",
    fontSize: "1rem",

    sectionFontFamily: "sans-serif",
    sectionTitleFontSize: "1.3rem", 
    sectionTitleFontWeight: "600",
    sectionFontSize: "1rem",
  };

  const tempWrap = document.getElementById("temp-wrap");
  const allDirectChilds = tempWrap.querySelectorAll(":scope > div");

  document.querySelector("body").style.backgroundColor = tempColorPlt.bodyBg;

  // Setting Font Start
  tempWrap.style.padding = "1rem";
  tempWrap.style.fontFamily = tempColorPlt.fontFamily;;
  tempWrap.style.fontSize = tempColorPlt.fontSize;
  tempWrap.style.backgroundColor = tempColorPlt.formBg;
  tempWrap.style.color = tempColorPlt.textColor;
  tempWrap.style.borderRadius = tempColorPlt.formBorderRad;
  // Setting Font Start

  // Removing Hr default style - START
  const allHr = tempWrap.querySelectorAll("hr");
  for (const hr of allHr) {
    hr.removeAttribute("style");
  }
  // Removing Hr default style - End

  // Looping through all direct childs and applying styles - START
  for (const child of allDirectChilds) {
    const type = child.getAttribute("type");
    // styling direct children layout - Start
    if (type != "section") {
      child.style.display = "flex";
      child.style.justifyContent = "space-between";
      child.style.alignItems = "center";
      child.style.gap = "1rem";
      child.style.marginTop = "1rem";
      child.style.flexWrap = "wrap";
      child.style.minWidth = "150px !important";
    }
    // styling direct children layout - End

    // Styling section and its inner Childs
    if (type == "section") {
      // Styling Section Starts
      child.style.marginTop = "0.6rem";
      child.style.color = tempColorPlt.sectionText;
      child.style.backgroundColor = tempColorPlt.sectionBg;
      child.style.borderRadius = tempColorPlt.sectionBorderRad;
      child.style.fontFamily = tempColorPlt.sectionFontFamily;
      child.style.flexWrap = "wrap";
      child.style.minWidth = "150px";
      // Styling Section Ends

      const allSectionChild = [...child.children];
      const sectionHeader = allSectionChild[0];
      allSectionChild.shift();

      // Styleing Section Header Starts
      sectionHeader.style.padding = "0.6rem 0.6rem 0.4rem 0.6rem";
      sectionHeader.style.marginBottom = "0.4rem";

      sectionHeader.style.borderBottom = "4px solid #fff";
      sectionHeader.style.fontSize = tempColorPlt.sectionTitleFontSize;
      sectionHeader.style.fontWeight = tempColorPlt.sectionTitleFontWeight;


      sectionHeader.querySelector("hr").style.display = "none";

      // Styleing Section Header Ends

      // Looping through all Section Children and applying styles - START
      for (const secChild of allSectionChild) {
        // styling section children layout - Start
        secChild.style.display = "flex";
        secChild.style.justifyContent = "space-around";
        secChild.style.alignItems = "center";
        secChild.style.gap = "1rem";
        secChild.style.flexWrap = "wrap";
        secChild.style.minWidth = "150px";
        // styling section children layout - End

        secChild.style.padding = "0.2rem 1.2rem 0.4rem 1.2rem";
        secChild.style.fontSize = tempColorPlt.sectionFontSize;
      }
      // styling last child of section - START
      allSectionChild[allSectionChild.length - 1].style.paddingBottom = "1rem";
      // styling last child of section - END

      // Looping through all Section Children and applying styles - End
    }
  }

  //   Styling Input Tag
  for (const input of tempWrap.querySelectorAll("input")) {
    input.style.outline = "none";
    input.style.border = "1px solid #ced4da";
    input.style.backgroundColor = tempColorPlt.inputBg;
    input.style.borderRadius = tempColorPlt.inputBorderRad;
    input.style.flex = "1";
    input.style.fontSize = "1rem";
    input.style.fontWeight = "400";
    input.style.padding = "0.25rem 0.4rem";
    input.style.color = tempColorPlt.inputText;
  }
}
