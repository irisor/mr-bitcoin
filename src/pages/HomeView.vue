<template>
  <main>
    <h1>Welcome {{ user.name }}</h1>
    <p>Balance: {{ user.balance }}</p>
       
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userService } from "@/services/user.service"
import type { User } from "@/model/user.model"

export default defineComponent({
    data() {
        return {
            user: {} as User
        };
    },
    created() {
        this.user = userService.getLoggedInUser()
    },
    methods: {
        logout() {
            // Implement logout functionality here
            console.log("User logged out")
        }
    }
})
</script>
