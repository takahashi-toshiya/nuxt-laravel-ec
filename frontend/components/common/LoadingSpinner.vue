<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "#imports";

const { t } = useI18n();

interface Props {
  size?: "small" | "medium" | "large";
  text?: string;
  containerClass?: string;
}

const {
  size = "medium",
  text = "",
  containerClass = "",
} = defineProps<Props>();

const sizeClasses = computed(() => {
  switch (size) {
    case "small":
      return "h-6";
    case "large":
      return "h-12";
    default:
      return "h-8";
  }
});

const spinnerClasses = computed(() => {
  switch (size) {
    case "small":
      return "w-4 h-4";
    case "large":
      return "w-8 h-8";
    default:
      return "w-6 h-6";
  }
});

const textClasses = computed(() => {
  switch (size) {
    case "small":
      return "text-sm";
    case "large":
      return "text-lg";
    default:
      return "text-base";
  }
});
</script>

<template>
  <div
    :class="[
      'loading-spinner flex items-center justify-center',
      sizeClasses,
      containerClass,
    ]"
  >
    <img
      src="/image/loading.gif"
      :alt="t('common.loading')"
      :class="spinnerClasses"
    />
    <span v-if="text" :class="textClasses" class="ml-2">
      {{ text }}
    </span>
  </div>
</template>
