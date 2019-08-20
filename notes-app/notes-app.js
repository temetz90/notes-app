let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters);

document.querySelector('#search-text').addEventListener('input', function (f) {
    filters.searchText = f.target.value;
    renderNotes(notes, filters);
})

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4();
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#filter-by').addEventListener('change',(e) => {
    filters.sortBy = e.target.value
    sortNotes(notes, filters.sortBy)
    renderNotes(notes, filters)
})

window.addEventListener('storage',(e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
        this.console.log(e)
    }

})


