const { useState} = React

import { noteService } from "../services/note.service.js"
import {showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js"

import { ColorInput } from "./dinamic/ColorInput.jsx"


// const { Link, useSearchParams } = ReactRouterDOM



export function NotePreview({ notes, onRemoveNote, onEditNote }) {

	const [note, setNote] = useState(null)

	// const [searchParams, setSearchParams] = useSearchParams()
	// const { carId } = useParams()
	// const isShowColorRef = useRef()

	function loadNote(noteId) {

		noteService.getById(noteId)
			.then((note) => {
				setNote(prevNotes =>({...prevNotes,...note}))
			})
	}

	function onChangeStyle(style, note) {
		note.style = ({ ...style })
		noteService.save(note)
			.then(savedNote => {
				console.log('Note saved!!');
				loadNote(savedNote.id)
				showSuccessMsg('Note saved successfully')
			})
			.catch(err => {
				console.log('Had issues saving note', err)
				showErrorMsg('could not save note')
			})
		
	}

	

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
				{
					<ColorInput
						onChangeStyle={({style}) => onChangeStyle(style, note)} />
				}

			</li>)
		}
	</React.Fragment>
}