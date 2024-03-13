const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"

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

    function isRead(mailId){
        mailService.get(mailId)
        .then((mail) => {
            mail.isRead = true
            console.log('mail:', mail)
            mailService.save(mail)

        })

        

    }

    // console.log('mails:', mails)
    if (!mails) return <div>loading...</div>
    return <section className="mail-index">
        <MailHeader/>
        
<MailSideNav/>
        
        <MailList
            mails={mails}
            isRead = {isRead}
        // onRemoveMail={onRemoveMail}
        // onUpdateCar={onUpdateCar}
        />
    </section>
}

