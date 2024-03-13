

export function NoteList({notes,onRemoveNote,onEditNote}) {
    console.log('notes:', notes)


    return <ul className="note-list-container clean-list">
		{
			notes.map(note => <li className="card-note-container" key={note.id}>
				<p>{note.info.title}</p>
				<p>{note.info.txt}</p>
				<div className="actions-note-container">
					<button className="btn-remove-note" onClick={() => onRemoveNote(note.id)}>X</button>
					<button className="btn-edit-note" onClick={() => onEditNote(note.id)}>Edit</button>
				</div>
			</li>)
		}
	</ul>
}
