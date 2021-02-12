/* Your Code Here */
let createEmployeeRecord = function(ele) { 
// return objects with keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3], 
        timeInEvents: [],
        timeOutEvents: []
    } 
}

let createEmployeeRecords = function(data) { 
    return data.map(function(x) {
        return createEmployeeRecord(x)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    return this 
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return this
}

let hoursWorkedOnDate = function(theDate) {
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === theDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === theDate
    })
    let hoursWorked = (outEvent.hour - inEvent.hour) / 100
    return hoursWorked
}

let wagesEarnedOnDate = function(theDate) {
    let wages = hoursWorkedOnDate.call(this, theDate) 
        * this.payPerHour
    return parseFloat(wages.toString())
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}