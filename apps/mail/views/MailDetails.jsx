const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { RemoveMail } from "../cmps/RemoveMail.jsx"
import { AppNav } from "../../../cmps/AppNav.jsx"

export function MailDetails() {
    const [isComposeMail, setIsComposeMail] = useState(false)
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('Had issues loading mail', err)
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function saveMail(newMail) {
        mailService.save(newMail)
            .then(savedNewMail => {
                setNewMail(prevNewMail => ({ ...prevNewMail, ...savedNewMail }))
            }
            )
    }

    if (isLoading) return <div>Loading details..</div>
    return <section className="mail-details-container">

        <section className="main-container-mail-header">

            <div className="mail-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png" alt="gmail" />
                <h1 >Email</h1>
            </div>

        </section>

<AppNav/>

        {/* <MailSideNav
            setIsComposeMail={setIsComposeMail} /> */}

        <section className="mail-details">
            <header className="header-mail-details">
                <Link to="/mail"><button className="btn btn-go-back fa-solid fa-arrow-left"></button></Link>
                <RemoveMail
                    mailId={params.mailId}
                    setMail={setMail} />
                <h1 className="from">from: {mail.from}</h1>
                <span className="date">{mail.sentAt}</span>
            </header >
            <section className="mail-details-body" >
                <div className="mail-subject">{mail.subject}</div>
                <main className="main-mail-details">
                    <p>{mail.body}</p>
                </main>
            </section>

        </section>

        {/* {
            isComposeMail && <ComposeMail
                setIsComposeMail={setIsComposeMail}
                saveMail={saveMail}
                newMail={newMail}
                // saveMail={saveMail}
            />
        } */}
    </section>
}