const customer = document.querySelector(".customer")
const taskh = ['name', 'address', 'age']

const readData = (storageKey) => {
    let data = []
    try {
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        if (!Array.isArray(data)) throw new Error("is not array")
    } catch (e) {
        data = []
    }
    return data
}
const writeData = (data, storageKey) => {
    localStorage.setItem(storageKey, JSON.stringify(data))
}
const submitForm = function (e) {
    e.preventDefault()
    let custs = {}
    heads.forEach(head => {
        custs[head] = this.elements[head].value
    })
    const customerdata = readData("customer")
    customerdata.push(custs)
    writeData(customerdata, "customer")
    this.reset()
    // window.location.href = "show.html"
    location.reload()
}

const tableBody = document.querySelector('.body');
const body2 = document.querySelector('.body2');
function showAll() {
    tableBody.innerHTML = ""
    const createEl = (parent, elemnt, txt, classes, toggle = null, target = null) => {
        const el = document.createElement(elemnt)
        parent.appendChild(el)
        if (txt) el.innerText = txt
        if (classes) el.className = classes
        if (toggle) el.dataset.bsToggle = toggle
        if (target) el.dataset.bsTarget = target
        return el
    }

    const cus = readData("customer")

    cus.forEach((custom, index) => {

        const num = Math.ceil(Math.random() * (Date.now()));
        const nnum = num.toString()
        const tr = createEl(tableBody, "tr", null, null)
        createEl(tr, 'td', index + 1, null)
        createEl(tr, 'td', nnum, null)

        taskh.forEach(head => createEl(tr, "td", custom[head], null))
        const action = createEl(tr, "td", null, null)
        const showBtn = createEl(action, 'button', 'show', 'btn btn-primary m-r-1em', 'modal', '#exampleModal')
        const editBtn = createEl(action, 'button', 'Edit', 'btn btn-warning m-r-1em')
        const deleteBtn = createEl(action, 'button', 'Delete', 'btn btn-danger m-r-1em')

        // Delete Data
        deleteBtn.addEventListener('click', () => {
            cus.splice(index, 1)
            writeData(cust, "customer")
            showAll()
        })

        // Show Data
        showBtn.addEventListener('click', (e) => {
            e.preventDefault();
            body2.innerHTML = ""
            // const show_arr = []
            // show_arr.push(cust[index])
            const tr_show = createEl(body2, "tr", null, null)
            createEl(tr_show, 'td', index + 1, null)
            createEl(tr_show, 'td', nnum, null)
            createEl(tr_show, "td", cus[index]['name'], null)
            createEl(tr_show, "td", cus[index]['adress'], null)
            createEl(tr_show, "td", cus[index]['age'], null)
            showAll()
            // location.reload();
            // console.log(cust[index]);
        })

        // editBtn.addEventListener('click', function (e){
        //     heads.forEach(head=>{
        //       console.log(this.elements.name.value);  
        //     })


        //     console.log();
        //     // e.preventDefault()
        //     // =  cust[index]['name']
        //     // let customers = {}
        //     // heads.forEach(head => {
        //     //    console.log(this.elements[head].value);
        //     // })
        //     // const customer_data = readData("customer")
        //     // customer_data.push(customers)
        //     // writeData(customer_data, "customer")
        //     // this.reset()
        //     // // window.location.href = "show.html"
        //     // location.reload()
        // })
    })

}

if (customer) customer.addEventListener("submit", submitForm);
if (tableBody) showAll()