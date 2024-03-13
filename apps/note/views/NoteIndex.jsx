const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        // Sanitize filterBy
        // setSearchParams(filterBy)
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

    return <section>
        <h1>note app</h1>
        <div>
       
        </div>
    </section>
}
