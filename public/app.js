document.addEventListener('click', (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const divNote = event.target.closest("li").children[0];
        const updatedNote = prompt("Введите новое значение")

        if (updatedNote) {
            rename(id, updatedNote).then(divNote.innerHTML = updatedNote)
        }
    }
})

async function rename(id, title) {
    try {
    await fetch(`/`, {
        method: 'PUT', headers: {
            "Content-Type": "application/json;charset=utf-8",
        }, body: JSON.stringify({id, title})
    })
    } catch (error) {
        console.log(error)
    }
}

async function remove(id) {
    try {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
    } catch (error) {
        console.log(error)
    }
}