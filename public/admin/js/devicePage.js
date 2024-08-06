var pageControl = document.querySelectorAll(".page-link");

var urlNEXT = (newKey, newValue) => {
    var urlCurrent = new URL(window.location.href);
    var querystringCurrent = urlCurrent.searchParams;
    var arrayKeyValue = Array.from(querystringCurrent.entries());
    for (var i = arrayKeyValue.length - 1; i >= 0; i--) {
        if (arrayKeyValue[i][1] === "") {
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
        else {
            arrayKeyValue.splice(index, 1);
        }
    }
    var urlNext = urlCurrent.origin + urlCurrent.pathname + "?";
    var p = urlNext.indexOf("?");
    if (arrayKeyValue.length === 0) {
        urlNext = urlNext.substring(0, p);
    }
    for (var i = 0; i < arrayKeyValue.length; i++) {
        urlNext += encodeURIComponent(arrayKeyValue[i][0]) + "=" + encodeURIComponent(arrayKeyValue[i][1]);

        if (i < arrayKeyValue.length - 1) {
            urlNext += "&";
        }
    }
    return urlNext;
}
var Event = (x) => {
    pageControl[x].onclick = () => {
        var nextUrl = urlNEXT("pages", pageControl[x].getAttribute("pageNumber"));
        window.location.href = nextUrl;
    }
}

for (var i = 0 + 1; i < pageControl.length - 1; i++) { //+ 1 để bỏ qua nút đầu ; -1 để bỏ qua phần tử cuối
    Event(i);
}





pageControl[0].onclick = () => {
    var urlCurrent = new URL(window.location.href);
    var querystringCurrent = urlCurrent.searchParams;
    var arrayKeyValue = Array.from(querystringCurrent.entries());
    for (var i = 0; i < arrayKeyValue.length; i++) {
        if (arrayKeyValue[i][0] === "pages") {
            if (parseInt(arrayKeyValue[i][1]) - 1 > 0) {
                var prev = (parseInt(arrayKeyValue[i][1]) - 1).toString();
                var url = urlNEXT("pages", prev);
                window.location.href = url;
            }
        }
    }
}

pageControl[pageControl.length - 1].onclick = () => {
    var havekey = 0;

    var urlCurrent = new URL(window.location.href);
    var querystringCurrent = urlCurrent.searchParams;
    var arrayKeyValue = Array.from(querystringCurrent.entries());
    for (var i = 0; i < arrayKeyValue.length; i++) {
        if (arrayKeyValue[i][0] === "pages") {
            if (parseInt(arrayKeyValue[i][1]) + 1 <= pageControl.length - 2) { // số trang = số button - 2 2 cái nút prev là next
                // có nhiều các khác ví dụ lấy thuột tính pageNumbẻ của button cuối
                var next = (parseInt(arrayKeyValue[i][1]) + 1).toString();
                var url = urlNEXT("pages", next);
                window.location.href = url;
            }
            havekey++;
        }
    }
    if (havekey === 0) {
        var url = urlNEXT("pages", "2");
        window.location.href = url;
    }
}
