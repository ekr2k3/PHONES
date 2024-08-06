var formDelate = document.querySelector("#form-trap");
// nhớ đạt tên dị để tránh trùng tên với file khác
var buttonDeletesF = document.querySelectorAll("[delete-F-button]");

for (let i = 0; i < buttonDeletesF.length; i++) {
    buttonDeletesF[i].onclick = () => {
        var conf = confirm("Bán có muỗn xóa vĩnh viễn");
        if (conf === true) {
            var id = buttonDeletesF[i].id;
            var prefix = formDelate.getAttribute("prefix");
            var newAction = prefix + "/products/fromTrap" + "/" + id + "/" + "delete" +"?_method=DELETE";
            formDelate.setAttribute("action", newAction);
            formDelate.submit();
        }
    }
}
var buttonRestore = document.querySelectorAll("[restore]");
for (let i = 0; i < buttonRestore.length; i++) {
    buttonRestore[i].onclick = () => {
        var conf = confirm("Bán có muỗn khôi phục");
        if (conf === true) {
            var id = buttonRestore[i].id;
            var prefix = formDelate.getAttribute("prefix");
            var newAction = prefix + "/products/fromTrap" + "/" + id + "/" + "restore" +"?_method=DELETE";
            formDelate.setAttribute("action", newAction);
            formDelate.submit();
        }
    }
}