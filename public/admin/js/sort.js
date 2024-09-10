var urlNEXTARRAY = (ArNewKey, ArnewValue) => {

    if (typeof (ArNewKey) === "string") return undefined;

    var urlCurrent = new URL(window.location.href);
    var querystringCurrent = urlCurrent.searchParams;
    var arrayKeyValue = Array.from(querystringCurrent.entries());
    for (var i = arrayKeyValue.length - 1; i >= 0; i--) {
        if (arrayKeyValue[i][1] === "") {
            arrayKeyValue.splice(i, 1);
        }
    }
    for (var x = 0; x < ArNewKey.length; x++) {
        var ThongBao = 0;
        var index = 0;
        for (var i = 0; i < arrayKeyValue.length; i++) {
            if (ArNewKey[x] === arrayKeyValue[i][0]) {
                ThongBao = 1;
                index = i;
            }
        }

        if (ArnewValue[x] !== "" && ArNewKey[x] !== undefined && ThongBao !== 1) {
            arrayKeyValue.push([ArNewKey[x], ArnewValue[x]])
        }
        if (ThongBao === 1) {
            if (ArnewValue[x] !== "" && ArNewKey[x] !== undefined) {
                arrayKeyValue[index][1] = ArnewValue[x];
            }
            else {
                arrayKeyValue.splice(index, 1); // xóa từ vị trí index 1 phần tử
            }
        }
    }
    var urlNext = urlCurrent.origin + urlCurrent.pathname + "?";
    // tìm ? và xóa nó bằng cách tạo các chuỗi con không có ? và ghép lại
    var p = urlNext.indexOf("?");
    if (arrayKeyValue.length === 0) {
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

var select = document.querySelector("[name=sort]");
select.onchange = () => {
    select = document.querySelector("[name=sort]");
    var value = select.value;
    // var array = value.split("-"); nếu không dùng split thì làm như sau
    console.log(value);

    var typeSort = "";
    var valueSort = "";
    var point = 0;
    for (var i = 0; i < value.length; i++) {
        if (value[i] === "-") point = i;
    }
    for (var i = 0; i < point; i++) {
        typeSort += value[i];
    }
    for (var i = point + 1; i < value.length; i++) {
        valueSort += value[i];
    }
    console.log(valueSort + "   " + typeSort);

    var newURL = urlNEXTARRAY(["typeSort", "valueSort"], [typeSort, valueSort]);
    window.location.href = newURL;
}

var urlCurrent = new URL(window.location.href);
var typeSort = urlCurrent.searchParams.get("typeSort");
var valueSort = urlCurrent.searchParams.get("valueSort");
if(typeSort){
    valueOption = typeSort+"-"+valueSort;
    var optionChoose = document.querySelector(`[value=${valueOption}]`);
    optionChoose.setAttribute("selected","true");
}