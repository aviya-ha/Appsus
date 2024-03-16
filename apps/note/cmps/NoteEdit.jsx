
import { noteService } from "../services/note.service.js"
import {showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js"

export function NoteEdit({ note, loadNotes,setNoteEdit }) {
    
    function onEditNote(ev) {
        ev.preventDefault()
        
        let title = ev.target[0].value
        let txt = ev.target[1].value
        note.isEdit = false
        note.info.title = title
        note.info.txt = txt
        noteService.save(note)
            .then(savedNote => {
                loadNotes()
                showSuccessMsg('Note edit successfully')
            })
            .catch(err => {
                console.error('Had issues saving note', err)
                showErrorMsg('could not save note')
            })
    }

    function onCloseModal(){
        setNoteEdit(null)
    }

    const { info } = note
    return <section className="note-edit-container">
        <h1>Edit</h1>

        <form onSubmit={onEditNote}>
            <input
                type="text"
                placeholder="Enter Title"
                name="title"
                // onChange={handleChange}
                defaultValue={info.title}
                autoComplete="off"
            />
            <input
                type="text"
                placeholder="Enter txt"
                name="txt"
                // onChange={handleChange}
                defaultValue={info.txt}
                autoComplete="off"
            />
            <button>save</button>
        </form>
        <button onClick={()=>onCloseModal()}>x</button>
    </section>
}