module.exports = (req, data) => {
    var typeSort = req.query.typeSort;
    var valueSort = req.query.valueSort;

    if (typeSort === "" || typeSort === undefined || typeSort === null)
        typeSort = "default";
    switch (typeSort) {
        case "default":
            for (var i = 0; i < data.length - 1; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].position > data[j].position) {
                        var temp = {};
                        temp = data[j];
                        data[j] = data[i];
                        data[i] = temp;
                    }
                    else if (data[i].position === data[j].position && data[i].index > data[j].index) {
                        var temp = {};
                        temp = data[j];
                        data[j] = data[i];
                        data[i] = temp;
                    }
                }
            }
            break;
        case "position":
            if (valueSort === "a") {
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].position > data[j].position) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (data[i].position === data[j].position && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            else if (valueSort === "d") {
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].position < data[j].position) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (data[i].position === data[j].position && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            break;
        case "price":
            if (valueSort === "a") {
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].price > data[j].price) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (data[i].price === data[j].price && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            else if (valueSort === "d") {
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].price < data[j].price) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (data[i].price === data[j].price && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            break;
        case "alphabet":
            function CompareAlphabet(str1, str2) {
                const len = Math.min(str1.length, str2.length);
                for (let i = 0; i < len; i++) {
                    if (str1[i] < str2[i]) return -1;
                    if (str1[i] > str2[i]) return 1;
                }
                // If all characters are the same, compare the lengths
                if (str1.length < str2.length) return -1;
                if (str1.length > str2.length) return 1;
                return 0; // The strings are identical
            }

            if (valueSort === "d") { // z-a
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (CompareAlphabet(data[i].title, data[j].title) > 0) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (CompareAlphabet(data[i].title, data[j].title) === 0 && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            if (valueSort === "a") { // z-a
                for (var i = 0; i < data.length - 1; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (CompareAlphabet(data[i].title, data[j].title) < 0) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                        else if (CompareAlphabet(data[i].title, data[j].title) === 0 && data[i].index > data[j].index) {
                            var temp = {};
                            temp = data[j];
                            data[j] = data[i];
                            data[i] = temp;
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
    return data;
}