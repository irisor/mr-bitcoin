<template>
    <h2>{{ contact.name }}</h2>
    <p>{{ contact.email }}</p>
    <p>{{ contact.phone }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact } from "@/model/contact.model"

export default defineComponent({
    props: {
        contact: {
            type: Object as () => Contact,
            required: true
        }
    },
})
</script>