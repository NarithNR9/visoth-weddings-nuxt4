<script setup lang="ts">
const { locale } = useI18n()
const { assetUrl } = useDirectus()

const props = defineProps<{
  items: GalleryItem[]
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  close: []
}>()

const currentItem = computed(() => props.items[props.modelValue])
const imageUrl = computed(() =>
  currentItem.value ? assetUrl(currentItem.value.image, { width: 1200, quality: 85 }) : ''
)
const caption = computed(() =>
  currentItem.value ? localized(currentItem.value, 'caption', locale.value) : ''
)

function prev() {
  const idx = props.modelValue <= 0 ? props.items.length - 1 : props.modelValue - 1
  emit('update:modelValue', idx)
}

function next() {
  const idx = props.modelValue >= props.items.length - 1 ? 0 : props.modelValue + 1
  emit('update:modelValue', idx)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      @click.self="emit('close')"
    >
      <button
        class="absolute top-4 right-4 text-white text-4xl hover:text-gold-light transition-colors cursor-pointer z-10"
        @click="emit('close')"
      >
        &times;
      </button>

      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-light transition-colors cursor-pointer z-10"
        @click="prev"
      >
        &#8249;
      </button>

      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold-light transition-colors cursor-pointer z-10"
        @click="next"
      >
        &#8250;
      </button>

      <div class="max-w-5xl max-h-[90vh] px-12">
        <img
          :src="imageUrl"
          :alt="caption"
          class="max-w-full max-h-[80vh] object-contain mx-auto"
        />
        <p v-if="caption" class="text-center text-white/80 mt-4 text-sm">
          {{ caption }}
        </p>
      </div>
    </div>
  </Teleport>
</template>
