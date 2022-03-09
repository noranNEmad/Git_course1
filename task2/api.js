function apiGetter(apiLink, callback) {
    fetch(apiLink)
        .then((x) => {
            x.json()
                .then((y) => {
                    callback(y, false)
                })
                .catch(err => {
                    callback(false, err.message)
                })
        }
        )
        .catch(e => callback(false, e.message))
}
apiGetter("https://jsonplaceholder.typicode.com/todos/", (res, err) => {
    res.forEach(element => {
        console.log(element.id)
    });
}) 
