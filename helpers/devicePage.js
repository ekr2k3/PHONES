module.exports = (req, data)=>{
    var page = {
        defaultPage: 1,
        limitItem: 6
    };
    var numberOfPage = Math.ceil(data.length / page.limitItem);

    var pages = req.query.pages;
    var dataInpage = [];
    var skip = 0;
    if (pages !== undefined && pages !== "" && pages !== null) {
        var skip = (parseInt(pages) - 1) * page.limitItem;
    }
    else{ // thêm 1 điều kiện nếu pages > numberOfPage thì skip = 0 (và xóa query trên url dùng hàm viết tay bên client // mà cũng không cần ta res.redirect tới /admin/product là được)
        skip = 0;
    }
    for (var i = skip; (i < skip + page.limitItem) && (i < data.length); i++) {
        dataInpage.push(data[i]);
    }
    data = dataInpage;

    return {
        pages:pages,
        data: data,
        numberOfPage: numberOfPage
    }
}