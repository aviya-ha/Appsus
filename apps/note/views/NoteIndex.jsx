const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { AppNav } from "../../../cmps/AppNav.jsx"

import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { AccordionAddNote } from "../cmps/AccordionAddNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"


export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState(null)
    const [note, setNoteEdit] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))



    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
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

                showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.error('Had issues removing note', err)
                showErrorMsg(`Could not remove `)
            })
    }

    if (!notes) return <div>loading...</div>
    return <section className="note-index">
        <AppNav />
        <header className="note-header">
            <div className="note-logo">
                <img className="note-icon" src="https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w240-h480-rw" alt="gmail" />
                <h1>Keep</h1>
            </div>
            <NoteFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
        </header>
        <main className="main-note">


            <AccordionAddNote
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
                    setNoteEdit={setNoteEdit}
                />
            }
        </main>
    </section >
}
