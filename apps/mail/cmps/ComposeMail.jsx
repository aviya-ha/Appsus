const { useState, useEffect } = React

import { showSuccessMsg,showErrorMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export function ComposeMail({ setIsComposeMail, saveMail }) {
    const [newMailToSave, setNewMailToSave] = useState(mailService.getEmptyMail())


    function onSaveMail(ev) {
        ev.preventDefault()
        showModal()
        if (!newMailToSave.to) {
            ev.target[0].value = ''
            ev.target[1].value = ''
            ev.target[2].value = ''
            showErrorMsg('couldn\'t save mail without recipient address')
            return
        }
        saveMail(newMailToSave)
        setNewMailToSave('')
        ev.target[0].value = ''
        ev.target[1].value = ''
        ev.target[2].value = ''

    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMailToSave((prevNewMail) => ({ ...prevNewMail, [field]: value }))

    }

    function showModal() {
        setIsComposeMail(false)
    }

    return <section className="mail-compose-container">
        <header className="mail-compose-header">
            <h1>New Message</h1>
            <button className="fa-solid fa-xmark" onClick={showModal}></button>
        </header>
        <form className="mail-compose-main" onSubmit={onSaveMail}>
            <input className="mail-compose-to"
                type="text"
                id="to"
                name="to"
                value={newMailToSave.to}
                onChange={handleChange}
                placeholder="To"
                autoComplete="off"
            />

            <input className="mail-compose-subject"
                type="text"
                id="subject"
                name="subject"
                value={newMailToSave.subject}
                onChange={handleChange}
                placeholder="Subject"
                autoComplete="off"
            />

            <input className="mail-compose-body"
                type="text"
                id="body"
                name="body"
                value={newMailToSave.body}
                onChange={handleChange}
                autoComplete="off"
            />
            <button className="btn btn-Send">Send</button>
        </form>

        <footer className="mail-compose-footer">
        </footer>


    </section>
}