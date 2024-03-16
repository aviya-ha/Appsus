const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { MailPreview } from "../cmps/MailPreview.jsx"


export function MailList({ mails, isRead, }) {

    function addClassIsRead(mail) {
        if (mail.isRead) return ' read'
        else return ''
    }

    return <ul className="mails-list clean-list ">
        {
            mails.map(mail =>
                <li key={mail.id} className={addClassIsRead(mail)}>
                    <div className={"btn-container-mail " + addClassIsRead(mail)}>
                        <button className="btn btn-selected-mail"></button>
                        <button className="btn btn-starred-mail"></button>
                    </div>
                    <Link to={`/mail/${mail.id}`}
                        onClick={() => { isRead(mail.id) }} >
                        <MailPreview
                            mail={mail}
                        />
                    </Link>
                </li>)
        }
    </ul>
}
