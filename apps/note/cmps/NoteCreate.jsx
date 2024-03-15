const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"


import { ColorInput } from "./dinamic/ColorInput.jsx";
import { AccordionAddNote } from "./AccordionAddNote.jsx";


export function NoteCreate({ setNotes }) {
    const [noteStyle, setNoteStyle] = useState({
        style: {
            backgroundColor: '',
        }
    })
    const [noteCreateStyle, setNoteCreateStyle] = useState({
        backgroundColor: 'lightcyan'
    })

    function onChangeNoteCreateStyle({ style }) {
        setNoteCreateStyle(prevNoteCreateStyle => ({ ...prevNoteCreateStyle, ...style }))
    }

    function onChangeStyle(style) {
        setNoteStyle(prevNoteStyle => ({ ...prevNoteStyle, ...style }))
    }

    



    return (
        <section>
            <AccordionAddNote
            setNotes={setNotes}
                    onChangeNoteCreateStyle={onChangeNoteCreateStyle}
                    onChangeStyle={onChangeStyle}
            />

        </section>)

}

