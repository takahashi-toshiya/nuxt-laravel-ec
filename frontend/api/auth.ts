export async function login(credentials: {
  email: string;
  password: string;
}): Promise<void> {
  await $fetch("http://localhost/api/login", {
    method: "POST",
    credentials: "include",
    body: credentials,
  });
}
