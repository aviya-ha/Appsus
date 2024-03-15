const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js";

import { ColorInput } from "./dinamic/ColorInput.jsx";

export function AddNoteText({setNotes,setIsOpen}) {
    const [noteToAdd,setNoteToAddStyle] =useState(noteService.getEmptyNote())
    
    const [noteStyle, setNoteCreateStyle] = useState({
        backgroundColor: 'lightcyan'
    })
    
    
    function onChangeNoteStyle({ style }) {
        setNoteCreateStyle(prevNoteCreateStyle => ({ ...prevNoteCreateStyle, ...style }))
    }
    
    
    function onSaveNote(ev) {
        ev.preventDefault()
        
        let title = ev.target[0].value
        let txt = ev.target[1].value
        noteToAdd.info.title = title
        noteToAdd.info.txt = txt
        
        noteService.save(noteToAdd)
        .then(savedNote => {
            setNotes(prevNotes => ([savedNote, ...prevNotes]))
            showSuccessMsg('Note created successfully')
        })
        .catch(err => {
            // console.log('Had issues saving note', err)
            showErrorMsg('could not create note')
        })
        // ev.target[0].value = ''
        // ev.target[1].value = ''
        setIsOpen(isOpen => !isOpen)
    }

    function onChangeStyle(style) {
       
        setNoteToAddStyle(prevNoteStyle => ({ ...prevNoteStyle, ...style }))
    }
    
    return <section style={noteStyle}>
        <form id="add-note-form" className="form-add-note-text" onSubmit={onSaveNote}>
            <input
                type="text"
                placeholder="Enter Title"
                name="title"
                
                defaultValue=''
                autoComplete="off"
                title="Enter Title"
            />
            <input
                type="text"
                placeholder="Enter txt"
                name="txt"

                defaultValue=''
                autoComplete="off"
                title="Enter Txt"
            />
        </form>
        <section className="add-note-text-action-container">
            <button form="add-note-form" className="btn btn-add-note" title="save note">save</button>
            <ColorInput
                noteStyle={noteStyle}
                onChangeNoteStyle={onChangeNoteStyle}
                onChangeStyle={onChangeStyle}
            />
        </section>
    </section>
}