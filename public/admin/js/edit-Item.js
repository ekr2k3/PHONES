var ButtonEdit = document.querySelectorAll("[edit-button]");

for (let i = 0; i < ButtonEdit.length; i++) {
    ButtonEdit[i].onclick = () => {
        var id = ButtonEdit[i].getAttribute("id");

        var formEdit = document.querySelector("#form-edit");
        var prefix = formEdit.getAttribute("prefix");

        var newAction = prefix + "/products/edit/" + id;

        formEdit.setAttribute("action", newAction);
        formEdit.submit();
    }
}

var buttonEdit2 = document.querySelector(".unique button");

buttonEdit2.onclick = (event)=>{
    event.preventDefault();
    var form = document.querySelector(".unique");

    var prefix = form.getAttribute("prefix")
    var id = form.getAttribute("id");
    var newAction = prefix + "/products/edit/" + id +"?_method=PATCH";
    form.setAttribute("action", newAction);
    form.submit();
}