<template>
    <input 
        v-model="filterBy.term" 
        @input="debouncedFilterBy"
        type="text"
        placeholder="Search">
</template>

<script lang="ts">
import { debounce } from '@/services/util.service'
import type { ContactFilterModel } from "@/model/contact.model"
export default {
    data() {
        return {
            filterBy: { term: '', } as ContactFilterModel
        }
    },
    methods: {
        setFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    },
    computed: {
        debouncedFilterBy() {
            return debounce(this.setFilterBy, 300)
        }
    }
}
</script>

<style lang="scss">

</style>