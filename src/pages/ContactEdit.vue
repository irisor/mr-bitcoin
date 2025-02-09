<template>
    <section class="contact-edit">
        <form v-if="localContact" @submit.prevent="onSave">
            <label to="name">Name:</label>
            <input v-model="localContact.name" type="text">

            <label to="email">Email:</label>
            <input v-model="localContact.email" type="email">

            <label to="phone">Phone:</label>
            <input v-model="localContact.phone" type="phone">
            <button class="btn btn-secondary">Save</button>
        </form>
        <div v-else class="loading-placeholder">
            Loading...
        </div>

        <RouterLink class="btn btn-primary" to="/contact">Back</RouterLink>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact } from "@/model/contact.model"
import { contactService } from "@/services/contact.service"
import { showErrorMsg, showSuccessMsg } from '@/services/eventBus.service';

export default defineComponent({
    data() {
        return {
            contact: null as Partial<Contact> | null,
            localContact: null as Partial<Contact> | null,
        }
    },
    methods: {
        async onSave() {
            if (!this.localContact) return
            try {
                await this.$store.dispatch({ type: 'saveContact', contact: this.localContact as Contact })
                showSuccessMsg('Contact saved')
                this.$router.push('/contact')
            } catch (err) {
                showErrorMsg('Something went wrong')
            }
        }
    },
    async created() {
        const contactId = String(this.$route.params.id)
        if (!contactId) this.localContact = contactService.getEmptyContact()
        else {
            this.contact = await this.$store.dispatch({
                type: 'getContact',
                contactId
            })
            if (!this.contact) {
                showErrorMsg('Contact not found')
                this.$router.push('/contact')
            } else {
                this.localContact = { ...this.contact }
            }
        }
    }
})
</script>
<style scoped>
.contact-edit {
    align-items: center;
    display: grid;
    grid-template-columns: 1fr;
    flex-wrap: wrap;
    gap: 2em;
    justify-items: left;
    max-width: 600px;
}

form {
    align-items: center;
    display: grid;
    gap: 1em;
    grid-template-columns: auto 1fr;
    justify-items: left;
}
</style>