//Just testing !!! 
/*
let d = new Date();
d = new Date(d.getFullYear(), 0 , 1);
let year = d.getFullYear()
let month = d.getMonth();
let weekday = d.getDay();
console.log(d);
console.log(year);
console.log(month);
console.log(weekday);
*/
//Just Testing !!! end

const view = document.getElementById("view");
const prevYearButton = document.getElementById("prevYear");
const nextYearButton = document.getElementById("nextYear");
const currentYearButton = document.getElementById("currentYear");
const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const month = ["Jan", "Fev" ,"Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const todayDate = new Date();
let year = todayDate.getFullYear();

function makeTable(year){
    view.innerHTML = "";
    
    const firstDay = new Date(year, 0, 1);
    const lastDayOfTheYear = new Date(year, 11 + 1, 0);
    console.log(firstDay);


    let table = `
    <h2>${firstDay.getFullYear()}</h2>
    <table id="table-view">
    `;
 
    table += `<tr>`;

    for (let day = 0, weekDayPointer = 0; day <= 36; day ++ ){
        table += `<th> ${day === 0 ? "" :weekDay[weekDayPointer]} </th>`;
        weekDayPointer = weekDayPointer >= 6 ? 0 : weekDayPointer + 1;
    }
    for(let currentDate = firstDay; currentDate <= lastDayOfTheYear; ){
        const lastDay = new Date(year, currentDate.getMonth() + 1, 0);
        table += `<tr><td class="month" >${month[currentDate.getMonth()]}</td>`;
        for (let day = 0, weekDayPointer = 0; day < 36; day ++ ){
            if (currentDate.getDay() == weekDayPointer && currentDate <= lastDay){
                table += `<td class="${isToday(currentDate) ? "today" : "day" }"> ${currentDate.getDate()} </td>`;
                currentDate.setDate(currentDate.getDate() + 1);
            } else {
                table += `<td></td>`;
            }
            weekDayPointer = weekDayPointer >= 6 ? 0 : weekDayPointer + 1;
        }
        table += `</tr>`;
    }
    /*
    for(let day = 0; day < weekDayForTable.length ; day++)
    {
        table += `<th> ${weekDayForTable[day]} </th>`;
    }
   table += `</tr>`;
   //let currentDate = firstDay;
   const lastDayOfTheYear = new Date(year, 11 + 1, 0);
   const currentDate = firstDay;
   while( currentDate < lastDayOfTheYear){
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0);
    table += `<tr>`;
    for (let week = 0; week <= 5; week++){  
            for(let day = 0; day < weekDay.length ; day++){
                if (currentDate.getDay() == day && currentDate <= lastDay){
                    table += `<td id="day"> ${currentDate.getDate()} </td>`;
                    currentDate.setDate(currentDate.getDate() +1);
                } else {
                    table += `<td></td>`;
                }
            }
            
        }
        table += `</tr>`;
    }*/
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

makeTable(year);
nextYearButton.addEventListener("click", nextYear);
prevYearButton.addEventListener("click", prevYear);
currentYearButton.addEventListener("click", currentYear)