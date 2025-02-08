import { defineStore } from "pinia";

type UserData = {
  id: number | null;
  name: string | null;
  isLoggedIn: boolean | null; // ✅ nullで未判定を表現
};

export const useUserStore = defineStore("user", {
  state: (): UserData => ({
    id: null,
    name: null,
    isLoggedIn: null,
  }),
  getters: {
    isLogged: (state) => state.isLoggedIn === true,
  },
  actions: {
    setUser(userData: { id: number; name: string }) {
      console.log(userData);
      if (userData) {
        this.id = userData.id;
        this.name = userData.name;
        this.isLoggedIn = true;
      }
    },
    resetUser() {
      this.id = null;
      this.name = null;
      this.isLoggedIn = false;
    },
  },
});
