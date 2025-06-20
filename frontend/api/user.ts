import type { UserApiResponse } from "~/types/api/UserApi";

export async function fetchLoginUserApi(): Promise<UserApiResponse> {
  return await customFetch("http://localhost/api/user", {
    method: "GET",
  });
}
