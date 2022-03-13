const validator = require("validator")
const chalk = require("chalk")
const dealWithJson = require("./dealWithJson")
const findMyUserIndex = (customers, key, val) => {
    let i = customers.findIndex(customer => customer[key] == val)
    return i
}
const addcustomer = (customerData) => {
    try {
        if (!customerData.name || customerData.name.length < 3) throw new Error("invalid name")
        // if( !validator.isEmail(customerData.email) ) throw new Error("invalid Email")
        accNum = Date.now()
        const customers = dealWithJson.readData()
        customers.push(customerData)
        dealWithJson.writeData(customers)
        console.log(chalk.green("user Added"))
    }
    catch (e) {
        console.log(chalk.red(e.message))
    }
}
const addOperation = (id, typeop, value) => {
    const i = users.findIndex(u => u.id == userId)
    if (typeop == "withdraw") {
        if (customers[i]["remainingbalance"] < value) return console.log("not enough")
        customers[i]["remainingbalance"] = Number(customers[i]["intialbalance"]) - value
    }
    else if (typeop == "add") {
        customers[i]["remainingbalance"] = Number(customers[i]["intialbalance"]) + value
    }
    else { customers[i]["remainingbalance"] = Number(customers[i]["intialbalance"]) }

    dealWithJson.writeData(customers)
    console.log(dealWithJson.readData())
}

const showSingle = (customerId) => {
    const customers = dealWithJson.readData()
    const customer = findMyUserIndex(customers, "id", customerId)
    if (customer != -1) console.log(customers[customer])
    else console.log('not found')
}
module.exports = { addcustomer, addOperation, showSingle }