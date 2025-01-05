<template>
    <header>
        <p>{{ user.name }}</p>
        <button class="btn btn-secondary" @click="logout">Logout</button>
    </header>
</template>

<script>
import { userService } from "@/services/user.service";

export default {
    data() {
        return {
            user: {}
        };
    },
    created() {
        this.user = userService.getLoggedInUser();
    },
    methods: {
        logout() {
            // Implement logout functionality here
            console.log("User logged out");
        }
    }
};
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

</style>
