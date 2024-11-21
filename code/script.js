const view = document.getElementById("view");
const prevYearButton = document.getElementById("prevYear");
const nextYearButton = document.getElementById("nextYear");
const currentYearButton = document.getElementById("currentYear");
const tableViewButton = document.getElementById("table-view-btn");
const yearViewButton = document.getElementById("year-view-btn");

const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const month = ["Jan.", "Fev." ,"Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."];

let vacations =[
    {
        name:"Joaquim",
        color:"#00aaff",
        schedule:[
            {start: "2024-01-01", end: "2024-01-10"},
            { start: "2024-07-01", end: "2024-07-10" },
            { start: "2024-12-20", end: "2024-12-31" },
        ]
    },
    {
        name:"Manuel",
        color:"#D34C26",
        schedule:[
            {start: "2024-01-01", end: "2024-01-10"},
            { start: "2025-12-20", end: "2025-12-31" },
        ]
    },  
    {
        name:"Tiago",
        color:"#758184",
        schedule:[
            {start: "2024-01-01", end: "2024-01-10"},
            {start: "2024-11-17", end: "2024-11-25"},
        ]
    }
]

// Fuction become a date ("yyyy-mm-dd") format and an object array with dates and check's if the datetoCheck is in rage in the vacation.
function isVacation (dateToCheck, vacation){
    const date = new Date(dateToCheck);
    let result = false;
    vacation.forEach((item) => {
        const start = new Date(item.start);
        const end = new Date(item.end);
        if (date >= start && date<= end){
            result = true;
        }
    });
    return result;
  }

function checkVacation(dateToCheck){
    const date = new Date(dateToCheck);
    let result = '<div class="vacation-day">';
    vacations.forEach((worker)=>{
        if(isVacation(date, worker.schedule)){
            result += `<div style="background-color: ${worker.color}">${worker.name}</div>`;
        }
    });
    return result + '</div>';
}
const todayDate = new Date();
let year = todayDate.getFullYear();

function makeTable(year){
    view.innerHTML = "";
    
    const firstDay = new Date(year, 0, 1);
    const lastDayOfTheYear = new Date(year, 11 + 1, 0);
    let table = `
    <h2>${firstDay.getFullYear()}</h2>
    <table id="year-view">
    `;
 
    table += `<tr>`;

    for (let day = -1, weekDayPointer = 0; day <= 36; day ++ ){
        if(day === -1 ){
            table += `<th></th>`;
        } else {
            table += `<th> ${weekDay[weekDayPointer]} </th>`;
            weekDayPointer = weekDayPointer >= 6 ? 0 : weekDayPointer + 1;
        }
        
    }
    for(let currentDate = firstDay; currentDate <= lastDayOfTheYear; ){
        const lastDay = new Date(year, currentDate.getMonth() + 1, 0);
        table += `<tr><td class="month" >${month[currentDate.getMonth()]}</td>`;
        for (let day = 0, weekDayPointer = 0; day <= 36; day ++ ){
            if (currentDate.getDay() == weekDayPointer && currentDate <= lastDay){
                // Add the day to the table and compare the currentDate with todayDate to change the class.
                table += `<td class="day"><div class="day-cell ${currentDate.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0) ? "today" : ""}"> ${currentDate.getDate()}</div>`;
                table += checkVacation(currentDate);
                currentDate.setDate(currentDate.getDate() + 1);
            } else {
                table += `<td></td>`;
            }
            weekDayPointer = weekDayPointer >= 6 ? 0 : weekDayPointer + 1;
        }
        table += `</tr>`;
    }
    table +=`</table>`;
    view.innerHTML = table;
   
}
function isToday(date){
    const todayDate = new Date();
    if(date.getDate === todayDate.getDate && date.getMonth === todayDate.getMonth && date.getFullYear === todayDate.getFullYear){
        return true;
    }
    return false;
}

function nextYear(){
    year += 1;
    makeTable(year);
}

function prevYear(){
    year -= 1;
    makeTable(year);
}

function currentYear(){
    year = new Date().getFullYear();
    makeTable(year);
}

function makeTableView(year){
    let table = "";
    vacations.forEach((worker)=>{
        table += `<table id="table-view"><caption class="worker-tittle" style="color:${worker.color}">${worker.name}</caption>`;
        table += "<tr><th>Start date</th><th>End date</th></tr>";
        worker.schedule.forEach((vacation)=>{
            table += `<tr><td>${vacation.start}</td><td>${vacation.end}</td></tr>`;
        });
        table += "</table>";
    });
    view.innerHTML = table;
}

makeTable(year);
nextYearButton.addEventListener("click", nextYear);
prevYearButton.addEventListener("click", prevYear);
currentYearButton.addEventListener("click", currentYear);
tableViewButton.addEventListener("click", makeTableView);
yearViewButton.addEventListener("click",() => makeTable(year))