import { ref } from "vue";

export function useError() {
  const isError = ref(false);
  const errorMessage = ref("");

  const showError = (message: string) => {
    errorMessage.value = message;
    isError.value = true;
  };

  const closeError = () => {
    isError.value = false;
    errorMessage.value = "";
  };

  return {
    isError,
    errorMessage,
    showError,
    closeError,
  };
}
