console.log("helloo")

window.addEventListener("mouseup", () => {
  const x = window.getSelection();
  if (x) console.log(x.toString());
});

export {}