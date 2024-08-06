module.exports = (req, condition) => {
    var keyword = req.query.keyword;

    if (keyword !== undefined && keyword !== "" && keyword !== null) {
        condition.title = new RegExp(keyword, "i");
    }

    return condition;
}