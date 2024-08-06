var form = document.querySelector("#form-search");

var urlNEXT = (newKey, newValue) => {
    var urlCurrent = new URL(window.location.href);
    var querystringCurrent = urlCurrent.searchParams;
    var arrayKeyValue = Array.from(querystringCurrent.entries());
    //entries sẽ tự giải các mã hóa và biến chúng thành khoảng trắng

    for(var i = arrayKeyValue.length-1; i>=0 ;i--){
        if(arrayKeyValue[i][1]===""){
            arrayKeyValue.splice(i, 1);
        }
    }
    

    var ThongBao = 0;
    var index = 0;
    for (var i = 0; i < arrayKeyValue.length; i++) {
        if (newKey === arrayKeyValue[i][0]) {
            ThongBao = 1;
            index = i;
        }
    }

    if (newValue !== "" && newKey !== undefined && ThongBao !== 1) {
        arrayKeyValue.push([newKey, newValue])
    }
    if (ThongBao === 1) {
        if (newValue !== "" && newKey !== undefined) {
            arrayKeyValue[index][1] = newValue;
        }
        else{
            arrayKeyValue.splice(index, 1); // xóa từ vị trí index 1 phần tử
        }
    }
    var urlNext = urlCurrent.origin + urlCurrent.pathname + "?";

    var p = urlNext.indexOf("?");
    if(arrayKeyValue.length === 0 ){
        urlNext = urlNext.substring(0, p);
    }

    for (var i = 0; i < arrayKeyValue.length; i++) {
        urlNext += encodeURIComponent(arrayKeyValue[i][0]) + "=" + encodeURIComponent(arrayKeyValue[i][1]);
        //encodeURIComponent sẽ tự mã hóa nếu gặp khoảng trắng
        if (i < arrayKeyValue.length - 1) {
            urlNext += "&";
        }
    }
    return urlNext;
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    var keywordInput = document.querySelector("[name=keyword]").value;
    var url = urlNEXT(document.querySelector("[name=keyword").getAttribute("name"), keywordInput);

    window.location.href = url;
});