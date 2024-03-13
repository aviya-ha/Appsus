const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"

export function MailDetails() {
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
    var date
    if (isLoading) return <div>Loading details..</div>
    return <section className="mail-details-container">
 <MailHeader />

<MailSideNav />
<section className="mail-details">
      <header className="header-mail-details-">
            <Link to="/mail"><button>Go back</button></Link>
            <h1>from: {mail.from}</h1> 
            <span>{mail.sentAt}</span>
        </header >
        <div>{mail.subject}</div>
        <main className="main-mail-details">
            <p>{mail.body}</p>
        </main>
</section>
      

    </section>
}

// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }
