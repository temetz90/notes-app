// read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON);   
    } else {
        return []
    }
}

// save notes to the localstorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove a note
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDom = function (note) {
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

// Render Application Notes
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    document.querySelector('div#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDom(note)
        document.querySelector('div#notes').appendChild(noteEl);
    })
}


// add a timestamp to each new note made
