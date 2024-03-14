
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

// const mail = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }