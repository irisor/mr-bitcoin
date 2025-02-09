import { contactService } from "@/services/contact.service"
import type { Contact, ContactFilterModel } from "@/model/contact.model"
import { ContactState } from "@/store/store"
import { showErrorMsg } from "@/services/eventBus.service"

export default {
    state(): ContactState {
        return {
            contacts: [] as Contact[],
            isLoading: false
        }
    },
    mutations: {
        setContacts(contactState: ContactState, { contacts }: { contacts: Contact[] }): void {
            contactState.contacts = contacts
        },
        removeContact(contactState: ContactState, { contactId }: { contactId: string }): void {
            const idx = contactState.contacts.findIndex(contact => contact?._id === contactId)
            contactState.contacts.splice(idx, 1)
        },
        updateContact(contactState: ContactState, { contact }: { contact: Contact }): void {
            const idx = contactState.contacts.findIndex(c => c?._id === contact._id)
            contactState.contacts.splice(idx, 1, contact)
        },
        addContact(contactState: ContactState, { contact }: { contact: Contact }): void {
            contactState.contacts.push(contact)
        },
        setIsLoading(contactState: ContactState, { isLoading }: { isLoading: boolean }): void {
            contactState.isLoading = isLoading
        }
    },
    getters: {
        contacts(contactState: ContactState): Array<Contact | null> {
            return contactState.contacts
        },
        isLoading(contactState: ContactState): boolean {
            return contactState.isLoading
        },
        getContactById: (state: ContactState) => (id: string): Contact | undefined => {
            return state.contacts.find(contact => contact._id === id)
        },
    } as {
        contacts: (state: ContactState) => Array<Contact | null>
        isLoading: (state: ContactState) => boolean,
        getContactById: (state: ContactState) => (id: string) => Contact | undefined
    },
    actions: {
        async loadContacts(context: { commit: (arg0: { type: string; contacts?: any; isLoading?: boolean; }) => void }, { filterBy }: { filterBy: ContactFilterModel }) {
            context.commit({ type: 'setIsLoading', isLoading: true })
            try {
                const contacts = await contactService.getContacts(filterBy)
                context.commit({ type: 'setContacts', contacts })
            } catch (err) {
                showErrorMsg('Error loading contacts')
                throw err
            } finally {
                context.commit({ type: 'setIsLoading', isLoading: false })
            }
        },
        async removeContact({ commit }: { commit: (arg0: { type: string; contactId: string; }) => void }, { contactId }) {
            try {
                await contactService.deleteContact(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                showErrorMsg('Error deleting contact')
                throw err
            }
        },
        async saveContact({ commit }: { commit: (arg0: { type: string; contact: Contact; }) => void }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            const savedContact = await contactService.saveContact(contact)
            commit({ type: actionType, contact: savedContact })
            return savedContact
        },
        async getContact({ commit }: { commit: Function }, { contactId }: { contactId: string }) {
    
            // If not in store, fetch from service
            if (!this.getters.contacts.length) {
                await this.dispatch({
                    type: 'loadContacts',
                    filterBy: {} as ContactFilterModel
                })
            }
            const contact = this.getters.getContactById(contactId)
            return contact
        }
    },
}