const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"

import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()


    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))


    function logMails() {
        mailService.query()
            .then(mails => console.log('mails:', mails))
    }

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
        // console.log('filterBy:', filterBy)
    }, [filterBy])


    function onSetFilter(fieldsToUpdate) {
        // console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }
    function loadMails() {
        mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
                // console.log('mails:', mails)
            })
    }

    

    function isRead(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                mail.isRead = true
                mailService.save(mail)
            })



    }

    // console.log('mails:', mails)
    if (!mails) return <div>loading...</div>
    return <section className="mail-index">
        <MailHeader 
        onSetFilter={onSetFilter}
        filterBy={filterBy}/>

        <MailSideNav />

        <MailList
            mails={mails}
            isRead={isRead}
            // setIsShowDetails={setIsShowDetails}
        // onRemoveMail={onRemoveMail}
        // onUpdateCar={onUpdateCar}
        />

    </section>
}

