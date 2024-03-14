const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import {showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js"

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

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
        <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />

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
