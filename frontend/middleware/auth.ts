import { useUserStore } from "~/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    const path = "/";
    return { path };
  }
});
