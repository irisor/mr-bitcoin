<template>
    <ul class="contact-list">
        <li class="contact-preview" v-for="contact in contacts" :key="contact._id">
            <ContactPreview :contact="contact" />
            <button class="btn btn-primary" @click="onRemoveContact(contact._id)">x</button>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact } from "@/model/contact.model"
import ContactPreview from "./ContactPreview.vue"

export default defineComponent({
    components: {
        ContactPreview
    },
    props: {
        contacts: {
            type: Array as () => Contact[],
            required: true
        }
    },
    methods: {
        onRemoveContact(contactId: string) {
            this.$emit('remove', contactId)
        }
    }
})
</script>
<style scoped>
.contact-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
}

.contact-preview {
    background-color: var(--color-surface);
    display: grid;
    justify-items: start;
    gap: 1rem;
    padding: 1rem;
    border-radius: 4px;
}
</style>