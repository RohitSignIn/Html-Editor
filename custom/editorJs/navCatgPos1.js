import State from "./context/sharedState.js";

// handling Editor Navigation
function handleNavCatgPos1(e) {
  const clickedElem = e.currentTarget.children[1].textContent;


  let setElement = null;

  if(clickedElem == "Form") {
    setElement = document.getElementById("temp-wrap")
  }
  if(clickedElem == "Fields"){
    setElement = document.querySelectorAll("div[in-section]")
  }
  if(clickedElem == "Section"){
    setElement = document.querySelectorAll("[type=section]")
  }
  if(clickedElem == "Section Fields"){
    setElement = document.querySelectorAll("[type=section] > div[in-section=true]")
  }
  if(clickedElem == "Input"){
    setElement = document.querySelectorAll("input, selectm, textarea")    
  }
  if(clickedElem == "Section Input"){
    setElement = document.querySelectorAll("[type=section] input, textarea, select")
  }

  if(setElement != null) {
    State.setState("styleTargetElem", setElement)
  }
  if (clickedElem == "Templates") {
    document.getElementById("avlbl-temp").style.display = "flex";
    document.getElementById("nav-catg-pos-3-back").style.display = "block";
    e.currentTarget.parentElement.parentElement.style.display = "none";
  } else {
    document.getElementById("nav-catg-pos-3-back").style.display = "none";
    document.getElementById("avlbl-temp").style.display = "none";
  }

  if (clickedElem != "Templates") {
    document.getElementById("style-nav").style.display = "block";
    e.currentTarget.parentElement.parentElement.style.display = "none";
  }
}

export default handleNavCatgPos1;
