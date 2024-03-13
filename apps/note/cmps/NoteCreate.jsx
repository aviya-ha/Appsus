
export function NoteCreate({onSaveNote}) {

    return <section>
        <form onSubmit={onSaveNote}>
           <input
            type="text"
            placeholder="Enter Title"
            name="title"
            // onChange={handleChange}
            defaultValue=''
            autoComplete="off"
        />
        <input
            type="text"
            placeholder="Enter txt"
            name="txt"
            // onChange={handleChange}
            defaultValue=''
            autoComplete="off"
        /> 
        <button>save</button>
        </form>
        
    </section>

}