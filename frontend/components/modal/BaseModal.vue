<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm"]);

const handleConfirm = () => {
  emit("confirm");
};
</script>

<template>
  <div class="base-modal">
    <div class="base-modal__content">
      <p class="base-modal__message">{{ message }}</p>
      <div class="base-modal__button-wrapper">
        <button class="base-modal__button" @click="handleConfirm">確認</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.base-modal__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.base-modal__message {
  margin-bottom: 20px;
}
.base-modal__button-wrapper {
  display: flex;
  justify-content: center;
}
.base-modal__button {
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
