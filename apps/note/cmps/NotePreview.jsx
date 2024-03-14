


export function NotePreview({notes,onRemoveNote,onEditNote}){
console.log('notes:', notes)

    return <React.Fragment>
        {
			notes.map(note => <li style={note.style} className="card-note-container" key={note.id}>
				<p>{note.info.title}</p>
				<p>{note.info.txt}</p>
				<div className="actions-note-container">
					<button className="btn-remove-note" onClick={() => onRemoveNote(note.id)}>X</button>
					<button className="btn-edit-note" onClick={() => onEditNote(note.id)}>Edit</button>
					<button className="btn-edit-note" onClick={() => onEditNoteColor(note)}>color</button>
				</div>
			</li>)
		}
    </React.Fragment>
}