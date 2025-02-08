import type { UserModel } from "~/types/api/UserModel";

export async function getLoginUser(): Promise<UserModel> {
  return await $fetch("http://localhost/api/login", {
    method: "POST",
    credentials: "include",
  });
}
