module.exports = (req, condition) => {

    var defaultButtons = [
        {
            Action: "",
            Option: "All",
            status: ""
        },
        {
            Action: "",
            Option: "Active",
            status: "active"
        },
        {
            Action: "",
            Option: "Inactive",
            status: "inactive"
        }
    ];


    var Status = req.query.status;
    if (Status !== undefined && Status !== "" && Status !== null) { // tức có status và có value của status
        condition.status = Status;
    }
    //ở đây ta quy ước defaultButtons[0] là ALL; defaultButtons[1] là Active; defaultButtons[2] là Inactive<quy ước sao tùy người nếu quy ước khác thì phải chỉnh lại defaultButtons>
    if (Status === "active") {
        defaultButtons[0].Action = "";
        defaultButtons[1].Action = "active";
        defaultButtons[2].Action = "";
    } else if (Status === "" || Status === undefined) {
        defaultButtons[0].Action = "active";
        defaultButtons[1].Action = "";
        defaultButtons[2].Action = "";
    } else if (Status == "inactive") {
        defaultButtons[0].Action = "";
        defaultButtons[1].Action = "";
        defaultButtons[2].Action = "active";
    }

    return {
        default_buttons : defaultButtons,
        CONDITION : condition
    }
}