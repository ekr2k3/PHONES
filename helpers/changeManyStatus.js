module.exports = (req) => {
    // string lấy ra có ", " ngăn cách
    var stringInputFromForm = req.body.listID;
    var stringInputPosition = req.body.listPosition;
    var Option = req.body.option;
    var listID = [];
    var temp = "";
    for (var i = 0; i < stringInputFromForm.length; i++) {
        if (stringInputFromForm[i] !== " ") {
            var x = i;
            while (stringInputFromForm[x] !== "," && stringInputFromForm.length > x) {
                temp += stringInputFromForm[x];
                x++;
            }// kết thúc cái này là lúc gặp ,
            i = x;
            listID.push(temp);
            temp = "";
        }
    }
    var listPosition = stringInputPosition.split(", ");
    return{
        listID:listID,
        Option:Option,
        listPosition:listPosition,
        stringInputPosition:stringInputPosition,
        stringInputFromForm:stringInputFromForm
    }
}