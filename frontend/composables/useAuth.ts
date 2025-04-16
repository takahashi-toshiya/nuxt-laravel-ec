import { useUserStore } from "~/store/userStore";

export default function useAuth() {
  const userStore = useUserStore();

  async function fetchUser() {
    /*
    const { data } = await useFetch("/api/user");

    userStore.fetchAndSetUser(data.value ?? null);
    */
  }

  return { fetchUser };
}
