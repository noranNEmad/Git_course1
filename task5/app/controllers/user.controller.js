const db = require("../../models/dbConnection")
const ObjectId = require("mongodb").ObjectId
const showAll = (req, res) => {
    db((err, connection) => {
        connection.collection("customer").find()
            .toArray((e, customers) => {
                if (e) res.send(e)
                res.render("showAll", {
                    pageTitle: "All customers",
                    customers,
                    isEmpty: customers.length == 0 ? true : false
                })
            })
    })
}
const show = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer").findOne({ _id: new ObjectId(customerId) },
            (e, result) => {
                res.render("show", {
                    pageTitle: "customer Data",
                    customer: result,
                    isEmpty: result ? false : true // x? true : false
                })
            }
        )
    })
}
const addcustomer = (req, res) => {
    res.render("add", {
        pageTitle: "Add New customer"
    })
}
const addLogic = (req, res) => {
    db((err, connection) => {
        connection.collection("customer").insertOne(req.body,
            (e, result) => {
                if (e) res.send(e)
                res.redirect("/")
            }
        )
    })
}
const addop = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer").findOne({ _id: new ObjectId(customerId) },
            (e, result) => {
                res.render("edit", {
                    pageTitle: "Edit Data",
                    customer: result,
                    isEmpty: result ? false : true // x? true : false
                })
            }
        )
    })

}
const addopLogic = (req, res) => {
    let customerId = req.params.id
    let opvalue = req.params.opvalue
    let optype = req.params.optype
    let message = ""
    db.myConnection((err, Connection) => {
        Connection.collection("customer").findOne({
            _id: new ObjectId(customerId)
        }, (e, result) => {
            const customer = result
            if (optype == "withdrow") {

                if (opvalue >= 6000) message += 'You cannot '
                else if (Number(customer.remaningbalance) < opvalue) message += ' not enough Money'
                else {

                    let newBalance = Number(customer.remaningbalance) - Number(opvalue)
                    Connection.collection("customer").updateOne({ _id: new ObjectId(customerId) },
                        {
                            $set: {
                                "remaningbalance": newBalance
                            }
                        })
                    let data = {
                        id: customerId,
                        ...req.body,
                    }
                }
            } else if (optype == "add") {

                let newBalance = Number(customer.remaningbalance) + Number(opvalue)
                Connection.collection("customer").updateOne({ _id: new ObjectId(customerId) },
                    {
                        $set: {
                            "remaningbalance": newBalance
                        }
                    })
                let data = {
                    id: customerId,
                    ...req.body,

                }
            }
            res.render("addop", {
                message,
                customer,
                isEmpty: customer ? false : true
            })
        })
    })

}
const deletecustomer = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer")
            .deleteOne({ _id: new ObjectId(customerId) })
            .then(() => res.redirect("/"))
            .catch(e => res.send(e))
    })
}
module.exports = { showAll, addcustomer, addop, show, deletecustomer, addLogic, addopLogic }