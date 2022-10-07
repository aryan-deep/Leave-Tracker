let week = [];
let weekNum;
// let temp;
let placeholder1 = document.querySelector("#date-switch");
let placeholder = document.querySelector("#data-output");


function currentWeek() {
    weekNum = moment().isoWeek();
    console.log("currentweek")
    for (let i = 1; i < 5; i++) {
        let lastDateModay = moment().startOf('isoWeek');
        let lastDayMonday = moment().startOf('isoWeek').format('L')
        week[0] = lastDayMonday;
        week[i] = lastDateModay.add(0 + i, 'days').format('L');

    }
}

currentWeek();

let prevWeek = () => {
    weekNum = weekNum - 1;

    console.log("pichla week")
    for (let i = 1; i < 5; i++) {
        let lastDateModay = moment().isoWeek(weekNum).startOf('isoWeek');
        let lastDayMonday = moment().isoWeek(weekNum).startOf('isoWeek').format('L');
        week[0] = lastDayMonday;
        week[i] = lastDateModay.add(0 + i, 'days').format('L');

    }
}
document.getElementById('prev').onclick = function () {
    prevWeek();
    renderTable1();
    renderTable();
}

function nextWeek() {
    console.log("agla week")
    weekNum = weekNum + 1;

    for (let i = 1; i < 5; i++) {
        let lastDateModay = moment().isoWeek(weekNum).startOf('isoWeek');
        let lastDayMonday = moment().isoWeek(weekNum).startOf('isoWeek').format('L');
        week[0] = lastDayMonday;
        week[i] = lastDateModay.add(0 + i, 'days').format('L');
    }
    console.log("next for loop")
}


document.getElementById('next').onclick = function () {
    nextWeek();
    renderTable1();
    renderTable();
}

let renderTable1 = () => {
    let out = "";
    out += "<tr>";
    out += "<td> </td>";
    for (let i = 0; i < 5; i++) {
        out += "<td>" + week[i] + "</td>";
    }
    out += "<td> </td>";
    out += "</tr>";
    placeholder1.innerHTML = out;


}
renderTable1();

console.log(week)



function tempToDateString(str) {
    const [day, month, year] = str.split('/');
    let lll = year + "-" + day + "-" + month;
    return lll;

}

let renderTable = () => {
    let out = "";
    fetch("db.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.forEach((person) => {
                out += "<tr>";
                const lineData = person.leaves;
                out += "<td>" + person.name + "</td>";
                for (let index = 0; index < 5; index++) {
                    let temp = week[index];
                    let print = tempToDateString(temp);
                    console.log()

                    let flag = 0;
                    let j
                    for (let i = 0; i < lineData.length; i++) {
                        if (Object.keys(lineData[i])[0] === print) {
                            flag = 1
                            j = i
                        }
                    }
                    if (flag == 1) {


                        if (lineData[j][print] === "annual") out += "<td style=background-color:#F43006></td>"
                        else if (lineData[j][print] === "sick") out += "<td style=background-color:yellow></td>"
                        else if (lineData[j][print] === "casual") out += "<td style=background-color:#3498DB></td>"

                    }
                    else {
                        out += "<td> </td>";
                    }
                }
                out += `<td><a href="">edit</a></td>`;
                out += "</tr>";
            });
            placeholder.innerHTML = out;

        });
}
renderTable();

function changeColor() {
    document.querySelector('.box').style.color = "blue";
}


