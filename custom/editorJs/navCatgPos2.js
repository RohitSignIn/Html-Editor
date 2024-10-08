function handleNavCatgPos2(e) {
  const clickedElem = e.currentTarget.children[1].textContent;
  let currSel = "";
  if (clickedElem == "Layout") {
    document.getElementById("layout").style.display = "flex";
    currSel = "layout";
  }
  if (clickedElem == "Padding") {
    document.getElementById("padding").style.display = "grid";
    currSel = "padding";
  }
  if (clickedElem == "Margin") {
    document.getElementById("margin").style.display = "grid";
    currSel = "margin";
  }
  if (clickedElem == "Background") {
    document.getElementById("background").style.display = "block";
    currSel = "background";
  }
  if (clickedElem == "Font") {
    document.getElementById("font").style.display = "flex";
    currSel = "font";
  }
  if (clickedElem == "Border") {
    document.getElementById("border").style.display = "block";
    currSel = "border";
  }
  if (clickedElem == "Box Shadow") {
    document.getElementById("box-shadow").style.display = "block";
    currSel = "box-shadow";
  }

  const customStyleCon = document.getElementById("custom-style").children;

  for (const st of customStyleCon) {
    if (st.id == currSel) continue;
    st.style.display = "none";
  }

  document.getElementById("nav-catg-pos-3-back").style.display = "block";
  document.getElementById("style-nav").style.display = "none";
}


export default handleNavCatgPos2;