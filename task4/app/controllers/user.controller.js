const deal = require("../helpers/dealWithJson")
const showAll = (req, res) => {
    const customers = deal.readData()
    res.render("showAll", {
        pageTitle: "All customers",
        customers,
        isEmpty: customers.length == 0 ? true : false  // [] // []
    })
}
const show = (req, res) => {
    let customerId = req.params.id
    const allcustomers = deal.readData()
    let customer = allcustomers.find(c => c.id == customerId)
    res.render("show", {
        pageTitle: "customer Data",
        customer,
        isEmpty: customer ? false : true // x? true : false
    })
}
const addCustomer = (req, res) => {
    let customer = {
        id: Date.now(),
        name: req.query.name,
        intialbalance: req.query.intialbalance,
        remaningbalance: req.query.remaningbalance
    }
    if (req.query.name && req.query.intialbalance && req.query.remaningbalance) {
        let data = deal.readData()
        data.push(customer)
        deal.writeData(data)
        res.redirect("/")
    }
    res.render("add", {
        pageTitle: "Add New customer",
        customer
    })
}

const addop = (req, res) => {

    const opvalue = req.query.opvalue
    const optype = req.query.optype
    let customerId = req.params.id
    const allcustomers = deal.readData()
    var message = ""
    // const index = allcustomers.find(c => c.id == customerId)
    if (req.query.addop) {
        const index = allcustomers.findIndex(c => c.id == customerId)
        if (req.query.optype == "withdraw") {
            if (Number(allcustomers[index].remaningbalance) < req.query.opvalue) { message = "not enough" }
            else allcustomers[index].remaningbalance = Number(allcustomers[index].remaningbalance) - Number(req.query.opvalue)
        }
        else if (req.query.optype == "add") {
            if (Number(req.query.opvalue > 6000)) { message = "too much" }
            else allcustomers[index].remaningbalance = Number(allcustomers[index].remaningbalance) + Number(req.query.opvalue)
        }
        deal.writeData(allcustomers)
        //res.redirect("/")
        res.render("addop", {
            pageTitle: "addop",
            message
            //customer
        })

    }
}
const addopLogic = (req, res) => {
    let customerId = req.params.id
    const allcustomers = deal.readData()
    const customerindex = allcustomers.findIndex(c => c.id == customerId)
    allcustomers[customerindex] = { ...req.body, id: customerId }

    deal.writeData(allcustomers)
    res.redirect("/")
}

const deleteCustomer = (req, res) => {
    let CustomerId = req.params.id
    const Customers = deal.readData()
    let data = Customers.filter(c => c.id != CustomerId)
    deal.writeData(data)
    res.redirect("/")
}
module.exports = { showAll, show, addCustomer, addop, addopLogic, deleteCustomer }