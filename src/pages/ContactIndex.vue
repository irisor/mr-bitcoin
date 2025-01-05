<template>
    <main class="contact-index">
        <h1>Contacts</h1>
        <header>
            <ContactFilter @filter="filterBy" />
        </header>
        <ContactList :contacts="contacts" @remove="removeContact" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contactService } from "@/services/contact.service"
import type { Contact, ContactFilterModel } from "@/model/contact.model"
import ContactList from '@/components/ContactList.vue';
import ContactFilter from '@/components/ContactFilter.vue';

export default defineComponent({
    components: {
        ContactList,
        ContactFilter,
    },
    data() {
        return {
            contacts: [] as Contact[]
        };
    },
    async created() {
        await this.loadContacts()
    },
    methods: {
        async removeContact(contactId: string) {
            try {
                await contactService.deleteContact(contactId)

                const idx = this.contacts.findIndex(contact => contact._id === contactId)
                this.contacts.splice(idx, 1)
            } catch (err) {
                alert('Something went wrong')
            }
        },
        async filterBy(filterBy: ContactFilterModel) {
            await this.loadContacts(filterBy)
        },
        async loadContacts(filterBy: ContactFilterModel = { term: '' }) {
            try {
                const contacts = await contactService.getContacts(filterBy)
                this.contacts = contacts
            } catch (error) {
                console.error('Error fetching contacts:', error)
            }
        }
    }
})
</script>
<style scoped>
.contact-index {
    display: grid;
    gap: 1rem;
}
</style>
