import { Contact } from '@/model/contact.model';
import { Store as VuexStore, ContactMutations, RootState } from 'vuex';

declare module 'vuex' {
    // Define the state interface
    export interface ContactState {
        contacts: Array<Contact | null>
        isLoading: boolean
    }

    // Define the root state interface
    export interface RootState {
        contact: ContactState
    }

    // Define the mutations
    export interface ContactMutations<S = ContactState> {
        setContacts(state: S, payload: { contacts: Array<Contact> }): void
        removeContact(state: S, payload: { contactId: string }): void
    }

    // Define the getters
    export interface ContactGetters extends GetterTree<ContactState, RootState> {
        contacts(state: ContactState): Array<Contact | null>
    }
}

// Create a new store type that merges the base Store type with our custom types
export type Store = Omit<VuexStore<RootState>, 'getters' | 'commit'> & {
    getters: {
        contacts: Array<Contact | null>
    };
    commit<K extends keyof ContactMutations>(
        type: K,
        payload: Parameters<ContactMutations[K]>[1]
    ): void;
};

// Export the store instance
declare const store: Store
export default store