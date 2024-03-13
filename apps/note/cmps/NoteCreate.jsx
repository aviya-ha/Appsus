
export function NoteCreate({onSaveNote}) {

    return <section className="add-note-container">
        <form className="form-add-note" onSubmit={onSaveNote}>
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
        <button className="btn-add-note" title="save note">save</button>
        </form>
        
    </section>

}