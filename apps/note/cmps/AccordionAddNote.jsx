
const { useState } = React


import { OpenAddNoteHtml } from "./OpenAddNoteHtml.jsx";
import { AddNoteText } from "./AddNoteText.jsx";


export function AccordionAddNote({ setNotes, noteCreateStyle, onChangeStyle }) {
	const [isOpen, setIsOpen] = useState(false)

	function onTextClick() { }
	function onImgClick() { }
	function onListClick() { }
	function onVidClick() { }


	return (
		<section className="accordion">

			<section className="add-note-container-test">
			</section>
			<section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container">
				<aside className="add-note-action-container-test">
					<button className="btn-icon fa-solid fa-font clean-btn"></button>
					<button className="btn-icon fa-regular fa-image clean-btn"></button>
					<button className="btn-icon fa-brands fa-youtube clean-btn"></button>
					<button className="btn-icon fa-solid fa-list-ul clean-btn"></button>
				</aside>

			</section>

			{isOpen && <AddNoteText
			setNotes={setNotes}
			setIsOpen={setIsOpen}
				
			/>}

		</section>
	)
}






