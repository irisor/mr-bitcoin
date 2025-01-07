<template>
    <section v-if="contact" class="contact-details">
        <section class="contact-info    ">
            <h2>{{ contact.name }}</h2>
            <p>{{ contact.email }}</p>
            <p>{{ contact.phone }}</p>
        </section>
        <div v-show="isLoading" class="loading-placeholder">
            Loading...
        </div>

        <!-- Image with loading handling -->
        <img v-if="!isImgError"
            :alt="`Robot ${contact.name}`" 
            :src="`https://robohash.org/${contact._id}?set=set7`"
            style="width: 300px; height: 300px; object-fit: contain;" 
            @load="isLoading = false" 
            @error="handleError"
            v-show="!isLoading">
        <RouterLink class="btn btn-primary" to="/contact">Back</RouterLink>
    </section>
    <p v-else>Loading...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact } from "@/model/contact.model"
import { contactService } from "@/services/contact.service"

export default defineComponent({
    data() {
        return {
            contact: null as Contact | null,
            isLoading: true as boolean,
            isImgError: false as boolean
        }
    },
    methods: {
        handleError() {
            this.isLoading = false
            this.isImgError = true
        }
    },
    async created() {
        const contactId = String(this.$route.params.id);
        this.contact = await contactService.getContactById(contactId);
    }
})
</script>
<style scoped>
.contact-details {
    align-items: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-wrap: wrap;
    gap: 2em;
    justify-items: left;
    max-width: 600px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>