<script setup lang="ts">
const { assetUrl } = useDirectus()

const props = defineProps<{
  fileId: string
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const src = computed(() => assetUrl(props.fileId))

onMounted(async () => {
  await nextTick()
  if (!audioRef.value) return
  audioRef.value.volume = 0.5
  try {
    await audioRef.value.play()
    isPlaying.value = true
  } catch {
    // Autoplay blocked by browser — user must interact first
    isPlaying.value = false
  }
})

onUnmounted(() => {
  audioRef.value?.pause()
})

function toggle() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play()
    isPlaying.value = true
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <audio ref="audioRef" :src="src" loop preload="auto" />

    <button
      class="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer"
      :title="isPlaying ? 'Pause music' : 'Play music'"
      @click="toggle"
    >
      <!-- Music bars animation when playing -->
      <span v-if="isPlaying" class="flex items-end gap-1 h-5">
        <span class="w-1 bg-gold rounded-full animate-[musicbar_0.8s_ease-in-out_infinite]" style="height: 60%" />
        <span class="w-1 bg-gold rounded-full animate-[musicbar_0.8s_ease-in-out_infinite_0.2s]" style="height: 100%" />
        <span class="w-1 bg-gold rounded-full animate-[musicbar_0.8s_ease-in-out_infinite_0.4s]" style="height: 40%" />
        <span class="w-1 bg-gold rounded-full animate-[musicbar_0.8s_ease-in-out_infinite_0.1s]" style="height: 80%" />
      </span>

      <!-- Static music note when paused -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
      </svg>
    </button>
  </div>
</template>

<style>
@keyframes musicbar {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1); }
}
</style>
