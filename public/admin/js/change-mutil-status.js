
var checkAll = document.querySelector("[name=checkAll]");
var checkProducts = document.querySelectorAll("[name=checkProducts]");

checkAll.onclick = () => {
    if (checkAll.checked === true) {
        for (var i = 0; i < checkProducts.length; i++) {
            checkProducts[i].checked = true;
        }
    }
    else {
        for (var i = 0; i < checkProducts.length; i++) {
            checkProducts[i].checked = false;
        }
    }
}

var buttonInformChangeMutil = document.querySelector("#form-change-mutil-status button");
buttonInformChangeMutil.onclick = (e) => {
    e.preventDefault();
    var conf = confirm("Are you sure ?");
    if (conf === false) return;
    var s = "";
    var p = "";
    var lickCheckBoxChecked = [];
    for (var i = 0; i < checkProducts.length; i++) {
        if (checkProducts[i].checked === true) {
            lickCheckBoxChecked.push(checkProducts[i]);
        }
    }
    for (var i = 0; i < lickCheckBoxChecked.length; i++) {
        if (i < lickCheckBoxChecked.length - 1) {
            s += lickCheckBoxChecked[i].getAttribute("value") + ", ";
            var scan = lickCheckBoxChecked[i].getAttribute("position");
            p += document.querySelector("[position='" + scan + "']").value.trim() + ", ";
            // cho .trim() để xóa khoảng trắng 2 đầu phòng tường hợp người dùng nhập có cách
            if(isNaN(parseInt(document.querySelector("[position='" + scan + "']").value.trim()))===true){
                alert("nhập trường vị trí thông số hợp lệ");
                return;
            }
        }
        else { //ngăn thằng cuối sẽ có ", " ở sau
            s += lickCheckBoxChecked[i].getAttribute("value");
            var scan = lickCheckBoxChecked[i].getAttribute("position");
            p += document.querySelector("[position='" + scan + "']").value.trim();
            if(isNaN(parseInt(document.querySelector("[position='" + scan + "']").value.trim()))===true){
                alert("nhập trường vị trí thông số hợp lệ");
                return;
            }
        }
    }
    //checkProducts[i].getAttribute("value") để lấy id
    var inputChange_mutil = document.querySelector("[name=listID]");
    inputChange_mutil.value = s;
    var inputChangePosition = document.querySelector("[name=listPosition]");
    inputChangePosition.value = p;
    var form = document.querySelector("#form-change-mutil-status");

    if (lickCheckBoxChecked.length === 0) {
        alert("Hãy chọn ít nhất 1 sản phẩm");
    }
    else {
        form.submit();
    }
}

// update checkAll
function check_checkBoxproduct(cBProducts) {

    var cBProducts_checked = 0;
    for (var i = 0; i < cBProducts.length; i++) {
        if (cBProducts[i].checked === true)
            cBProducts_checked++;
    }
    if (cBProducts.length === cBProducts_checked) {
        checkAll.checked = true;
    }
    else {
        checkAll.checked = false;
    }
    // hàm này được gọi khi 1 checkBoxProduct Được tương tác
}

function clickCheckProducts(i) {
    checkProducts[i].onclick = () => {
        check_checkBoxproduct(checkProducts);
    }
}
for (var i = 0; i < checkProducts.length; i++) {
    clickCheckProducts(i);
}

