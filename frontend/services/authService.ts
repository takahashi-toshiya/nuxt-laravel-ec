import { loginApi, logoutApi } from "@/api/auth";

export async function loginService(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await loginApi(credentials);
}

export async function logoutService(): Promise<void> {
  await logoutApi();
}
