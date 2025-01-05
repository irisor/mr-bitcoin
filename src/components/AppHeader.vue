<template>
    <header>
        <p>Welcome {{ user.name }}</p>
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

/* h1 {
    margin: 0;
} */

/* button {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
} */
</style>
