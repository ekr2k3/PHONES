var listButton = document.querySelectorAll("[Sta]");

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
    // ta duyệt ngược bởi vì nếu duyệt xuôi giả sử pt h/tại là 2 bị xóa thì phần tử ở v trí thứ 3 
    //sẽ thế vào 2 và ta sẽ bỏ qua nó do ở lần lập kế vì i lúc này = 3
    //nếu ta duyệt ngược ví dụ ta duyệt 7 nó bị xóa thì thằng thứ 8(thằng đã ktra thế vào i = 7) và lần kế ta nhây
    // tới 6 1 thằng chưa kiểm tra
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
    // tìm ? và xóa nó bằng cách tạo các chuỗi con không có ? và ghép lại
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

var Event = (x) => {
    listButton[x].onclick = () => {
        var nextUrl = urlNEXT("status", listButton[x].getAttribute("Sta"));
        window.location.href = nextUrl;

    }
}

for (var i = 0; i < listButton.length; i++) {
    Event(i);
}
