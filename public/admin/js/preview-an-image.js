try {
    var inputFile = document.querySelector("[name=thumbnail]");

    inputFile.onchange = (e) => {
        const urlFile = URL.createObjectURL(e.target.files[0]);
        var imagePreview = document.querySelector("#preview");
        imagePreview.setAttribute("src", urlFile);
    }
} catch (error) {
    console.log(error);
}
////////////////////////////////////////////////////////////////////////////////
try {
    var inputFile2 = document.querySelector("[name=avata]");

    inputFile2.onchange = (e) => {
        const urlFile = URL.createObjectURL(e.target.files[0]);
        var imagePreview = document.querySelector("#preview");
        imagePreview.setAttribute("src", urlFile);
    }
} catch (error) {
    console.log(error);
}


console.log("Đã kết nối preview-an-image");




