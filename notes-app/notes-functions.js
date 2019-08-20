// read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

   return notesJSON ? JSON.parse(notesJSON) : []
}

// save notes to the localstorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove a note
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const removeButton = document.createElement('button')

    // setup remove note button
    removeButton.textContent = "x"
    noteEl.appendChild(removeButton);
    removeButton.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // setup the note title text
    if (note.title.length > 0) {
    textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }

    //set the attribute of the anchor tag to its own unique web page
    textEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(textEl);
    
    //add a timestamp to the notes created
    

    return noteEl
}

// sort your notes by the drop down menu
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort(function (a,b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }

        })
    } else if (sortBy === 'byCreated') {
        return notes.sort(function (a,b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort(function (a,b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render Application Notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('div#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDom(note)
        document.querySelector('div#notes').appendChild(noteEl);
    })
}


// generate last edited
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`