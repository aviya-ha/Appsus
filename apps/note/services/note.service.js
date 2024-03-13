import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { storageServiceLocal } from "../../../services/storage.service.js"

export const noteService = {
    query,
    getById,
    save,
    // getDefaultFilter,
    remove,
    getEmptyNote,
}
window.cs = noteService

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: 'Bobi and Me',
            url: 'http://some-img/me',
        },
        
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]

const NOTE_KEY = 'notesDB'

function query(filterBy) {
    return storageService.query(NOTE_KEY)
        .then((notes) => {
            if (!notes || !notes.length) {
                notes = gNotes
                _saveNotesToStorage()
            }
            // if (filterBy.title) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     notes = notes.filter((n) => regExp.test(n.title))
            // }
            // if (filterBy.price) {
            //     notes = notes.filter((n) => n.listPrice.amount <= filterBy.price)
            // }
            return notes
        })
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

// function getDefaultFilter() {
//     return { title: '', price: 0 }
// }

function getEmptyNote() {

    return {
        id: '',
        createdAt: 1112222,
        type: '',
        isPinned: false,
        style: {
            backgroundColor:'',
        },
        info: {
            txt: ''
        }
    }
}

// function _createNote() {
//     return {
//         id: utilService.makeId(),
//         title: 'metus hendrerit',
//         subtitle: utilService.makeLorem(15),
//         authors: ['Oren Yaniv'],
//         publishedDate: utilService.getRandomInt(1700, 2022),
//         description: utilService.makeLorem(50),
//         pageCount: utilService.getRandomInt(1, 700),
//         categories: ['Computers', 'Hack'],
//         thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
//         language: 'en',
//         listPrice: {
//             amount: utilService.getRandomInt(10, 30),
//             currencyCode: 'EUR',
//             isOnSale: false,
//         },
//     }
// }

function _saveNotesToStorage() {
    storageServiceLocal.saveToStorage(NOTE_KEY, gNotes)
}