var button = document.querySelector("button");
button.onclick = () => {
    var A = document.querySelectorAll("input:checked"); // input[checked=true] không hoạt động đâu
    var th = document.querySelectorAll("th[id]");
    // Tạo mảng chứa các id
    var c = [];
    for (let i = 0; i < th.length; i++) {
        c.push(th[i].getAttribute("id")); // Thêm id vào mảng
    }
    var Data = [];
    for (let i = 0; i < c.length; i++) {
        Data.push({
            id: c[i],
            permission: []
        });
    };
    for (let i = 0; i < A.length; i++) {
        //Tại mỗi a[i] duyệt mảng
        for (let j = 0; j < Data.length; j++) {
            if (A[i].getAttribute("x") === Data[j].id) {
                Data[j].permission.push(A[i].getAttribute("name"));
            }
        }
    }
    // Data đã hợp lý chỉ cần gửi
    var data = JSON.stringify(Data);
    var form = document.querySelector("#permission_form");
    var input = document.querySelector("#permission_input");
    input.value = data;
    form.submit();
}

// Khôi phục data khi reload
var div = document.querySelector("#permission_content");
var content = div.innerHTML;
var roles = JSON.parse(content);
console.log(roles);


var checkbox = document.querySelectorAll("input[type=checkbox]");

for (var i = 0; i < checkbox.length; i++) {
    for (var j = 0; j < roles.length; j++) {
        if (checkbox[i].getAttribute("x") === roles[j]._id.toString()) {
            for (var k = 0; k < roles[j].permissions.length; k++) {
                if (checkbox[i].getAttribute("name") == roles[j].permissions[k]) {
                    checkbox[i].setAttribute("checked", "true");
                }
            }
        }
    }
}