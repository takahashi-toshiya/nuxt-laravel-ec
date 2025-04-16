import type { UserModel } from "~/types/api/UserModel";

export async function getLoginUser(): Promise<UserModel> {
  return await customFetch("http://localhost/api/user", {
    method: "GET",
  });
}
