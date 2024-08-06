var inputFile = document.querySelector("[name=thumbnail]");

inputFile.onchange = (e) =>{
    const urlFile = URL.createObjectURL(e.target.files[0]);
    var imagePreview = document.querySelector("#preview");
    imagePreview.setAttribute("src", urlFile);
}