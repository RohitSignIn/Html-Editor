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

export default handlePxChangeBefore;
