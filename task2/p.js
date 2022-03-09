const createMyOwnElement = (parent, elementType, classes, txt, attributes = []) => {
    const el = document.createElement(elementType)
    parent.appendChild(el)
    if (txt) el.innerText = txt
    if (classes) el.className = classes
    attributes.forEach(attr => {
        el.setAttribute(attr.attrName, attr.attrVal)
    })
    return el
}
const wrapper = document.querySelector('#wrapper')
const divWrapper = createMyOwnElement(wrapper, 'div', "row", null)
photos.forEach((photo, index) => {
    const div = createMyOwnElement(divWrapper, "div", "col-md-4 col-12 p-3", null)
    const div1 = createMyOwnElement(div, "div", "border border-primary border-3", null)
    createMyOwnElement(div1, "h3", null, photo.title)
    let attributes = [
        { attrName: "src", attrVal: photo.url },
        { attrName: "id", attrVal: photo.id },
    ]
    createMyOwnElement(div1, "img", "img-fluid", null, attributes)
})

