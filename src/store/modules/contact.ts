import { contactService } from "@/services/contact.service"
import type { Contact, ContactFilterModel } from "@/model/contact.model"
import { ContactState } from "@/store/store"

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
            console.log("setContacts", contactState, contacts)
        },
        removeContact(contactState: ContactState, { contactId }: { contactId: string }): void {
            const idx = contactState.contacts.findIndex(contact => contact?._id === contactId)
            contactState.contacts.splice(idx, 1)
        },
        setIsLoading(contactState: ContactState, { isLoading }: { isLoading: boolean }): void {
            contactState.isLoading = isLoading
        }
    },
    getters: {
        contacts(contactState: ContactState): Array<Contact | null> {
            console.log("getContacts")
            return contactState.contacts
        },
        isLoading(contactState: ContactState): boolean {
            return contactState.isLoading
        }
    } as {
        contacts: (state: ContactState) => Array<Contact | null>
        isLoading: (state: ContactState) => boolean
    },
    actions: {
        async loadContacts(context: { commit: (arg0: { type: string; contacts?: any; isLoading?: boolean; }) => void }, { filterBy }: { filterBy: ContactFilterModel }) {
            context.commit({ type: 'setIsLoading', isLoading: true })
            try {
                const contacts = await contactService.getContacts(filterBy)
                console.log("Store contacts:", contacts, "Store filterBy", filterBy)
                context.commit({ type: 'setContacts', contacts })
            } catch (err) {
                console.log(err)
                throw err
            } finally {
                context.commit({ type: 'setIsLoading', isLoading: false })
            }
        },
        async removeContact({ commit }: { commit: (arg0: { type: string; contactId: any; }) => void }, { contactId }) {
            try {
                await contactService.deleteContact(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                console.log(err)                
                throw err
            }
        }
    },
}