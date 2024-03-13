const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [note, setNoteEdit] = useState(null)



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

    function onSaveNote(ev) {
        ev.preventDefault()
        let noteToAdd = noteService.getEmptyNote()

        let title = ev.target[0].value
        let txt = ev.target[1].value
        noteToAdd.info.title = title
        noteToAdd.info.txt = txt
        noteService.save(noteToAdd)
            .then(savedNote => {
                setNotes(prevNotes => ([savedNote, ...prevNotes]))
                // showSuccessMsg('Note saved successfully')
            })
            .catch(err => {
                console.log('Had issues saving note', err)
                // showErrorMsg('could not save note')
            })
        ev.target[0].value = ''
        ev.target[1].value = ''

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

    console.log('note:', note)
    if (!notes) return <div>loading...</div>
    return <section className="note-index">
        {/* <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, minSpeed }} /> */}

        <NoteCreate
            onSaveNote={onSaveNote}
        />

        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onEditNote={onEditNote}
        // onUpdateNote={onUpdateCar}                      
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
