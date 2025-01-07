import type { Contact, ContactFilterModel } from "@/model/contact.model";
import { makeId, loadFromStorage, saveToStorage } from './util.service.js'
import { storageService } from '@/services/async-storage.service'

export const contactService = {
    getContacts,
    getContactById,
    deleteContact,
    saveContact,
    getEmptyContact,
}

const KEY: string = 'contacts'
_createContacts()


function sort(arr: Contact[]): Contact[] {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getContacts(filterBy: ContactFilterModel | null  = null): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
        let contactsToReturn: Contact[] = loadFromStorage(KEY)
        if (filterBy && filterBy.term) {
            contactsToReturn = filter(contactsToReturn, filterBy.term)
        }
        resolve(sort(contactsToReturn))
    })
}

async function getContactById(id: string): Promise<Contact> {
    return storageService.get(KEY, id)
}

async function deleteContact(id: string): Promise<Contact> {
    return storageService.remove(KEY, id)
}

async function _updateContact(contact: Contact): Promise<Contact> {
    return storageService.put(KEY, contact)
}

async function _addContact(contact: Contact): Promise<Contact> {
    return storageService.post(KEY, contact)
}

async function saveContact(contact: Contact): Promise<Contact> {
    return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact(): Partial<Contact> {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function filter(contacts: Contact[], term: string): Contact[] {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
        return contact.name.toLocaleLowerCase().includes(term) ||
            contact.phone.toLocaleLowerCase().includes(term) ||
            contact.email.toLocaleLowerCase().includes(term)
    })
}

function _createContacts() {
    let contacts: Contact[] = loadFromStorage(KEY)
    if (contacts && contacts.length) return

    contacts = [
        _createContact("Ochoa Hyde", "ochoahyde@renovize.com", "+1 (968) 593-3824"),
        _createContact("Hallie Mclean", "halliemclean@renovize.com", "+1 (948) 464-2888"),
        _createContact("Parsons Norris", "parsonsnorris@renovize.com", "+1 (958) 502-3495"),
        _createContact("Rachel Lowe", "rachellowe@renovize.com", "+1 (911) 475-2312"),
        _createContact("Dominique Soto", "dominiquesoto@renovize.com", "+1 (807) 551-3258"),
        _createContact("Shana Pope", "shanapope@renovize.com", "+1 (970) 527-3082"),
        _createContact("Faulkner Flores", "faulknerflores@renovize.com", "+1 (952) 501-2678"),
        _createContact("Holder Bean", "holderbean@renovize.com", "+1 (989) 503-2663"),
        _createContact("Rosanne Shelton", "rosanneshelton@renovize.com", "+1 (968) 454-3851"),
        _createContact("Pamela Nolan", "pamelanolan@renovize.com", "+1 (986) 545-2166"),
        _createContact("Roy Cantu", "roycantu@renovize.com", "+1 (929) 571-2295"),
        _createContact("Ollie Christian", "olliechristian@renovize.com", "+1 (977) 419-3550"),
        _createContact("Nguyen Walls", "nguyenwalls@renovize.com", "+1 (963) 471-3181"),
        _createContact("Glenna Santana", "glennasantana@renovize.com", "+1 (860) 467-2376"),
        _createContact("Malone Clark", "maloneclark@renovize.com", "+1 (818) 565-2557"),
        _createContact("Floyd Rutledge", "floydrutledge@renovize.com", "+1 (807) 597-3629"),
        _createContact("Grace James", "gracejames@renovize.com", "+1 (959) 525-2529"),
        _createContact("Tanner Gates", "tannergates@renovize.com", "+1 (978) 591-2291"),
        _createContact("Lilly Conner", "lillyconner@renovize.com", "+1 (842) 587-3812")
    ]
    saveToStorage(KEY, contacts)
}

function _createContact(name: string, email: string, phone: string): Contact {
    return {
        _id: makeId(),
        name,
        email,
        phone
    }
}
