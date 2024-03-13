

export function NoteList({notes,onRemoveNote,onEditNote}) {
    console.log('notes:', notes)


    return <ul className="car-list">
		{
			notes.map(note => <li key={note.id}>
				<h1>{note.info.title}</h1>
				<h1>{note.info.txt}</h1>
				<div className="not-actions">
					<button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
					<button onClick={() => onEditNote(note.id)}>Edit</button>
				</div>
			</li>)
		}
	</ul>
}
