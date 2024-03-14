const { useState, useEffect } = React
// const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [note, setNoteEdit] = useState(null)
    // const [searchParams, setSearchParams] = useSearchParams()



    useEffect(() => {
        loadNotes()
    }, [])

    // function onSetFilter(fieldsToUpdate) {
    //     console.log('fieldsToUpdate', fieldsToUpdate)

    //     setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    // }

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onEditNote(noteId) {
        noteService.getById(noteId)
            .then(noteToEdit => {
                if (!noteToEdit.isEdit) {
                    noteToEdit.isEdit = true
                    setNoteEdit(prevNote => ({ ...prevNote, ...noteToEdit }))
                }
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

        <NoteCreate
        setNotes={setNotes}
            
        />

        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onEditNote={onEditNote}                     
        />
        {
            (note && note.isEdit) && <NoteEdit
                note={note}
                onEditNote={onEditNote}
                loadNotes={loadNotes}
            />
        }

    </section >
}
