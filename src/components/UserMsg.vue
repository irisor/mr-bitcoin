<template>
    <div v-if="msg" :class="msg.type" class="user-msg">
        <p>{{ msg.txt }}</p>
    </div>
</template>

<script>
import { eventBus } from '@/services/eventBus.service'
export default {
    data() {
        return {
            msg: null,
        }
    },
    methods: {
        onUserMsg(msg) {
            this.msg = msg
            setTimeout(() => this.msg = null, 2000)
        }
    }, 
    created() {
        eventBus.on('user-msg', this.onUserMsg)
    }
}
</script>

<style lang="css">
.user-msg {
    position: absolute;
    top: 42px;
    right: 1rem;
    min-width: 200px;

    padding: 10px;
    background-color: darkslategray;
    border-radius: .5rem;

    color: whitesmoke;
}

.success {
    background-color: darkseagreen;
}

.error {
    background-color: orangered;
}
</style>