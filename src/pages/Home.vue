<template>
  <main>
    <h1>Welcome {{ user.name }}</h1>
    <p>Balance: {{ user.balance }}</p>
    <p>Current Bitcoin Rate: {{ btcToUsdRate }}</p>
       
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userService } from "@/services/user.service"
import type { User } from "@/model/user.model"
import { bitcoinService } from '@/services/bitcoin.service';

export default defineComponent({
    data() {
        return {
            user: {} as User,
            bitcoinRate: 0
        };
    },
    computed: {
        btcToUsdRate() {
            return this.bitcoinRate ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1/this.bitcoinRate) : '0.00'
        }
    },
    async created() {
        this.user = userService.getLoggedInUser()
        this.bitcoinRate = await bitcoinService.getRate()
    },
})
</script>
