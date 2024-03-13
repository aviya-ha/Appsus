const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/NoteList.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {

        loadNotes()
    }, [])

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                
                setNotes(notes)

            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                console.log(`Note removed successfully (${noteId})`);
                // showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                // showErrorMsg(`Could not remove (${carId})`)
            })
    }


    if (!notes) return <div>loading...</div>
    return <section className="note-index">
        {/* <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, minSpeed }} /> */}

        {/* <NoteCreate/> */}

        {/* <Link to="/car/edit"><button>Add a note</button></Link> */}
        {/* <DataTable cars={cars} onRemoveCar={onRemoveCar} /> */}
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            // onUpdateNote={onUpdateCar}
        />
    </section >
}
