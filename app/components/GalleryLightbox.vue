<script setup lang="ts">
const { locale } = useI18n();
const { assetUrl } = useDirectus();

const props = defineProps<{
    items: GalleryItem[];
    modelValue: number;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: number];
    close: [];
}>();

const currentItem = computed(() => props.items[props.modelValue]);
const imageUrl = computed(() =>
    currentItem.value
        ? assetUrl(currentItem.value.image, { width: 1200, quality: 85 })
        : "",
);
const caption = computed(() =>
    currentItem.value
        ? localized(currentItem.value, "caption", locale.value)
        : "",
);

function prev() {
    const idx =
        props.modelValue <= 0 ? props.items.length - 1 : props.modelValue - 1;
    emit("update:modelValue", idx);
}

function next() {
    const idx =
        props.modelValue >= props.items.length - 1 ? 0 : props.modelValue + 1;
    emit("update:modelValue", idx);
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") emit("close");
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
}

onMounted(() => {
    document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 z-100 bg-black/90 flex items-center justify-center"
            @click.self="emit('close')"
        >
            <div class="relative max-w-5xl max-h-[90vh]">
              <button
                class="absolute top-1 right-1 text-white hover:text-gold-light transition-colors cursor-pointer z-10 bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
                @click="emit('close')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
                <button
                    class="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-gold-light transition-colors cursor-pointer z-10 bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
                    @click="prev"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gold-light transition-colors cursor-pointer z-10 bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
                    @click="next"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                <img
                    :src="imageUrl"
                    :alt="caption"
                    class="max-w-full max-h-[80vh] object-contain mx-auto"
                />
                <p
                    v-if="caption"
                    class="text-center text-white/80 mt-4 text-sm"
                >
                    {{ caption }}
                </p>
            </div>
        </div>
    </Teleport>
</template>
