const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { AppNav } from "../../../cmps/AppNav.jsx"

import { MailList } from "../cmps/MailList.jsx"
import { ComposeMail } from "../cmps/ComposeMail.jsx"

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [isComposeMail, setIsComposeMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    
    const [isStarredMail, setIsStarredMail] = useState(null)


    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy, newMail ,isStarredMail])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                console.log('mails:', mails)
                setMails(mails)
            })
    }

    function isRead(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRead = true
                mailService.save(mail)
            })
    }

    function saveMail(newMail) {
        mailService.save(newMail)
            .then(savedNewMail => {
                setNewMail(prevNewMail => ({ ...prevNewMail, ...savedNewMail }))
            }
            )
    }

    if (!mails) return <div>loading...</div>
    return <section className="mail-index">
        <AppNav />
        <span className="btn btn-open-side-nav fa-solid fa-bars"></span>
        <MailHeader
            onSetFilter={onSetFilter}
            filterBy={filterBy} />

        <MailSideNav
            setIsComposeMail={setIsComposeMail}
            onSetFilter={onSetFilter}
            filterBy={filterBy}
        />

        <MailList
        setFilterBy={setFilterBy}
            mails={mails}
            isRead={isRead}
            // setMails={setMails}
        />
        {
            isComposeMail && <ComposeMail
                setIsComposeMail={setIsComposeMail}
                saveMail={saveMail}
                newMail={newMail}
            />
        }
    </section>
}