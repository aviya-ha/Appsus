// mail service

import { utilService } from '../../../services/util.service.js'
import { storageServiceLocal } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'



const MAIL_KEY = 'mailDB'

// var gFilterBy

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

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


_createMails()
// console.log('_createMails():', _createMails())

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromParams,
    getFullDate,
    
}
// For Debug only
window.cs = mailService


// function query(filterBy = getDefaultFilter()) {
function query(filterBy = getDefaultFilter()) {
    // console.log('filterBy', filterBy)

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.search) {
                const regex = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.isRead === 'read') {
                mails = mails.filter(mails => mails.isRead)
            }

            if (filterBy.isRead === 'unRead') {
                mails = mails.filter(mails => !mails.isRead)
            }
            // if (filterBy.desc) {
            //     const regex = new RegExp(filterBy.desc, 'i')
            //     mails = mails.filter(mails => regex.test(mails.desc))
            // }
            return mails
        })
}

function get(mailID) {
    return storageService.get(MAIL_KEY, mailID)
    // .then(mail => _setNextPrevMailId(mail))
    // return axios.get(MAIL_KEY, mailID)
}

function remove(mailID) {
    return storageService.remove(MAIL_KEY, mailID)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _createMail(mail.vendor, mail.maxSpeed)
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', from = '', to = '') {
    return {
        id: '',
        subject,
        body: '',
        isRead: false,
        sentAt:  Date.now(),
        removedAt: null,
        from,
        to,
        // folder: [a,b]
    }
}

function getDefaultFilter() {
    return { search: '', isRead: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        search: searchParams.get('search') || defaultFilter.search,
        isRead: searchParams.get('isRead') || defaultFilter.isRead,
        // minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
        // desc: searchParams.get('desc') || defaultFilter.desc
    }
}

function _createMails() {
    let mails = storageServiceLocal.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('new updates', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Upload the files to a new cloud', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Updates Privacy Policy', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('Hay to all', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Welcome party', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('Your Battle.net Transaction Currency Will Be Changing', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        mails.push(_createMail('I don\'t like the updates Privacy Policy', 'user@appsus.com', 'momo@momo.com'))
        storageServiceLocal.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject = '', from = '', to = '') {
    const mail = getEmptyMail(subject, from, to)
    mail.id = utilService.makeId()
    mail.body = utilService.makeLorem(100)
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

function getFullDate(date = 1710332613261){
    date = new Date(date)
    return date
}




