<template>
    <main class="contact-index">
        <h1>Contacts</h1>
        <header>
            <ContactFilter @filter="filterBy" />
            <RouterLink to="/contact/edit">Add a Contact</RouterLink>
        </header>
        <ContactList :contacts="contacts" @remove="removeContact" :isLoading="isLoading" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact, ContactFilterModel } from "@/model/contact.model"
import ContactList from '@/components/ContactList.vue'
import ContactFilter from '@/components/ContactFilter.vue'
import { showErrorMsg } from '@/services/eventBus.service';

export default defineComponent({
    components: {
        ContactList,
        ContactFilter,
    },
    async created() {
        await this.loadContacts()
    },
    computed: {
        contacts(): Contact[] {
            return this.$store.getters.contacts || []
        },
        isLoading(): boolean {
            return this.$store.getters.isLoading
        }
    },
    methods: {
        async removeContact(contactId: string) {
            try {
                await this.$store.dispatch({ type: 'removeContact', contactId })
            } catch (err) {
                showErrorMsg('Something went wrong')
            }
        },
        async filterBy(filterBy: ContactFilterModel) {
            await this.loadContacts(filterBy)
        },
        async loadContacts(filterBy: ContactFilterModel = { term: '' }) {
            this.$store.dispatch({ type: 'loadContacts', filterBy })
        }
    },
})
</script>
<style scoped>
.contact-index {
    display: grid;
    gap: 1rem;
}

header {
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: flex-start;
}
</style>
