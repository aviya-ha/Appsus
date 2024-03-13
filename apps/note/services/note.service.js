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
        isEdit: false,
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
        isEdit: false,
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
        isEdit: false,
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
        console.log('note:', note)
        return storageService.post(NOTE_KEY, note)
    }
}

// function getDefaultFilter() {
//     return { title: '', price: 0 }
// }

function getEmptyNote() {

    return {
        id: '',
        createdAt: Date.now(),
        type: '',
        isPinned: false,
        isEdit: false,
        style: {
            backgroundColor:'',
        },
        info: {
            title:'',
            txt: ''
        }
    }
}

function _saveNotesToStorage() {
    storageServiceLocal.saveToStorage(NOTE_KEY, gNotes)
}