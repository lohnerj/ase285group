let today = new Date()
let tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
//console.log(tomorrow.getUTCMonth() + 1)
let task = "01/07/2023"
//Regex code used to extract the month, day, and year from a string
let rxMonth = /^[0-9]{1,2}/
let taskMonth = task.match(rxMonth)
const taskDay = task.match(/\/[0-9]{1,2}\//);
console.log(taskDay[0])