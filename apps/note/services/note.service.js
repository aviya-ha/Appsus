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
    getFilterFromParams,
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
            url: 'https://hahacanvas.co.il/wp-content/uploads/2019/01/954927-1.jpg',
        },
        
    },
    {
        id: 'n103',
        type: 'NoteList',
        isPinned: false,
        isEdit: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', isDone: false },
                { txt: 'Coding power', isDone: true }
            ]
        }
    }
]

const NOTE_KEY = 'notesDB'

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
    .then((notes) => {
        if (!notes || !notes.length) {
            notes = gNotes
            _saveNotesToStorage()
        }
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            notes = notes.filter((n) => regExp.test(n.info.txt ||n.info.title))
        }
        if (filterBy.type) {
            const regExp = new RegExp(filterBy.type, 'i')
            notes = notes.filter((n) => regExp.test(n.type))
            // notes = notes.filter((n) => n.type <= filterBy.type)
        }
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

function getDefaultFilter() {
    return { txt: '',type:'' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        txt: searchParams.get('txt') || defaultFilter.txt,
        type: searchParams.get('type') || defaultFilter.type,
    }
}

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