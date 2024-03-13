const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)


    function logMails() {
        mailService.query()
            .then(mails => console.log('mails:', mails))
    }

    useEffect(() => {
        loadMails()
    }, [])


    function loadMails() {
        mailService.query()
            .then((mails) => {
                setMails(mails)
                console.log('mails:', mails)
            })
    }
console.log('mails:', mails)
    if (!mails) return <div>loading...</div>
    return <section className= "mail-index">
        <div>mail app</div>
        <MailList
            mails={mails}
            // onRemoveCar={onRemoveCar}
            // onUpdateCar={onUpdateCar}
        />
    </section>
}

