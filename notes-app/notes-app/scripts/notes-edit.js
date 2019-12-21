const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const editElement = document.querySelector('#editEl')

const noteID = location.hash.substring(1)
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteID)

if (!note) {
    location.assign('/index.html')
}

editElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`

titleElement.value = note.title
bodyElement.value = note.body

//edit title of note
titleElement.addEventListener('input',(e) => {
    note.updatedAt = moment().valueOf()
    editElement.textContent = generateLastEdited(note.updatedAt);
    note.title = e.target.value
    saveNotes(notes)
})

//Edit body of note
bodyElement.addEventListener('input',(e) => {
    note.updatedAt = moment().valueOf()
    editElement.textContent = generateLastEdited(note.updatedAt);
    note.body = e.target.value
    saveNotes(notes)
})

//remove a note
removeElement.addEventListener('click',(e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',(e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteID)
        
        if (!note) {
            location.assign('/index.html')
        }

        editElement.textContent = generateLastEdited(note.updatedAt);
        
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})