let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters);

document.querySelector('#search-text').addEventListener('input', function (f) {
    filters.searchText = f.target.value;
    renderNotes(notes, filters);
})

document.querySelector('#create-note').addEventListener('click', function (e) {
    const id = uuidv4();
    notes.push({
        id: id,
        title: '',
        body: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    console.log(e.target.value)
})

window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// const now = moment();

// now.subtract(1, 'week');
// console.log(now.fromNow())

// const nowTimeStamp = now.valueOf()

// console.log(moment(nowTimeStamp).toString());


const birthday = moment().month('August').date(7).year(1990)
// birthday.month('August').date(7).year(1990)

console.log(birthday.format('MMM D, YYYY'));