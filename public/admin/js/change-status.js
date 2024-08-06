var listTagA = document.querySelectorAll("a[status]");
var form = document.querySelector("#form-change");

function eventChange(i){
    listTagA[i].onclick = ()=>{
        var idProduct = listTagA[i].getAttribute("id");
        var statusProduct = listTagA[i].getAttribute("status");
        if(statusProduct === "active"){
            statusProduct = "inactive";
        }
        else{
            statusProduct = "active";
        }

        var prefix = form.getAttribute("prefix");

        var newaction = prefix+"/products/change-status"+"/"+statusProduct+"/"+idProduct+"?_method=PATCH";
        form.setAttribute("action",newaction);
        form.submit();
    }
}
for(var i = 0; i<listTagA.length; i++){
    eventChange(i);
}