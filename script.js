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

function makeTable(year){
    const weekDay = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 0 + 1, 0);
    view.innerHTML = `
    <h2>${firstDay.getFullYear()}</h2>
    <table id="table-view">
    `;
    /*for(let currDate = new Date(year, 0, 1);currDate <= lastDay; currDate.setDate(currDate.getDate() + 1 ) ){

        view.innerHTML += `<td> ${currDate.getDate()} </td>`;
    }*/
   view.innerHTML += "<tr>";
   for (let week = 0; week <= 5; week++)
   {
        for(let day = 0; day < weekDay.length ; day++){
            
            view.innerHTML += `<td> ${weekDay[day]} </td>`;
        }
   }
   view.innerHTML += "</tr><tr>";
   
   view.innerHTML +="</tr></table> ";
}

makeTable(2024);