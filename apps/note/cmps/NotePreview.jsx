const { useState } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import { ColorInput } from "./dinamic/ColorInput.jsx"


export function NotePreview({ notes, onRemoveNote, onEditNote }) {

	const [note, setNote] = useState(null)

	function loadNote(noteId) {
		noteService.getById(noteId)
			.then((note) => {
				console.log('note:', note)
				setNote(prevNotes => ({ ...prevNotes, ...note }))
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

	function onCheckBox(note, idx) {

		(!note.info.todos[idx].isDone) ? note.info.todos[idx].isDone = true : note.info.todos[idx].isDone = false
		noteService.save(note)
			.then((savedNote) => setNote(prevNotes => ({ ...prevNotes, ...savedNote })))

	}

	return <React.Fragment>
		{
			notes.map(note => <li style={note.style} className="card-note-container" key={note.id}>
				<section className="text-note-container">
					<span>{note.info.title}</span>
					{
						(note.info.url) && <img src={note.info.url} />
					}
					{
						(note.info.todos && note.info.todos.length) && <ul className="todo-list">
							{
								note.info.todos.map((toDo, idx) => <li key={idx}>
									{
										toDo.isDone && <React.Fragment>
											<input type="checkbox" id={`item${idx}`} onClick={() => onCheckBox(note, idx)} defaultChecked />
											<label htmlFor={`item${idx}`}>{toDo.txt}</label>
										</React.Fragment>
									}
									{
										!toDo.isDone && <React.Fragment>
											<input type="checkbox" id={`item${idx}`} onClick={() => onCheckBox(note, idx)} />
											<label htmlFor={`item${idx}`}>{toDo.txt}</label>
										</React.Fragment>
									}


								</li>)
							}
						</ul>
					}
					<span>{note.info.txt}</span>
				</section>

				<div className="actions-note-container">
					<button className="btn-remove-note" onClick={() => onRemoveNote(note.id)}>X</button>
					<button className="btn-edit-note" onClick={() => onEditNote(note.id)}>Edit</button>
				</div>
				{
					<ColorInput
						onChangeStyle={({ style }) => onChangeStyle(style, note)} />
				}
			</li>)
		}
	</React.Fragment>
}