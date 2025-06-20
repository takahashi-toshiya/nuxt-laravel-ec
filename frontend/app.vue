<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { ref, onMounted } from "vue";
import { getLoginUser } from "./services/userService";

// Todo: ssrにする必要あり
const userStore = useUserStore();
const isLoaded = ref(false);

const fetchUser = async () => {
  try {
    const user = await getLoginUser();

    await userStore.setUser({
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log("ユーザー情報の取得に失敗しました", error);
  } finally {
    isLoaded.value = true;
  }
};

onMounted(async () => {
  await fetchUser();
});
</script>

<template>
  <!-- Suspense を使って、データ取得が完了するまでレンダリングを遅延 -->
  <NuxtLayout v-if="isLoaded">
    <NuxtPage />
  </NuxtLayout>
</template>
