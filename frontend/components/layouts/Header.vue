<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { useCsrfTokenStore } from "~/store/csrfTokenStore";
import Button from "../common/Button.vue";
import AppLink from "../common/AppLink.vue";
import { logoutService } from "~/services/authService";

const router = useRouter();
const userStore = useUserStore();
const csrfTokenStore = useCsrfTokenStore();

const isDropdownVisible = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const isLogged = computed(() => userStore.isLogged);

const handleLogout = async () => {
  await logoutService();
  userStore.resetUser();
  csrfTokenStore.resetCsrfToken();
  isDropdownVisible.value = false;
};

const handleLogin = () => {
  router.push("/login");
};

const handleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleGoToCart = () => {
  router.push("/cart");
  isDropdownVisible.value = false;
};

const closeDropdown = () => {
  isDropdownVisible.value = false;
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header>
    <NuxtLink to="/"><img src="/public/image/logo.png" /></NuxtLink>

    <!-- ログイン状態のナビゲーション -->
    <nav id="login" class="nav" v-if="isLogged">
      <ul class="nav__list">
        <li
          class="nav__item nav__dropdown-wrapper"
          ref="dropdownRef"
          @click.prevent="handleDropdown"
        >
          <span class="nav__toggle">{{
            $t("user.title", { name: userStore.name })
          }}</span>
          <span class="nav__arrow"></span>
          <ul class="nav__dropdown-menu" v-show="isDropdownVisible">
            <li class="nav__dropdown-menu__item" @click="handleGoToCart">
              カートを見る
            </li>
            <li class="nav__dropdown-menu__item" @click="handleLogout">
              ログアウト
            </li>
          </ul>
        </li>
        <li class="nav__item">
          <NuxtLink to="/cart">
            <img class="nav__img" src="public/image/cart.png" />
          </NuxtLink>
        </li>
        <li class="nav__item">
          <AppLink to="/contact" label="お問い合わせ" color="red" />
        </li>
      </ul>
    </nav>

    <!-- 非ログイン状態のナビゲーション -->
    <nav id="not-login" class="nav" v-else>
      <ul class="nav__list">
        <li class="nav__item">
          <Button label="ログイン" color="red" @button-click="handleLogin" />
        </li>
        <li class="nav__item">
          <AppLink to="/registration" label="新規登録" color="red" />
        </li>
        <li class="nav__item">
          <AppLink to="/contact" label="お問い合わせ" color="red" />
        </li>
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
  height: 60px;
}

h1 {
  margin: 0;
}

/* 共通設定 */
.nav {
  font-size: 14px;
}

.nav__list {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__item {
  padding: 0 7px;
  position: relative;
}

.nav__link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
}

.nav__dropdown-wrapper {
  cursor: pointer;
}

.nav__toggle {
  cursor: pointer;
}

.nav__arrow {
  margin-left: 0.255em;
  display: inline-block;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}

.nav__dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 100px;
  list-style: none;
  padding: 5px;
  margin: 5px 0 0;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.nav__dropdown-wrapper {
  display: block;
}

.nav__dropdown-menu__item {
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
}

.nav__img {
  height: 30px;
}
</style>
