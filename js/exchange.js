let url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
let options = {
    method: "GET"
}

let table = document.getElementById("exchange");
let span = document.querySelector(".date");



window.onload = function () {

    let date = new Date().toISOString().substring(0, 10);
    arrDate = date.split("-");
    arrDate.reverse();

    span.innerHTML = arrDate.join(".");

    fetch(url, options).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            createTable(data);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function createTable(data) {

    for (let i = 0; i < data.length; i++) {
        let row = document.createElement("tr");
        createCell(row);

        row.children[0].innerHTML = data[i]["Cur_Name"];
        row.children[1].innerHTML = data[i]["Cur_Scale"] + " " + data[i]["Cur_Abbreviation"];
        row.children[2].innerHTML = data[i]["Cur_OfficialRate"];
        table.append(row);

        if (i == data.length - 1) {
            console.log('row:', row)
            console.log('i:', i)
            row.children[0].style.borderRadius = "0 0 0 9px";
            row.children[2].style.borderRadius = "0 0 9px 0";
        }
    }
}

function createCell(row) {
    for (let i = 0; i < 3; i++) {
        let cell = document.createElement("td");
        row.append(cell);
    }
}
