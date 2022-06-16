// Your code here
function createEmployeeRecord(array) {
    let object= {
        firstName: array[0],
        familyName : array[1],
        title : array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
    return object
}
function createEmployeeRecords(employeeArrayData){
    return employeeArrayData.map(array=>createEmployeeRecord(array))
}

function createTimeInEvent(object, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,})
return object
}
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type:'TimeOut',
        hour: parseInt(hour,10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee, reqDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === reqDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === reqDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employee, date) {
    let wage= hoursWorkedOnDate(employee, date)*employee.payPerHour;

    return parseInt(wage.toString())
}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(total, days){
        return total + wagesEarnedOnDate(employee, days)
    }, 0)

    return payable
}
let calculatePayroll = function(employeeRecordsArray){
    return employeeRecordsArray.reduce(function(total, record){
        return total + allWagesFor(record)
    }, 0)
}