<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <NuxtLink to="/"><img src="/public/image/logo.png" /></NuxtLink>
    <nav>
      <ul>
        <li v-if="userStore.isLogged">カート</li>
        <li v-else-if="userStore.isLogged === false">
          <NuxtLink to="/login">ログイン</NuxtLink>
          <NuxtLink to="/login">新規登録</NuxtLink>
        </li>
        <NuxtLink to="/contact">お問い合わせ</NuxtLink>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: white;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

h1 {
  margin: 0;
}

nav ul {
  display: flex;
}

a {
  display: inline-block;
  line-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  vertical-align: middle;
  background: transparent;
}
</style>
