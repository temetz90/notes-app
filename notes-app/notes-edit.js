const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')


const noteID = location.hash.substring(1)
let notes = getSavedNotes();
let note = notes.find(function (note) {
    return note.id === noteID
})

if (note === undefined) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body


//edit title of note
titleElement.addEventListener('input', function (e) {
    note.title = e.target.value
    saveNotes(notes)
})

//Edit body of note
bodyElement.addEventListener('input', function (e) {
    note.body = e.target.value
    saveNotes(notes)
})

//remove a note
removeElement.addEventListener('click', function (e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(function (note) {
            return note.id === noteID
        })
        
        if (note === undefined) {
            location.assign('/index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})