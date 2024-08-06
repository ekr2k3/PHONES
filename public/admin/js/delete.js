var formDelate = document.querySelector("#form-delete");
// nhớ đạt tên dị để tránh trùng tên với file khác
var buttonDeletes = document.querySelectorAll("[delete-button]");

for (let i = 0; i < buttonDeletes.length; i++) {
    buttonDeletes[i].onclick = () => {
        var conf = confirm("Bán có muỗn xóa");
        if (conf === true) {
            var id = buttonDeletes[i].id;
            var prefix = formDelate.getAttribute("prefix");
            var newAction = prefix + "/products/delete-oneF" + "/" + id + "?_method=DELETE";
            formDelate.setAttribute("action", newAction);
            formDelate.submit();
        }
    }
}