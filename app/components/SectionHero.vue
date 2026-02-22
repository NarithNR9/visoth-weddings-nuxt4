<script setup lang="ts">
const { locale, t } = useI18n();
const { assetUrl } = useDirectus();

const props = defineProps<{
    settings: WeddingSettings;
    guestName?: string;
}>();

const groomName = computed(() =>
    localized(props.settings, "groom_name", locale.value),
);
const brideName = computed(() =>
    localized(props.settings, "bride_name", locale.value),
);
const tagline = computed(() =>
    localized(props.settings, "tagline", locale.value),
);
const venueName = computed(() =>
    localized(props.settings, "venue_name", locale.value),
);
const venueAddress = computed(() =>
    localized(props.settings, "venue_address", locale.value),
);
const heroUrl = computed(() =>
    assetUrl(props.settings.hero_image, { width: 1920, quality: 80 }),
);

const KM_WEEKDAYS = [
    "ថ្ងៃអាទិត្យ",
    "ថ្ងៃច័ន្ទ",
    "ថ្ងៃអង្គារ",
    "ថ្ងៃពុធ",
    "ថ្ងៃព្រហស្បតិ៍",
    "ថ្ងៃសុក្រ",
    "ថ្ងៃសៅរ៍",
];
const KM_MONTHS = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
];

function toKhmerDigits(n: number | string): string {
    return String(n).replace(/[0-9]/g, (d) => "០១២៣៤៥៦៧៨៩"[+d]!);
}

const formattedDate = computed(() => {
    if (!props.settings.wedding_date) return "";
    const date = new Date(props.settings.wedding_date);
    if (locale.value === "km") {
        const weekday = KM_WEEKDAYS[date.getDay()];
        const day = toKhmerDigits(date.getDate());
        const month = KM_MONTHS[date.getMonth()];
        const year = toKhmerDigits(date.getFullYear());
        return `${weekday} ទី ${day} ខែ ${month} ឆ្នាំ ${year}`;
    }
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
});

const formattedTime = computed(() => {
    if (!props.settings.wedding_time) return "";
    if (locale.value === "km")
        return toKhmerDigits(props.settings.wedding_time);
    return props.settings.wedding_time;
});
</script>

<template>
    <section
        class="relative h-screen flex flex-col items-center text-center text-white overflow-hidden"
    >
        <!-- Background image -->
        <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: `url(${heroUrl})` }"
        />
        <div class="absolute inset-0 bg-black/40" />

        <!-- Top: wedding invitation title (always shown) -->
        <div class="relative z-10 w-full pt-16 px-4">
            <p
                class="text-xl md:text-2xl [text-shadow:0_2px_6px_rgba(0,0,0,0.6)]"
                style="font-family: var(--font-moulpali)"
            >
                {{ t("hero.title") }}
            </p>
        </div>

        <!-- Center: names, hearts, tagline, decorative box -->
        <div
            class="relative z-10 flex-1 flex flex-col items-center justify-center"
        >
            <h1
                class="text-4xl md:text-3xl lg:text-7xl [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]"
                style="font-family: var(--font-metal)"
            >
                {{ groomName }}
            </h1>

            <img
                src="~/assets/images/heart.gif"
                alt=""
                class="h-9 mt-3 my-6 pointer-events-none select-none"
            />

            <h1
                class="text-4xl md:text-3xl lg:text-7xl [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]"
                style="font-family: var(--font-metal)"
            >
                {{ brideName }}
            </h1>
        </div>

        <!-- Bottom: date, time, address -->
        <div
            class="relative z-10 w-full px-6 pb-16 flex flex-col items-center text-center"
        >
            <p
                class="mt-5 text-sm md:text-xl text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
                style="font-family: var(--font-moulpali)"
            >
                {{ t("hero.greeting") }}
            </p>

            <!-- Decorative frame box: shows guest name if present, otherwise venue name -->
            <div class="relative my-3 w-screen max-w-sm px-3">
                <img
                    src="~/assets/images/frame.png"
                    alt=""
                    class="w-full h-14 pointer-events-none select-none"
                />
                <p
                    class="absolute inset-0 font-display flex items-center justify-center text-lg text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
                >
                    {{ guestName ? guestName : venueName }}
                </p>
            </div>
            <p
                class="md:text-2xl lg:text-3xl font-bold leading-snug [text-shadow:0_2px_6px_rgba(0,0,0,0.6)]"
            >
                {{ formattedDate }} {{ t("hero.at") }} {{ formattedTime }}
            </p>
            <p
                class="mt-2 text-base md:text-lg text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
            >
                {{ venueAddress }}
            </p>
        </div>

        <!-- Scroll down chevron -->
        <div class="absolute bottom-5 left-6 z-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white/80 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    </section>
</template>
