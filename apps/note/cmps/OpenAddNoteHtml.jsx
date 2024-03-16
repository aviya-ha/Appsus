
import { ColorInput } from "./dinamic/ColorInput.jsx"

export function OpenAddNoteHtml({onSaveNote,noteCreateStyle,onChangeNoteCreateStyle,onChangeStyle}) {
    return <section>
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