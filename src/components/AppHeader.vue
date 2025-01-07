<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink> |
            <RouterLink to="/contact">Contact</RouterLink> |
            <RouterLink to="/stats">Stats</RouterLink>
        </nav>
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
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr auto auto;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

nav {
    align-items: center;
    display: flex;
    gap: 1em;
}

</style>
