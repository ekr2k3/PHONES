var flash = document.querySelector("#flash");

setTimeout(() => {
    flash.classList.add("disable")
}, 3000);

var button = document.createElement("button");
button.textContent = "x";
button.onclick = ()=>{
    flash.classList.add("disable");
}
button.setAttribute("style", "background:red; margin:5px; padding:4px; border-radius:50%;  width:40px; height:40px");
flash.appendChild(button);



