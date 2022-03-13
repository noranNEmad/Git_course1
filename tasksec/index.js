const customer = require("./controllers/customer")
const yargs = require("yargs")
const accNum = Date.now()
let customerData = {
    name: "Mazen",
    intialbalance: "0",
    remainingbalance: "0",
    accNum: accNum,
    addOperation: [{ opType: "with", val: 100, at: "date" }]
}
customer.addcustomer(customerData)
//customer.addOperation()
yargs.command({
    command: "add customer",
    describe: "used for adding customers",
    builder: {
        name: {
            type: String,
            required: true
        },
        intialbalance: {
            type: Number,
            default: 0
        },
        remainingbalance: {
            type: Number,
            default: 0
        },
        accNum: {
            type: Number,
            required: true
        }
    },
    handler: function (argv) {
        let customerData = {
            name: argv.name,
            intialbalance: argv.intialbalance,
            remainingbalance: argv.remainingbalance,
            accNum: Date.now()
        }
        customer.addUser(customerData)
    }
})
yargs.command({
    command: "addOperation",
    describe: "used for adding operation",
    builder: {
        opType: {
            type: String,
            required: true
        },
        Value: {
            type: Number,
            default: 0
        }

    },
    handler: function (argv) {
        customer.addOperation()
    }
})
yargs.command({
    command: "showUser",
    describe: "used for show single users",
    builder: {},
    handler: function (argv) {
        let customerData2 = {
            name: argv.name,
            typeOfop: argv.typeOfop,
            Value: argv.Value,
            time: Date.now()
        }
        customer.showSingle(customerData2)
    }
})
yargs.argv