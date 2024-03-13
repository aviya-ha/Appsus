
import { noteService } from "../services/note.service.js"

export function NoteEdit({ note, loadNotes }) {
    

    function onEditNote(ev) {
        ev.preventDefault()
        
        let title = ev.target[0].value
        let txt = ev.target[1].value
        note.isEdit = false
        note.info.title = title
        note.info.txt = txt
        noteService.save(note)
            .then(savedNote => {
                console.log('Note saved!!');
                loadNotes()
                // showSuccessMsg('Note saved successfully')
            })
            .catch(err => {
                console.log('Had issues saving note', err)
                // showErrorMsg('could not save note')
            })
        
        
    }

    const { info } = note
    return <section className="note-edit-container">
        <h1>hayyyy</h1>

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
    </section>
}