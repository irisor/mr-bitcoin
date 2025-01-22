<script lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import UserMsg from './components/UserMsg.vue'

export default {
	components: {
		AppHeader,
		AppFooter,
		UserMsg,
	},
}

</script>

<template>
  <UserMsg />
  <AppHeader />
  <main>
		<RouterView />
	</main>
  <AppFooter />
</template>

<style scoped>
main {
	overflow: auto;
}
</style>
