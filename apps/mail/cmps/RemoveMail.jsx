
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function RemoveMail({mailId, setMail}){

    function onRemoveMail() {
        mailService.remove(mailId)
            .then(() => {
                setMail((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                // showSuccessMsg(`Car removed successfully (${mailId})`)
            })
            .catch((err) => {
                console.log('Had issues removing car', err)
                // showErrorMsg(`Could not remove (${mailId})`)
            })
    }

    return  <React.Fragment>
        <Link to="/mail"><button onClick={onRemoveMail}>remove</button></Link>
        </React.Fragment>

}