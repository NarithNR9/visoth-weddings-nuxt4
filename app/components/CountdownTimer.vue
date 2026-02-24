<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
    targetDate: string;
    variant?: "glass" | "gold";
}>();

const now = ref(Date.now());
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
    interval = setInterval(() => {
        now.value = Date.now();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});

const diff = computed(() => {
    const target = new Date(props.targetDate).getTime();
    const ms = Math.max(0, target - now.value);
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return {
        days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
    };
});

const units = computed(() => [
    { value: diff.value.days, label: t("countdown.days") },
    { value: diff.value.hours, label: t("countdown.hours") },
    { value: diff.value.minutes, label: t("countdown.minutes") },
    { value: diff.value.seconds, label: t("countdown.seconds") },
]);
</script>

<template>
    <div class="max-w-sm mx-auto">
        <p
            class="text-center text-lg mb-3"
            :class="variant === 'gold' ? 'text-gold' : 'text-white/80'"
            style="font-family: var(--font-moulpali)"
        >
            {{ t("countdown.waiting") }}
        </p>
        <div class="grid grid-cols-4 gap-3">
            <div v-for="unit in units" :key="unit.label" class="text-center">
                <div
                    class="rounded-lg p-3 w-20 h-20 flex items-center justify-center"
                    :class="
                        variant === 'gold'
                            ? 'bg-linear-to-b from-gold-light to-gold shadow-sm'
                            : 'bg-white/20 backdrop-blur-sm'
                    "
                >
                    <div
                        class="text-3xl md:text-4xl font-bold tabular-nums text-white"
                    >
                        {{ String(unit.value).padStart(2, "0") }}
                    </div>
                </div>
                <div
                    class="text-sm md:text-base mt-3 font-semibold"
                    :class="variant === 'gold' ? 'text-gold' : 'text-white/80'"
                >
                    {{ unit.label }}
                </div>
            </div>
        </div>
    </div>
</template>
