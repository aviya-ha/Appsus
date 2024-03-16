
import { NotePreview } from "./NotePreview.jsx"

export function NoteList({notes,onRemoveNote,onEditNote}) {
	
    return <ul className="note-list-container clean-list">
		<NotePreview
		notes={notes}
		onRemoveNote={onRemoveNote}
		onEditNote={onEditNote}
		/>
	</ul>
}
