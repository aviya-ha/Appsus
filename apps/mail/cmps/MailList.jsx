const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { MailPreview } from "../cmps/MailPreview.jsx"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, isRead, setFilterBy }) {

    function addClassIsRead(mail) {
        if (mail.isRead) return ' read'
        else return ''
    }

    function addClassIsStared(mail) {
        if (mail.isStarred) return 'btn btn-starred-mail fa-solid fa-star'
        else return 'btn btn-starred-mail fa-regular fa-star'
    }

    function changeStarred(mail) {
        // console.log('mail:', mail)
        // console.log('mail.isStarred:', mail.isStarred)
        mail.isStarred = !mail.isStarred
        // console.log('mail.isStarred:', mail.isStarred)
        mailService.save(mail)
        
    }
    // setFilterBy(prevFilter => ({ ...prevFilter}))


    return <ul className="mails-list clean-list ">
        {
            mails.map(mail =>
                <li key={mail.id} className={addClassIsRead(mail)}>
                    <div className={"container-mail " + addClassIsRead(mail)}>
                        {mail.isStarred &&
                            <button onClick={() => { changeStarred(mail) }} className='btn btn-starred-mail fa-solid fa-star' style={{ color: '#FFD43B' }}></button>
                        }
                        {!mail.isStarred &&
                            <button onClick={() => { changeStarred(mail) }} className='btn btn-starred-mail fa-regular fa-star' style={{ color: '#FFD43B' }}></button>
                        }
                        {/* <button onClick={() => { changeStarred(mail) }} className={addClassIsStared(mail)} style={{ color: '#FFD43B' }}></button> */}
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
