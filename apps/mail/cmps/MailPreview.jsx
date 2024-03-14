
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {
    var dayName
    var monthName
    
    return <article className={"mail-preview"} >
        <span className="mail-from-who">
            {mail.from}
        </span>
        <span className="mail-subject">
            {mail.subject}
        </span>
        <span className="mail-date">
            {dayName = utilService.getDayName(mail.sentAt)}
            {monthName = utilService.getMonthNum(mail.sentAt)}
        </span>
    </article>
}
