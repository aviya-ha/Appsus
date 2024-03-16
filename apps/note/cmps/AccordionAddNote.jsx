
const { useState } = React


import { OpenAddNoteHtml } from "./OpenAddNoteHtml.jsx";
import { AddNoteText } from "./AddNoteText.jsx";
import { AddNoteImg } from "./AddNoteImg.jsx";
import { AddNoteList } from "./AddNoteList.jsx";


export function AccordionAddNote({ setNotes}) {
	const [isOpen, setIsOpen] = useState('')

	return (
		<section className="accordion">

			{!isOpen&&
				<section  className="title-container">
				<aside className="add-note-action-container-test">
					<button onClick={() => setIsOpen('NoteText')} className="btn-icon fa-solid fa-font clean-btn"></button>
					<button onClick={() => setIsOpen('NoteImg')} className="btn-icon fa-regular fa-image clean-btn"></button>
					{/* <button className="btn-icon fa-brands fa-youtube clean-btn"></button> */}
					<button onClick={() => setIsOpen('NoteList')} className="btn-icon fa-solid fa-list-ul clean-btn"></button>
				</aside>

			</section>}

			{isOpen === 'NoteText' && <AddNoteText
			setNotes={setNotes}
			setIsOpen={setIsOpen}
			/>}
			{
				isOpen === 'NoteImg' && <AddNoteImg
				setNotes={setNotes}
				setIsOpen={setIsOpen}
				/>
			}
			{
				isOpen === 'NoteList' && <AddNoteList
				setNotes={setNotes}
				setIsOpen={setIsOpen}
				/>
			}

		</section>
	)
}






