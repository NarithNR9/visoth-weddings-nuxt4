<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  targetDate: string
}>()

const now = ref(Date.now())
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const diff = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const ms = Math.max(0, target - now.value)
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  }
})

const units = computed(() => [
  { value: diff.value.days, label: t('countdown.days') },
  { value: diff.value.hours, label: t('countdown.hours') },
  { value: diff.value.minutes, label: t('countdown.minutes') },
  { value: diff.value.seconds, label: t('countdown.seconds') },
])
</script>

<template>
  <div class="grid grid-cols-4 gap-3 max-w-sm mx-auto">
    <div
      v-for="unit in units"
      :key="unit.label"
      class="text-center bg-white/20 backdrop-blur-sm rounded-lg p-3"
    >
      <div class="text-3xl md:text-4xl font-bold text-white">
        {{ String(unit.value).padStart(2, '0') }}
      </div>
      <div class="text-xs md:text-sm text-white/80 mt-1">
        {{ unit.label }}
      </div>
    </div>
  </div>
</template>
