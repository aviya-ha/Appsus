const { useState} = React

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
        noteToAdd.type = 'NoteTxt'
        
        noteService.save(noteToAdd)
        .then(savedNote => {
            setNotes(prevNotes => ([savedNote, ...prevNotes]))
            showSuccessMsg('Note created successfully')
        })
        .catch(err => {
            showErrorMsg('could not create note')
        })
        setIsOpen('')
    }
    
    function onChangeStyle(style) {
        
        setNoteToAddStyle(prevNoteStyle => ({ ...prevNoteStyle, ...style }))
    }
    
    function onClose(){
        setIsOpen('')
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
        <button className="add-note-close" onClick={onClose}>X</button>
            <button form="add-note-form" className="btn btn-add-note" title="save note">save</button>
            <ColorInput
                noteStyle={noteStyle}
                onChangeNoteStyle={onChangeNoteStyle}
                onChangeStyle={onChangeStyle}
            />
        </section>
    </section>
}