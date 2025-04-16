import { useCsrfTokenStore } from "~/store/csrfTokenStore";

export const customFetch = async <T>(
  url: string,
  options: any = {}
): Promise<T> => {
  const csrfTokenStore = useCsrfTokenStore();

  // CSRF トークンを取得
  let csrfToken = csrfTokenStore.getCsrfToken();

  // トークンがなければ再取得
  if (!csrfToken) {
    await csrfTokenStore.refreshCsrfToken();
    csrfToken = csrfTokenStore.getCsrfToken();
  }

  options.headers = {
    ...options.headers,
    "X-XSRF-TOKEN": csrfToken || "",
  };

  options.credentials = "include";

  try {
    // API リクエスト
    return await $fetch<T>(url, options);
  } catch (error: any) {
    // もし 419 エラー（CSRF Token Mismatch）が発生した場合、再取得して再試行
    if (error.response?.status === 419) {
      await csrfTokenStore.refreshCsrfToken();
      options.headers["X-XSRF-TOKEN"] = csrfTokenStore.getCsrfToken();
      return await $fetch<T>(url, options);
    }

    // 他のエラーはそのまま投げる
    throw error;
  }
};
