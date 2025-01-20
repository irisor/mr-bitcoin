<template>
    <section class="contact-edit">
        <form v-if="contact" @submit.prevent="onSave">
            <label to="name">Name:</label>
            <input v-model="contact.name" type="text">

            <label to="email">Email:</label>
            <input v-model="contact.email" type="email">

            <label to="phone">Phone:</label>
            <input v-model="contact.phone" type="phone">
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

export default defineComponent({
    data() {
        return {
            contact: null as Partial<Contact> | null,
        }
    },
    methods: {
        async onSave() {
            if (!this.contact) return
            try {
                await this.$store.dispatch({type: 'saveContact', contact: this.contact as Contact})
                this.$router.push('/contact')
            } catch (err) {
                alert('Something went wrong')
            }
        }
    },
    async created() {
        const contactId = String(this.$route.params.id)
        if (!contactId) this.contact = contactService.getEmptyContact()
        try {
            this.contact = await this.$store.dispatch({
                type: 'getContact',
                contactId
            })
        } catch (err) {
            console.error('Failed to load contact:', err)
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