
import { noteService } from "../services/note.service.js"
import { showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js";

export function AddNoteImg({setNotes,setIsOpen}) {

    function onSaveNote(ev) {
        ev.preventDefault()
        
        let noteToAdd = noteService.getEmptyNote()
        let title = ev.target[0].value
        let url = ev.target[1].value
        noteToAdd.info.title = title
        noteToAdd.type = 'NoteImg'
        noteToAdd.info.url = url
        
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

    function onClose(){
        setIsOpen('')
    }
 
    return <section>
        <form id="add-note-form" className="form-add-note-img" onSubmit={onSaveNote}>
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
                placeholder="Enter Url"
                name="url"
                defaultValue=''
                autoComplete="off"
                title="Enter Url"
            />
        </form>
        <section className="add-note-img-action-container">
        <button className="add-note-close" onClick={onClose}>X</button>
            <button form="add-note-form" className="btn btn-add-note" title="save note">save</button>
        </section>
    </section>
}