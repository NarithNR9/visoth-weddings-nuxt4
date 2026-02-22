<script setup lang="ts">
const route = useRoute()
const guestId = route.query.guest as string | undefined

if (guestId) {
  await navigateTo(`/guest/${guestId}`, { redirectCode: 301 })
} else {
  await navigateTo('/', { redirectCode: 302 })
}
</script>

<template>
  <div />
</template>
