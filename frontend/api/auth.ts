export async function loginApi(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await customFetch("http://localhost/api/login", {
    method: "POST",
    body: credentials,
  });
}

export async function logoutApi(): Promise<void> {
  await customFetch("http://localhost/api/signout", {
    method: "GET",
    credentials: "include",
  });
}
