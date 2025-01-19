import { Contact } from '@/model/contact.model';
import { Store } from 'vuex';

// State interfaces
interface ContactState {
    contacts: Array<Contact | null>
    isLoading: boolean
}

export interface RootState {
    contact: ContactState
}

// Mutations
type ContactMutations = {
    setContacts(state: ContactState, payload: { contacts: Array<Contact> }): void
    removeContact(state: ContactState, payload: { contactId: string }): void
}

// Augment vuex module with our specific types
declare module 'vuex' {
    // Add custom getters
    export interface Getters {
        contacts(state: ContactState): Array<Contact | null>
    }

    // Add strongly typed mutations
    export interface MutationTree<S> {
        setContacts(state: S, payload: { contacts: Array<Contact> }): void
        removeContact(state: S, payload: { contactId: string }): void
    }
}

// For Options API support
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<RootState>
    }
}
