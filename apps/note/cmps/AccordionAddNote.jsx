
const { useState } = React


import { OpenAddNoteHtml } from "./OpenAddNoteHtml.jsx";
import { AddNoteText } from "./AddNoteText.jsx";
import { AddNoteImg } from "./AddNoteImg.jsx";
import { AddNoteList } from "./AddNoteList.jsx";


export function AccordionAddNote({ setNotes}) {
	const [isOpen, setIsOpen] = useState('')

	return <section className="accordion">

			{!isOpen&&
				<section  className="title-container">
					<h1>Add new note:</h1>
				<aside className="add-note-action-container-test">
					<span onClick={() => setIsOpen('NoteText')} className="btn-icon fa-solid fa-font clean-btn"></span>
					<span onClick={() => setIsOpen('NoteImg')} className="btn-icon fa-regular fa-image clean-btn"></span>
					{/* <span className="btn-icon fa-brands fa-youtube clean-btn"></span> */}
					<span onClick={() => setIsOpen('NoteList')} className="btn-icon fa-solid fa-list-ul clean-btn"></span>
				</aside>
				

			 </section>
			}

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
	
}






