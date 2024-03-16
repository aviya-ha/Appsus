// mail service

import { utilService } from '../../../services/util.service.js'
import { storageServiceLocal } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromParams,
    getFullDate,
    sortMails

}

function query(filterBy = getDefaultFilter()) {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.folder === 'isStarred') {
                mails = mails.filter(mail => mail.isStarred === true)
            }
            else if (filterBy.folder) {
                mails = mails.filter(mail => mail.folder === filterBy.folder)
            }
            if (filterBy.search) {
                const regex = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.isRead === 'read') {
                mails = mails.filter(mail => mail.isRead)
            }

            if (filterBy.isRead === 'unRead') {
                mails = mails.filter(mail => !mail.isRead)
            }
            if (filterBy.isStarred === 'unRead') {
                mails = mails.filter(mail => !mail.isRead)
            }
            return mails
        })
}

function get(mailID) {
    return storageService.get(MAIL_KEY, mailID)
}

function remove(mailID) {
    return storageService.remove(MAIL_KEY, mailID)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _createMail(mail.subject, mail.from, mail.to)
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', from = '', to = '') {
    return {
        id: '',
        subject,
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from,
        to,
        folder: '',
        
    }
}

function getDefaultFilter() {
    return { search: '', isRead: '', folder: 'inbox',  }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        search: searchParams.get('search') || defaultFilter.search,
        isRead: searchParams.get('isRead') || defaultFilter.isRead,
        folder: searchParams.get('folder') || defaultFilter.folder,
        // isStarred: searchParams.get('isStarred') || defaultFilter.isStarred,
    }
}

function sortMails(mails) {
    // inbox  starred important sent drafts trash

    mails.map(mail => {
        if (mail.from === loggedinUser.email) {
            mail.folder = 'inbox'
        }
        if (mail.from !== loggedinUser.email) {
            mail.folder = 'sent'
        }
    })
    return mails

}

function _createMails() {
    let mails = storageServiceLocal.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Updates Privacy Policy', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Welcome party', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Welcome party', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Updates Privacy Policy', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Welcome party', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Welcome party', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Updates Privacy Policy', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Updates Privacy Policy', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Welcome party', 'momo@momo.com', 'user@appsus.com'))

        mails.push(_createMail('Hay to all', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Your Battle.net Transaction Currency Will Be Changing', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Hay to all', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Hay to all', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Your Battle.net Transaction Currency Will Be Changing', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Your Battle.net Transaction Currency Will Be Changing', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Hay to all', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))

        storageServiceLocal.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject = '', from = '', to = '') {
    const mail = getEmptyMail(subject, from, to)
    mail.id = utilService.makeId()
    mail.body = utilService.makeLorem(100)
    if (!mail.from) mail.from = loggedinUser.email
    mail.folder = (mail.from !== loggedinUser.email) ? 'inbox' : 'sent'
    return mail
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        car.nextMailId = nextMail.id
        car.prevMailId = prevMail.id
        return mail
    })
}

function getFullDate(date = 1710332613261) {
    date = new Date(date)
    return date
}




