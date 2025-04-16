export async function login(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await customFetch("http://localhost/api/login", {
    method: "POST",
    body: credentials,
  });
}

export async function logout(): Promise<void> {
  await customFetch("http://localhost/api/signout", {
    method: "GET",
    credentials: "include",
  });
}
