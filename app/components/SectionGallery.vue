<script setup lang="ts">
const { assetUrl } = useDirectus();

const props = defineProps<{
    items: GalleryItem[];
}>();

const lightboxIndex = ref(-1);
const showLightbox = computed(() => lightboxIndex.value >= 0);

function openLightbox(index: number) {
    lightboxIndex.value = index;
}

function closeLightbox() {
    lightboxIndex.value = -1;
}
</script>

<template>
    <section class="py-20 px-4 bg-white" data-aos="fade-up">
        <h2
            class="font-display text-2xl md:text-4xl text-center text-burgundy mb-12"
        >
            {{ $t("sections.gallery") }}
        </h2>

        <div
            class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
            <div
                v-for="(item, index) in items"
                :key="item.id"
                class="aspect-3/4 overflow-hidden rounded-lg cursor-pointer group"
                data-aos="fade-up"
                :data-aos-delay="(index % 4) * 80"
                @click="openLightbox(index)"
            >
                <img
                    :src="
                        assetUrl(item.image, {
                            width: 400,
                            height: 400,
                            quality: 80,
                        })
                    "
                    :alt="
                        localized(item, 'caption', $i18n.locale) ||
                        `Gallery ${index + 1}`
                    "
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </div>

        <GalleryLightbox
            v-if="showLightbox"
            v-model="lightboxIndex"
            :items="items"
            @close="closeLightbox"
        />
    </section>
</template>
