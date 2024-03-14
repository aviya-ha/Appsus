const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

import {showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js"


import { ColorInput } from "./dinamic/ColorInput.jsx";


export function NoteCreate({setNotes}) {
    const [noteStyle, setNoteStyle] = useState({style: {
        backgroundColor:'',
    }})
    const [noteCreateStyle, setNoteCreateStyle] = useState({
        backgroundColor: 'lightcyan'
    })

    
    function onSaveNote(ev) {
        ev.preventDefault()
        let noteToAdd = noteService.getEmptyNote()
        noteToAdd.style = {...noteStyle.style}

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
        ev.target[0].value = ''
        ev.target[1].value = ''

    }

    function onChangeNoteCreateStyle({style}){
        setNoteCreateStyle(prevNoteCreateStyle =>({...prevNoteCreateStyle,...style}))
    }

    function onChangeStyle(style){
        setNoteStyle(prevNoteStyle =>({...prevNoteStyle,...style}))
    }

    return <section style={noteCreateStyle} className="add-note-container">
        <form id="add-note-form" className="form-add-note" onSubmit={onSaveNote}>
            <input
                type="text"
                placeholder="Enter Title"
                name="title"
                // onChange={handleChange}
                defaultValue=''
                autoComplete="off"
                title="Enter Title"
            />
            <input
                type="text"
                placeholder="Enter txt"
                name="txt"
                // onChange={handleChange}
                defaultValue=''
                autoComplete="off"
                title="Enter Txt"
            />
        </form>
        <section className="add-note-action-container">
            <button form="add-note-form" className="btn btn-add-note" title="save note">save</button>
            <button className="btn btn-background-color-note" title="background color">color</button> 
            <ColorInput
            noteCreateStyle={noteCreateStyle}
            onChangeNoteCreateStyle={onChangeNoteCreateStyle}
            onChangeStyle={onChangeStyle}
            />
        </section>


    </section>

}