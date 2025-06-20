import { fetchLoginUserApi } from "@/api/user";
import type { UserModel } from "@/types/model/UserModel";
import type { UserApiResponse } from "~/types/api/UserApi";

export async function getLoginUser(): Promise<UserModel> {
  const res: UserApiResponse = await fetchLoginUserApi();

  return {
    id: res.id,
    name: res.name,
    email: res.email,
    emailVerifiedAt: res.email_verified_at,
    createdAt: res.created_at,
    updatedAt: res.updated_at,
  };
}
